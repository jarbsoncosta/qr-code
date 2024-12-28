import React, { useState, useEffect, useRef } from 'react';
import Quagga from 'quagga';

export const BarcodeScanner = () => {
  const [data, setData] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isQuaggaInitialized, setIsQuaggaInitialized] = useState(false); // Adicionando estado para controle
  const scannerRef = useRef(null); // Referência para o container do scanner

  const handleOpenCamera = () => {
    setData(null); // Reset data
    setIsCameraOpen(true); // Open camera
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false); // Close camera
    if (isQuaggaInitialized) {
      Quagga.stop(); // Só chama Quagga.stop() se estiver inicializado
    }
  };

  // Iniciar o Quagga para capturar imagens da câmera
  useEffect(() => {
    if (isCameraOpen) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: scannerRef.current, // Referência ao container da câmera
            constraints: {
              facingMode: 'environment', // Utiliza a câmera traseira
            },
          },
          decoder: {
            readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader'], // Tipos de código que o Quagga pode ler
          },
        },
        (err) => {
          if (err) {
            console.error('Erro ao inicializar o Quagga: ', err);
            return;
          }
          setIsQuaggaInitialized(true); // Marca que o Quagga foi inicializado
          Quagga.start(); // Iniciar o scanner
        }
      );

      // Função que será chamada quando um código de barras for detectado
      Quagga.onDetected((result) => {
        setData(result.codeResult.code); // Captura o código
        handleCloseCamera(); // Fecha a câmera automaticamente
      });
    }

    // Limpeza ao desmontar ou fechar a câmera
    return () => {
      if (isQuaggaInitialized) {
        Quagga.stop(); // Garantir que Quagga seja parado corretamente ao desmontar
      }
    };
  }, [isCameraOpen, isQuaggaInitialized]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Leitor de Código de Barras</h1>

      {!isCameraOpen && (
        <button
          onClick={handleOpenCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Abrir Câmera
        </button>
      )}

      {isCameraOpen && (
        <div className="w-full h-screen relative bg-black">
          {/* Scanner */}
          <div
            ref={scannerRef}
            style={{ width: '100%', height: '100%' }}
            className="scanner-container"
          />

          {/* Máscara com destaque para área retangular */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

            <div className="relative w-4/5 h-32 border-4 border-white rounded-md z-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-scan z-30"></div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full flex flex-col z-10">
              <div className="flex-1 bg-black bg-opacity-50"></div>
              <div className="h-32 flex-shrink-0 flex items-center justify-center">
                <p className="text-white text-sm font-medium z-30">
                  Posicione o código de barras no centro
                </p>
              </div>
              <div className="flex-1 bg-black bg-opacity-50"></div>
            </div>
          </div>

          <button
            onClick={handleCloseCamera}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 z-30"
          >
            Fechar Câmera
          </button>
        </div>
      )}

      {data && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">Código Capturado:</h2>
          <p className="text-gray-700">{data}</p>
        </div>
      )}
    </div>
  );
};
