import React from "react";
import { Customer } from "../../types/Customer";
import PurchaseHistoryTable from "./PurchaseHistoryTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CustomerInfoProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer, onClose }) => {
  const sales = useSelector((state: RootState) => state.sales);
  const products = useSelector((state: RootState) => state.products);

  console.log("sales: ",sales);
  

  const history = sales
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
      <div className="flex">
        <div className="mr-3">
          <h4>Informations</h4>
          <p>
            <strong>Prénom : </strong>
            {customer.firstName}
          </p>
          <p>
            <strong>Nom : </strong>
            {customer.lastName}
          </p>
          <p>
            <strong>Email : </strong> {customer.email}
          </p>
          <p>
            <strong>Téléphone : </strong> {customer.phone}
          </p>
          <p>
            <strong>Ajouté par l'utilisateur de ID : </strong> {customer.idUser}
          </p>
        </div>

        <div className="ml-3">
          <h4>Historique d'Achats</h4>
          <PurchaseHistoryTable salesWithProductName={history} />
        </div>
      </div>

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
