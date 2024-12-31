import React from "react";
import "./styles.css"; // Estilize seu modal aqui

export function Modal({ isOpen, onClose, data, onSubmit }) {
  if (!isOpen) return null;

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const updatedData = Object.fromEntries(formData.entries());
//     onSubmit(updatedData);
//   };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = {
      ...data, // Mantém os campos existentes
      ...Object.fromEntries(formData.entries()), // Substitui os campos com os valores do formulário
      TOMBO: parseInt(formData.get("TOMBO"), 10), // Converte TOMBO para número
    };
    onSubmit(updatedData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Transferir Equipamento</h2>
        <form onSubmit={handleSubmit}>
        <label>
            Descricão:
            <input type="text" name="DESCRICAO" defaultValue={data.DESCRICAO} readOnly />
          </label>
          {/* <label>
            Grupo:
            <input type="text" name="GRUPO" defaultValue={data.GRUPO} readOnly />
          </label> */}
          <label>
          Grupo:
            <select name="GRUPO" defaultValue={data.GRUPO}>
              <option value="EQUIPAMENTOS DE PROCESSAMENTO DE DADOS">EQUIPAMENTOS DE PROCESSAMENTO DE DADOS</option>
              <option value="MÁQUINAS E EQUIPAMENTOS">MÁQUINAS E EQUIPAMENTOS</option>
            </select>
          </label>
          <label>
            Tombo:
            <input type="number" name="TOMBO" defaultValue={data.TOMBO} readOnly />
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
              <option value="JULIANA ALEIXO DE ARAÚJO">JULIANA ALEIXO DE ARAÚJO</option>
              <option value="MARCELINO JUNIOR">MARCELINO JUNIOR</option>
              <option value="SATIVA LEIROS">SATIVA LEIROS</option>
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
              <option value="ATIVO">ATIVO</option>
              <option value="INATIVO">INATIVO</option>
             
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
