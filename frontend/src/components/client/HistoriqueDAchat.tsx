import React from "react";
import { Client } from "../../types/Client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Vente } from "../../types/Vente";

interface HistoriqueDAchatProps {
  client: Client;
}

const HistoriqueDAchat: React.FC<HistoriqueDAchatProps> = ({ client }) => {
  const ventes = useSelector((state: RootState) => state.vente.ventes);

  const getClientVentes = (clientId: number): Vente[] =>
    ventes.filter((vente) => vente.idClient.id === clientId);
  return (
    <div>
      <table style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2">Produit</th>
            <th className="p-2 text-center">Date</th>
            <th className="p-2">Quantité</th>
            <th className="p-2">Prix unité</th>
          </tr>
        </thead>
        <tbody>
          {getClientVentes(client.id).map((vente) => (
            <tr key={vente.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{vente.idProduit.nom}</td>
              <td className="p-2">{new Date(vente.date_achat).toLocaleDateString()}</td>
              <td className="p-2 text-center">{vente.nombre}</td>
              <td className="p-2 text-center">{vente.idProduit.prix} $</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueDAchat;
