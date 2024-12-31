import React, { useState } from "react";
import "./styles.css"
import { Check, Plus } from "@phosphor-icons/react";
import { Modal } from "../Modal";



export function Card ({ data }){
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = (data) => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    const itemExists = storedItems.some((item) => item.TOMBO === data.TOMBO);
    if (itemExists) {
      setError("Equipamento com o mesmo tombo já existe na listagem");
      return;
    }
    setError("");
    storedItems.push(data);
    localStorage.setItem("selectedItems", JSON.stringify(storedItems));
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (updatedData) => {
    // Recuperar o array existente do localStorage ou inicializar como vazio
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    
    // Substituir o item correspondente no array pelo objeto atualizado
    const updatedItems = storedItems.filter(
      (item) => item.TOMBO !== Number(updatedData.TOMBO)
    );
    updatedItems.push(updatedData);

    // Salvar o array atualizado no localStorage
    localStorage.setItem("selectedItems", JSON.stringify(updatedItems));

    console.log("Dados atualizados no localStorage:", updatedData);

    setIsModalOpen(false);
  };

  return (
    <div className="container">     
        {error &&  <p className="error">{ error} </p>}
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
                <button onClick={() => handleEdit(data)} className="btn edit-btn">
                Transferir
              </button>          
              </div>
            </div>  
            <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={data}
        onSubmit={handleModalSubmit}
      />
   
    </div>
  );
};


