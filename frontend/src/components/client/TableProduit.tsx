import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TableProduits: React.FC = () => {
  const produits = useSelector((state: RootState) => state.produit.produits);
  return (
    <div>
      <h3>Produits disponible</h3>
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2">Nom produit</th>
            <th className="p-2 text-center">Prix unité</th>
            <th className="p-2 text-center">Stock</th>
            <th className="p-2 text-left">Categorie</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.nom}</td>
              <td className="p-2 text-center">{p.prix} $</td>
              <td className="p-2 text-center">{p.stock}</td>
              <td className="p-2">{p.idCategorie.nom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProduits;
