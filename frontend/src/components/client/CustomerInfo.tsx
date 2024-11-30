import React from "react";
import { Customer } from "../../types/Customer";

interface CustomerInfoProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer, onClose }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Informations</h3>
      <div>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Téléphone:</strong> {customer.phone}
        </p>
      </div>

      {/* Preference du client */}
      <span className="text-xl font-semibold mb-4">Preference du client: </span>
      <span>{customer.mostPurchasedProduct?.productName} (avec {customer.mostPurchasedProduct?.totalQuantity} unite achete)</span>

      {/* Tableau historique de vente */}
      <h3 className="text-xl font-semibold mb-4">Historique d'achats</h3>
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Produit</th>
            <th className="p-3">Date</th>
            <th className="p-3">Quantite</th>
            <th className="p-3">Prix</th>
          </tr>
        </thead>
        <tbody>
          {customer.purchaseHistory.map((purchase) => (
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">{purchase.productName}</td>
              <td className="p-3">{purchase.date}</td>
              <td className="p-3">{purchase.quantity}</td>
              <td className="p-3">{purchase.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
        onClick={onClose}
      >
        Fermer
      </button>
    </div>
  );
};

export default CustomerInfo;
