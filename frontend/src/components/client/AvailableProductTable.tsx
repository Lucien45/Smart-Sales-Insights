import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AvailableProductTable: React.FC = () => {
  const availableProductList = useSelector(
    (state: RootState) => state.products
  );
  return (
    <div>
      <h3>Produits disponibles</h3>
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2">Produits</th>
            <th className="p-2">Prix unité</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Categorie</th>
          </tr>
        </thead>
        <tbody>
          {availableProductList.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.nom}</td>
              <td className="p-2 text-center">{p.prix} $</td>
              <td className="p-2 text-center">{p.stock}</td>
              <td className="p-2 text-center">{p.idCategorie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableProductTable;
