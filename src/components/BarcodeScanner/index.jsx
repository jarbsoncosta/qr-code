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
import { Modal } from '../Modal';


export function BarcodeScanner() {

  const { handleOpenCamera, handleCloseCamera,setCapturedCode,dataFilter, readerRef,manualCode,
    setManualCode,  isManualInput, setDataFilter, handleManualInputToggle, isCameraOpen, capturedCode,  videoRef } =  useContext(CameraContext);

    const [add, setAdd] = useState(false)

    const [isModalOpen, setModalOpen] = useState(false);

    function handleOpenModal(){
      setModalOpen(true)
      setAdd(true)
    }

    const [newEquipment, setNewEquipment] = useState({
      DESCRICAO: '',
      GRUPO: '',
      TOMBO: '',
      LOCALIZACAO: '',
      RESPONSAVEL: '',
      ESTADO: '',
      SITUACAO: '',
      DATA_AQUISICAO: '',
    });


    const handleAddNewEquipment = (data) => {
      const existingData = JSON.parse(localStorage.getItem('equipamentos')) || [];
      const updatedData = [...existingData, data];
      localStorage.setItem('equipamentos', JSON.stringify(updatedData));
      setModalOpen(false);
      setCapturedCode(data.TOMBO);
      setDataFilter(data);
    };




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
              <button onClick={handleOpenModal} className="btn add-btn">
                  Adicionar
                </button>
             </>
            )}
          </div>
        )}
      </div>

     
      <Footer handleOpenCamera={handleOpenCamera} />

      <Modal
        add={add}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        data={newEquipment}
        onSubmit={handleAddNewEquipment}
      />
    </>
  );
}
