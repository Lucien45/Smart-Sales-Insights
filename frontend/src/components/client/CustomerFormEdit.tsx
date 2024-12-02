import React, { useState } from "react";
import { Customer } from "../../types/Customer";

interface CustomerFormEditProps {
  customer: Customer;
  onChange: (updatedCustomer: Customer) => void;
  handleSave: () => void;
  onClose: () => void;
}

const CustomerFormEdit: React.FC<CustomerFormEditProps> = ({
  customer,
  onChange,
  handleSave,
  onClose,
}) => {
  const [curCustomer, setCurCustomer] = useState<Customer>({ ...customer });

  const handleChange = (field: keyof Customer, value: string | number) => {
    const updatedFormData = { ...curCustomer, [field]: value };
    setCurCustomer(updatedFormData);
    onChange(updatedFormData);
  };

  return (
    <div className="space-y-4 w-96">
      <h3 className="text-xl font-semibold mb-4">Modifier un Client</h3>
      <div>
        <label htmlFor="">Prénom</label>
        <input
          placeholder="Prénom"
          className="border rounded-md p-2 w-full"
          value={curCustomer.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <label htmlFor="">Nom</label>
        <input
          placeholder="Nom"
          className="border rounded-md p-2 w-full"
          value={curCustomer.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
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
          value={curCustomer.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      <div className="flex justify-between space-x-4">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          onClick={handleSave}
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

export default CustomerFormEdit;
