import React from "react";
import { Customer } from "../../types/Customer";
import { Sales } from "../../types/Sales";
import { Product } from "../../types/Product";
import PurchaseHistoryTable from "./PurchaseHistoryTable";

interface CustomerInfoProps {
  customer: Customer;
  sales: Sales[];
  products: Product[];
  onClose: () => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customer,
  sales,
  products,
  onClose,
}) => {
  const historiqueClient = sales
    .filter((s) => s.idClient === customer.id)
    .map((achat) => {
      const produit = products.find((p) => p.id === achat.idProduit);
      return {
        ...achat,
        nomProduit: produit ? produit.nom : "Produit inconnu",
      };
    });

  return (
    <div>
      <h2>
        {customer.firstName} {customer.lastName}
      </h2>
      <p>Email: {customer.email}</p>
      <p>Téléphone: {customer.phone}</p>
      <p>ID Utilisateur: {customer.idUser}</p>

      <h3>Historique d'Achats</h3>
      <PurchaseHistoryTable salesWithProductName={historiqueClient} />

      <button
        className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 mt-3"
        onClick={onClose}
      >
        Fermer
      </button>
    </div>
  );
};

export default CustomerInfo;
