import React from "react";
import "./styles.css"; // Estilize seu modal aqui

export function Modal({ isOpen, onClose, data, onSubmit }) {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = Object.fromEntries(formData.entries());
    onSubmit(updatedData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Transferir Equipamento</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Grupo:
            <input type="text" name="GRUPO" defaultValue={data.GRUPO} readOnly />
          </label>
          <label>
            Tombo:
            <input type="text" name="TOMBO" defaultValue={data.TOMBO} readOnly />
          </label>
          <label>
            Localização:
            <input
              type="text"
              name="LOCALIZACAO"
              defaultValue={data.LOCALIZACAO}
            />
          </label>
          <label>
            Responsável:
            <select name="RESPONSAVEL" defaultValue={data.RESPONSAVEL}>
              <option value="Responsável A">JULIANA ALEIXO DE ARAÚJO</option>
              <option value="Responsável B">Responsável B</option>
              <option value="Responsável C">Responsável C</option>
            </select>
          </label>
          <label>
            Estado:
            <select name="ESTADO" defaultValue={data.ESTADO}>
              <option value="Novo">BOM</option>
              <option value="Usado">REGULAR</option>
           
            </select>
          </label>
          <label>
            Situação:
            <select name="SITUACAO" defaultValue={data.SITUACAO}>
              <option value="Ativo">ATIVO</option>
              <option value="Inativo">INATIVO</option>
             
            </select>
          </label>
          <label>
            Data de Aquisição:
            <input
              type="date"
              name="DATA_AQUISICAO"
              defaultValue={data.DATA_AQUISICAO}
            />
          </label>
          {/* <label>
            Valor:
            <input
              type="number"
              name="VALOR"
              defaultValue={data.VALOR.toFixed(2)}
            />
          </label>
          <label>
            Saldo Contábil:
            <input
              type="number"
              name="SALDO_CONTABIL"
              defaultValue={data.SALDO_CONTABIL.toFixed(2)}
            />
          </label> */}
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="btn submit-btn">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
