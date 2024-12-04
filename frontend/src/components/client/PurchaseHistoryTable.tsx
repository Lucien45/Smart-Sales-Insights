import React from "react";
import { Sales } from "../../types/Sales";

export type SalesWithProductName = Sales & { nomProduit: string };
interface PurchaseHistoryProps {
  salesWithProductName: SalesWithProductName[];
}

const PurchaseHistoryTable: React.FC<PurchaseHistoryProps> = ({
  salesWithProductName,
}) => {
  return (
    <div>
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2">Nom produit</th>
            <th className="p-2">Quantité</th>
            <th className="p-2 text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          {salesWithProductName.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{s.nomProduit}</td>
              <td className="p-2 text-center">{s.nombre}</td>
              <td className="p-2">{s.dateAchat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistoryTable;
