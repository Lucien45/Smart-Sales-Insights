import React from "react";
import { Sales } from "../../types/Sales";

type SalesWithProductName = Sales & { nomProduit: string };
interface PurchaseHistoryProps {
  salesWithProductName: SalesWithProductName[];
}

const PurchaseHistoryTable: React.FC<PurchaseHistoryProps> = ({
  salesWithProductName,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom produit</th>
            <th>Quantité</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {salesWithProductName.map((s) => (
            <tr>
              <td>{s.nomProduit}</td>
              <td>{s.nombre}</td>
              <td>{s.dateAchat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistoryTable;
