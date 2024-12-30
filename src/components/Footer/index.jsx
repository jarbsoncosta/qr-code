import React, { useState } from "react";
import "./styles.css"
import { Check, Plus } from "@phosphor-icons/react";



export function Card ({ data }){


  return (
    <div className="footer-menu">
    <div className="button-menu">
      <Barcode color="#ffff" onClick={handleOpenCamera} size={35} />
      <strong> ESCANEAR</strong>
    </div>
    <div className="button-menu">
      <ClipboardText color="#ffff" onClick={redirecionar} size={35} />
      <strong> RELATÓRIO</strong>
    </div>
    
  </div>
  );
};