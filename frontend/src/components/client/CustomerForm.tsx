import { useState } from "react";
import { Customer } from "../../types/Customer";

interface CustomerFormProps {
  customer: Customer;
  mode: "add" | "edit" | "view";
  onChange: (updatedCustomer: Customer) => void;
  handleSave: () => void;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  mode,
  onChange,
  handleSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Customer>({ ...customer });

  const handleChange = (field: keyof Customer, value: string | number) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    onChange(updatedFormData); // Passe les changements au parent
  };

  return (
    <div className="space-y-4 w-96">
      <h3 className="text-xl font-semibold mb-4">
        {mode === "edit" && "Modifier un Client"}
        {mode === "add" && "Ajouter un client"}
      </h3>
      <div>
        <label htmlFor="">Prenom</label>
        <input
          placeholder="Prénom"
          className="border rounded-md p-2 w-full"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <label htmlFor="">Nom</label>
        <input
          placeholder="Nom"
          className="border rounded-md p-2 w-full"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          placeholder="Email"
          type="email"
          className="border rounded-md p-2 w-full"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <label htmlFor="">Telephone</label>
        <input
          placeholder="Téléphone"
          className="border rounded-md p-2 w-full"
          value={formData.phone}
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

export default CustomerForm;
