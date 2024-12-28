import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import './styles.css'

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
     {!isCameraOpen && (
        <button
          onClick={handleOpenCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Abrir Câmera
        </button>
      )}

      {isCameraOpen && (
        <div className="">
          {/* Scanner */}
          <BarcodeScannerComponent
            width="100%"
            height="100%"

            onUpdate={(error, result) => {
                console.log(error)
              if (result?.getText) {
                setData(result.getText()); // Captura o código
                handleCloseCamera();
              }
            }}
          />

          {/* Máscara com destaque para área retangular */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            {/* Máscara escura */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

            {/* Retângulo central */}
            <div className="relative w-4/5 h-32 border-4 border-white rounded-md z-20">
              {/* Linha vermelha animada */}
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-scan z-30"></div>
            </div>

            {/* Overlay para destacar o retângulo */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col z-10">
              <div className="flex-1 bg-black bg-opacity-50"></div>
              <div className="h-32 flex-shrink-0 flex items-center justify-center">
                {/* Texto informativo no retângulo */}
                <p className="text-white text-sm font-medium z-30">
                  Posicione o código de barras no centro
                </p>
              </div>
              <div className="flex-1 bg-black bg-opacity-50"></div>
            </div>
          </div>

          {/* Botão para fechar a câmera */}
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
