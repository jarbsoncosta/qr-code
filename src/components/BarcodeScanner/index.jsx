import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { products } from '../../utils/dados';
import "./styles.css"

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
    <div className="scanner-container">
   
      {!isCameraOpen && !data && (
        <button onClick={handleOpenCamera} className="button button-open">
          Abrir Câmera
        </button>
      )}

      {isCameraOpen && (
        <div className="video-container">
          <video ref={videoRef} className="video" autoPlay playsInline />

          <button onClick={handleCloseCamera} className="button button-close">
            Fechar Câmera
          </button>
        </div>
      )}

      {data && (
        <div className="result-container">
          <h2 className="subtitle">Código Capturado:</h2>
          <p className="result-text">{data}</p>

          {dataFilter ? (
            <div className="product-info">
              <h3 className="product-title">Produto Encontrado:</h3>
              <p className="product-name">{dataFilter.name}</p>
            </div>
          ) : (
            <p className="error-text">Produto não encontrado!</p>
          )}

          <button
            onClick={() => {
              handleCloseCamera();
              handleOpenCamera(); // Reinicia a câmera
            }}
            className="button button-restart"
          >
            Escanear Novo Código
          </button>
        </div>
      )}
    </div>
  );
}
