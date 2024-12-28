import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner'; // Importação corrigida

export const BarcodeScanner: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  const handleOpenCamera = () => {
    setData(null); // Reseta o dado capturado
    setIsCameraOpen(true); // Abre a câmera
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false); // Fecha a câmera
  };

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
        <div className="w-full max-w-md bg-white p-4 shadow-lg rounded-lg">
          <BarcodeScannerComponent
            width="100%"
            height={200}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text); // Armazena o código de barras lido
                handleCloseCamera(); // Fecha a câmera após leitura
              }
            }}
          />
          <button
            onClick={handleCloseCamera}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
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
