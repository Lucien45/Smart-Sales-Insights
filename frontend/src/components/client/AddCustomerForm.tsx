import React, { useState } from "react";
import { AvailableProduct, Customer } from "../../types/DataCustomer";

interface AddCustomerFormProps {
  availableProduct: AvailableProduct[];
  onSave: (newCustomer: Customer) => void;
  onClose: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({
  availableProduct,
  onSave,
  onClose,
}) => {
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: Date.now(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    purchaseHistory: [],
    user: "",
  });

  const [selectedProduct, setSelectedProduct] =
    useState<AvailableProduct | null>(null);
    
  const [quantity, setQuantity] = useState<number>(1);

  const handleChange = (field: keyof Customer, value: string | number) => {
    setNewCustomer({ ...newCustomer, [field]: value });
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productName = event.target.value;
    const product = availableProduct.find((p) => p.nom === productName) || null;
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      parseInt(event.target.value, 10),
      selectedProduct?.stock || 1
    );
    setQuantity(value);
  };

  const handleSave = () => {
    // Ajoutez la logique pour enregistrer le nouveau client avec les détails du produit
    onSave(newCustomer);
  };

  return (
    <div>
      <h3>Ajouter un client</h3>
      <input
        placeholder="Prénom"
        value={newCustomer.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
      />
      <input
        placeholder="Nom"
        value={newCustomer.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
      />
      <select onChange={handleProductChange}>
        <option value="" disabled selected>
          Choisir un produit
        </option>
        {availableProduct.map((p) => (
          <option key={p.id} value={p.nom}>
            {p.nom}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        max={selectedProduct?.stock || 1}
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button onClick={handleSave}>Enregistrer</button>
      <button onClick={onClose}>Annuler</button>
    </div>
  );
};

export default AddCustomerForm;
