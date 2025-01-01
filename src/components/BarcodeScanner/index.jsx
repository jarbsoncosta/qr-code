import React, { useState, useEffect, useRef, useContext } from 'react';
// import { Howl } from 'howler';
import { BrowserMultiFormatReader } from '@zxing/library';
import { equipamentos } from '../../utils/dados';
import "./styles.css";
import { Barcode, ClipboardText, MagnifyingGlass, Plus } from '@phosphor-icons/react';
import beepSoundFile from '../../audio/som.mp3';
import { Card } from '../Card';
import { Footer } from '../Footer';
import { CameraContext } from '../../context/cameraContext';


export function BarcodeScanner() {

  const { handleOpenCamera, handleCloseCamera,setCapturedCode,dataFilter, readerRef,manualCode,
    setManualCode,  isManualInput, setDataFilter, handleManualInputToggle, isCameraOpen, capturedCode,  videoRef } =  useContext(CameraContext);



  //const videoRef = useRef(null);
  // const readerRef = useRef(null);

  // const beepSound = useRef(
  //   new Howl({
  //     src: [beepSoundFile],
  //     volume: 1.0,
  //   })
  // );



  // handleOpenCamera = () => {
  //   setData(null);
  //   setDataFilter(null);
  //   setIsCameraOpen(true);
  //   setIsManualInput(false);
  // };

  // const handleCloseCamera = () => {
  //   setIsCameraOpen(false);

  //   if (readerRef.current) {
  //     readerRef.current.reset();
  //     readerRef.current = null;
  //   }

  //   if (videoRef.current?.srcObject) {
  //     const tracks = videoRef.current.srcObject.getTracks();
  //     tracks.forEach((track) => track.stop());
  //     videoRef.current.srcObject = null;
  //   }
  // };

  // const handleManualInputToggle = () => {
  //   handleCloseCamera(false);
  //   setIsManualInput(true);   
  //   setCapturedCode(null);
  //   setDataFilter(null);
  // };

  const handleManualInputSubmit = () => {
    const result = equipamentos.find((item) => item.TOMBO === Number(manualCode));
    setCapturedCode(Number(manualCode));
    setDataFilter(result || null);
    setManualCode('');
  };

  useEffect(() => {
    if (capturedCode) {
      const result = equipamentos.find((item) => item.TOMBO === Number(capturedCode));
      setDataFilter(result || null);
    }
  }, [capturedCode]);

  // useEffect(() => {
  //   if (isCameraOpen) {
  //     const codeReader = new BrowserMultiFormatReader();
  //     readerRef.current = codeReader;

  //     const startScanner = async () => {
  //       try {
  //         const stream = await navigator.mediaDevices.getUserMedia({
  //           video: { facingMode: 'environment' },
  //         });

  //         videoRef.current.srcObject = stream;

  //         await codeReader.decodeFromVideoDevice(
  //           null,
  //           videoRef.current,
  //           (result, error) => {
  //             if (result) {
  //               beepSound.current.play();
  //               setCapturedCode(result.getText());
  //               handleCloseCamera();
  //             } else if (error) {
  //               console.warn('Erro na leitura do código:', error.message);
  //             }
  //           }
  //         );
  //       } catch (err) {
  //         console.error('Erro ao tentar acessar a câmera:', err);
  //       }
  //     };

  //     startScanner();

  //     return () => {
  //       handleCloseCamera();
  //     };
  //   }
  // }, [isCameraOpen]);



  return (
    <>
      <div className="scanner-container">
        {isCameraOpen && (
          <div className="video-container">
            <video ref={videoRef} className="video" autoPlay playsInline />
   
          </div>
        )}
        {isCameraOpen && (
          <div className="content-button-digitar">
            <button onClick={handleManualInputToggle} className="manual-button-digitar">
              DIGITAR CÓDIGO
            </button>
          </div>
        )}

        {isManualInput && (
          <div className="manual-input-container">       
            <input
              type="text"
              placeholder='Codigo'
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="manual-input"
            />
          
            <button onClick={handleManualInputSubmit} className="submit-button">
            <MagnifyingGlass size={30} />
            </button>
          </div>
        )}

        {capturedCode && (
          <div className="result-container">
            {/* <h2 className="subtitle">Código Capturado:</h2>
            <p className="result-text">{data}</p> */}
            {dataFilter ? (            
               <Card data={dataFilter}/>             
            ) : (
             <>
              <p className="error-text">Equipamento não encontrado!</p>
              <button onClick={() => handleEdit(data)} className="btn add-btn"> <Plus size={18} /> Adicionar</button>
             </>
            )}
          </div>
        )}
      </div>

      {/* <div className="footer-menu">
        <div className="button-menu">
          <Barcode color="#ffff" onClick={handleOpenCamera} size={35} />
          <strong> ESCANEAR</strong>
        </div>
        <div className="button-menu">
          <ClipboardText color="#ffff" onClick={redirecionar} size={35} />
          <strong> RELATÓRIO</strong>
        </div>        
      </div> */}
      <Footer handleOpenCamera={handleOpenCamera} />
    </>
  );
}
