import React, { useState } from "react";
import toast from "react-hot-toast";
import { Client } from "../../types/Client";

interface CustomerFormEditProps {
  customer: Client;
  onChange: (updatedCustomer: Client) => void;
  handleSave: () => void;
  onClose: () => void;
}

const EditForm: React.FC<CustomerFormEditProps> = ({
  customer,
  onChange,
  handleSave,
  onClose,
}) => {
  const [curCustomer, setCurCustomer] = useState<Client>({ ...customer });

  const handleChange = (field: keyof Client, value: string | number) => {
    const updatedFormData = { ...curCustomer, [field]: value };
    setCurCustomer(updatedFormData);
    onChange(updatedFormData);
  };

  const handleSaveWithValidation = () => {
    if (!curCustomer.nom || !curCustomer.email) {
      toast.error("Les champs Nom et Email ne peuvent pas etre vide")
      return
    }
    handleSave()
    toast.success("Modification effectué avec succès")
  }

  return (
    <div className="space-y-4 w-96">
      <h3 className="text-xl font-semibold mb-4">Modifier un Client</h3>
      <div>
        <label htmlFor="">Prénom</label>
        <input
          placeholder="Prénom"
          className="border rounded-md p-2 w-full"
          value={curCustomer.prenom}
          onChange={(e) => handleChange("prenom", e.target.value)}
        />
        <label htmlFor="">Nom</label>
        <input
          placeholder="Nom"
          className="border rounded-md p-2 w-full"
          value={curCustomer.nom}
          onChange={(e) => handleChange("nom", e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          placeholder="Email"
          type="email"
          className="border rounded-md p-2 w-full"
          value={curCustomer.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <label htmlFor="">Téléphone</label>
        <input
          placeholder="Téléphone"
          className="border rounded-md p-2 w-full"
          value={curCustomer.numeroPhone}
          onChange={(e) => handleChange("numeroPhone", e.target.value)}
        />
      </div>
      <div className="flex justify-between space-x-4">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          onClick={handleSaveWithValidation}
        >
          Enregistrer
        </button>
        <button
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
          onClick={onClose}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default EditForm;
