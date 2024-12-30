import React from "react";
import "./styles.css"
import { Check, Plus } from "@phosphor-icons/react";



export function Card ({ data }){
    console.log(data)
  const handleOk = (data) => {
    console.log("OK clicked for:", data);
    // Lógica para o botão OK
  };

  const handleEdit = (data) => {
    console.log("Edit clicked for:", data);
    // Lógica para o botão Editar
  };

  return (
    <div className="container mx-auto p-4">     
      <div className="card">
           <div className="content-title">
           <h2 className="card-title">{data.DESCRICAO} </h2>
           </div>
            <li><strong>Grupo:</strong> {data.GRUPO}</li>
            <li><strong>Tombo:</strong> {data.TOMBO}</li>
            <li><strong>Localização:</strong> {data.LOCALIZACAO}</li>
            <li><strong>Responsável:</strong> {data.RESPONSAVEL}</li>
            <li><strong>Data de Aquisição:</strong> {data.DATA_AQUISICAO}</li>
            <li><strong>Estado:</strong> {data.ESTADO}</li>
            <li><strong>Situação:</strong> {data.SITUACAO}</li>
            <li><strong>Valor:</strong> R$ {data.VALOR.toFixed(2)}</li>
            <li><strong>Saldo Contábil:</strong> R$ {data.SALDO_CONTABIL.toFixed(2)}</li>
            <div className="card-buttons">
              <button onClick={() => handleOk(data)} className="btn ok-btn"><Check size={18} /> </button>
              <button onClick={() => handleEdit(data)} className="btn edit-btn">Transferir</button>              
            </div>
          </div>     
     </div>
  );
};


