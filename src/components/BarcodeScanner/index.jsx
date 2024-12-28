import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { products } from '../../utils/dados';

export function BarcodeScanner() {
  const [data, setData] = useState(null);
  const [dataFilter, setDataFilter] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const readerRef = useRef(null);

  const handleOpenCamera = () => {
    setData(null); // Limpa o código capturado
    setDataFilter(null); // Limpa o filtro de produtos
    setIsCameraOpen(true); // Ativa a câmera
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);

    if (readerRef.current) {
      readerRef.current.reset();
      readerRef.current = null; // Libera o leitor
    }

    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (data) {
      const result = products.find((item) => item.code === data);
      setDataFilter(result || null); // Atualiza com o produto ou `null` se não encontrar
    }
  }, [data]);

  useEffect(() => {
    if (isCameraOpen) {
      const codeReader = new BrowserMultiFormatReader();
      readerRef.current = codeReader;

      const startScanner = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });

          videoRef.current.srcObject = stream;

          await codeReader.decodeFromVideoDevice(
            null,
            videoRef.current,
            (result, error) => {
              if (result) {
                setData(result.getText());
                handleCloseCamera(); // Fecha a câmera ao capturar o código
              } else if (error) {
                console.warn('Erro na leitura do código:', error.message);
              }
            }
          );
        } catch (err) {
          console.error('Erro ao tentar acessar a câmera:', err);
        }
      };

      startScanner();

      return () => {
        handleCloseCamera(); // Garante que a câmera seja fechada ao desmontar
      };
    }
  }, [isCameraOpen]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Leitor de Código de Barras (EAN-13)</h1>

      {!isCameraOpen && !data && (
        <button
          onClick={handleOpenCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Abrir Câmera
        </button>
      )}

      {isCameraOpen && (
        <div className="w-full h-screen relative bg-black">
          <video ref={videoRef} style={{ width: '100%', height: '100%' }} autoPlay playsInline />

          <button
            onClick={handleCloseCamera}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Fechar Câmera
          </button>
        </div>
      )}

      {data && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">Código Capturado:</h2>
          <p className="text-gray-700">{data}</p>

          {dataFilter ? (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Produto Encontrado:</h3>
              <p className="text-gray-700">{dataFilter.name}</p>
            </div>
          ) : (
            <p className="text-red-500 mt-2">Produto não encontrado!</p>
          )}

          <button
            onClick={() => {
              handleCloseCamera();
              handleOpenCamera(); // Reinicia a câmera
            }}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Escanear Novo Código
          </button>
        </div>
      )}
    </div>
  );
}
