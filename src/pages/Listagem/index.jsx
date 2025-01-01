import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Footer } from "../../components/Footer";
import { CameraContext, CameraProvider } from "../../context/cameraContext";
import { BarcodeScanner } from "../../components/BarcodeScanner";

export function Listagem() {
  const [items, setItems] = useState([]);

  const { handleOpenCamera,isManualInput,  isCameraOpen } =  useContext(CameraContext);
  

  // Recupera os itens do localStorage ao carregar o componente
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setItems(storedItems);
  }, []);

  return (
 <>
 {!isCameraOpen && !isManualInput ? (
     <div className="container mx-auto p-4">
     <h2 className="text-center text-xl font-bold mb-4">Itens Selecionados</h2>
     {items.length > 0 ? (
       <div className="responsive-table">
         <table className="table-auto w-full border-collapse border border-gray-300">
           <thead className="bg-gray-200">
             <tr>
               <th className="border border-gray-300 p-2">Grupo</th>
               <th className="border border-gray-300 p-2">Tombo</th>
               <th className="border border-gray-300 p-2">Descrição</th>
               <th className="border border-gray-300 p-2">Localização</th>
               <th className="border border-gray-300 p-2">Responsável</th>
               <th className="border border-gray-300 p-2">Data de Aquisição</th>
               <th className="border border-gray-300 p-2">Estado</th>
               <th className="border border-gray-300 p-2">Situação</th>
               <th className="border border-gray-300 p-2">Valor</th>
               <th className="border border-gray-300 p-2">Saldo Contábil</th>
             </tr>
           </thead>
           <tbody>
             {items.map((item, index) => (
               <tr key={index} className="hover:bg-gray-100">
                 <td className="border border-gray-300 p-2">{item.GRUPO}</td>
                 <td className="border border-gray-300 p-2">{item.TOMBO}</td>
                 <td className="border border-gray-300 p-2">{item.DESCRICAO}</td>
                 <td className="border border-gray-300 p-2">{item.LOCALIZACAO}</td>
                 <td className="border border-gray-300 p-2">{item.RESPONSAVEL}</td>
                 <td className="border border-gray-300 p-2">{item.DATA_AQUISICAO}</td>
                 <td className="border border-gray-300 p-2">{item.ESTADO}</td>
                 <td className="border border-gray-300 p-2">{item.SITUACAO}</td>
                 <td className="border border-gray-300 p-2">
                   R$ {item.VALOR.toFixed(2)}
                 </td>
                 <td className="border border-gray-300 p-2">
                   R$ {item.SALDO_CONTABIL.toFixed(2)}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     ) : (
       <p className="text-center text-gray-500">Nenhum item selecionado.</p>
     )}
       <Footer handleOpenCamera={handleOpenCamera} />
   </div>
 ):(
  <BarcodeScanner/>
 )}
 </>
  );
}
