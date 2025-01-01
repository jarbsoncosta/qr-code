import React, { createContext, useState, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { BrowserMultiFormatReader } from '@zxing/library';
import beepSoundFile from '../audio/som.mp3';

export const CameraContext = createContext();

export function CameraProvider({ children }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedCode, setCapturedCode] = useState(null); // Novo estado para armazenar o código
    const [dataFilter, setDataFilter] = useState(null);
  const [isManualInput, setIsManualInput] = useState(false);

   const [manualCode,  setManualCode] = useState(null);
  
  const videoRef = useRef(null);
  const readerRef = useRef(null);


    const beepSound = useRef(
      new Howl({
        src: [beepSoundFile],
        volume: 1.0,
      })
    );
  

  const handleOpenCamera = () => {
    setCapturedCode(null)
    setDataFilter(null);
    setIsCameraOpen(true);
    setIsManualInput(false);    
  };

  const handleManualInputToggle = () => {
    handleCloseCamera(false);
    setIsManualInput(true);   
    setCapturedCode(null);
    setDataFilter(null);
  };

   const handleCloseCamera = () => {
    setIsCameraOpen(false);

    if (readerRef.current) {
      readerRef.current.reset();
      readerRef.current = null;
    }

    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

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

          await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
            if (result) {
              beepSound.current.play();
              console.log('Código capturado:', result.getText());
              setCapturedCode(result.getText()); // Atualiza o estado com o código lido
              handleCloseCamera();
            } else if (error) {
              console.warn('Erro na leitura do código:', error.message);
            }
          });
        } catch (err) {
          console.error('Erro ao tentar acessar a câmera:', err);
        }
      };

      startScanner();

      return () => {
        handleCloseCamera();
      };
    }
  }, [isCameraOpen]);

  return (
    <CameraContext.Provider
      value={{
        isCameraOpen,
        capturedCode,
        setIsCameraOpen,
        setCapturedCode,
        handleOpenCamera,
        handleCloseCamera,
        videoRef,
        setDataFilter,
        isManualInput,
        setIsManualInput,
        handleManualInputToggle,
        manualCode,
        setManualCode,
        dataFilter,
        readerRef
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}
