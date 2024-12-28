import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export function  BarcodeScanner() {
  const [data, setData] = useState(null); // Para armazenar o código de barras capturado
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Controle da câmera
  const videoRef = useRef(null); // Referência para o elemento de vídeo da câmera
  const [isScanning, setIsScanning] = useState(false); // Estado para verificar se está escaneando

  // Função para iniciar a leitura do código de barras
  const handleOpenCamera = () => {
    setData(null); // Reset data
    setIsCameraOpen(true); // Ativa a câmera
  };

  // Função para fechar a câmera
  const handleCloseCamera = () => {
    setIsCameraOpen(false); // Desativa a câmera
    setIsScanning(false); // Para o escaneamento
  };

  useEffect(() => {
    // Quando a câmera estiver aberta, inicialize o leitor de códigos de barras
    if (isCameraOpen) {
      const codeReader = new BrowserMultiFormatReader(); // Criação do leitor de códigos

      const startScanner = async () => {
        try {
          // Configura o leitor para apenas ler códigos EAN-13
          const hints = {
            readers: ['ean_13_reader'], // Foca no leitor EAN-13
          };

          await codeReader.decodeFromVideoDevice(
            null, // Usa a câmera padrão
            videoRef.current, // Referência para o vídeo
            (result, error) => {
              if (result) {
                setData(result.getText()); // Atualiza com o código de barras lido
                setIsScanning(false); // Para o escaneamento assim que um código for lido
                handleCloseCamera(); // Fecha a câmera após detectar o código
              } else if (error && !isScanning) {
                console.error(error);
              }
            },
            hints // Passa as configurações para o decode
          );
          setIsScanning(true); // Inicia o escaneamento
        } catch (err) {
          console.error("Erro ao tentar escanear:", err);
        }
      };

      startScanner();

      // Função de limpeza para parar o scanner quando a câmera for fechada ou o componente desmontar
      return () => {
        codeReader.reset();
      };
    }
  }, [isCameraOpen, isScanning]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Leitor de Código de Barras (EAN-13)</h1>

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
          {/* Elemento de vídeo que vai mostrar o feed da câmera */}
          <video ref={videoRef} style={{ width: '100%', height: '100%' }} />

          {/* Máscara com destaque para a área do código de barras */}
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
