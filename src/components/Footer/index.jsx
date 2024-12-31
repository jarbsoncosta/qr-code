import React, { useState } from "react";
import "./styles.css"
import { Barcode, Check, ClipboardText, Plus } from "@phosphor-icons/react";



export function Footer ({ handleOpenCamera }){
    function redirecionar() {
        // URL para onde o usuário será redirecionado
        window.location.href = "/listagem";
      }

  return (
    <div className="footer-menu">
    <div className="button-menu">
      <Barcode color="#ffff" onClick={handleOpenCamera} size={30} />
      <strong> Escanear</strong>
    </div>
    <div className="button-menu">
      <ClipboardText color="#ffff" onClick={redirecionar} size={30} />
      <strong> Relatório</strong>
    </div>
    
  </div>
  );
};