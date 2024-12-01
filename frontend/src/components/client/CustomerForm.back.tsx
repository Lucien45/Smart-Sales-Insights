import { useState } from "react";
import { AvailableProduct, Customer } from "../../types/DataCustomer";

interface CustomerFormProps {
  customer: Customer;
  mode: "add" | "edit" | "view";
  availableProduct: AvailableProduct[];
  onChange: (updatedCustomer: Customer) => void;
  handleSave: () => void;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  mode,
  availableProduct,
  onChange,
  handleSave,
  onClose,
}) => {
  const [curCustomer, setCurCustomer] = useState<Customer>({ ...customer });

  const handleChange = (field: keyof Customer, value: string | number) => {
    const updatedFormData = { ...curCustomer, [field]: value };
    setCurCustomer(updatedFormData);
    onChange(updatedFormData); // Passe les changements au parent
  };

  const [selectedProduct, setSelectedProduct] =
    useState<AvailableProduct | null>(null);

  const [quantity, setQuantity] = useState<number>(1);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productName = event.target.value;
    const product = availableProduct.find((p) => p.nom === productName) || null;
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity when product changes
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      parseInt(event.target.value, 10),
      selectedProduct?.stock || 1
    );
    setQuantity(value);
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
        <label htmlFor="">Telephone</label>
        <input
          placeholder="Téléphone"
          className="border rounded-md p-2 w-full"
          value={curCustomer.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        {mode === "add" && (
          <div>
            {/* Champ pour selectionner parmi les produit disponible */}
            <label htmlFor="produit" className="pr-3">
              Produit acheté:
            </label>
            <select name="produit" onChange={handleProductChange}>
              <option value="" disabled selected>Choisir un produit</option>
              {availableProduct.map((p) => (
                <option key={p.id} value={p.nom}>
                  {p.nom}
                </option>
              ))}
            </select>

            {/* Champ pour entrer le nombre du produit acheté */}
            <br />
            <label htmlFor="nombreProduit" className="pr-3">
              Quantité:
            </label>
            <input
              type="number"
              name="nombreProduit"
              id=""
              min={1}
              max={selectedProduct?.stock || 1}
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="1"
              disabled={!selectedProduct}
            />
          </div>
        )}
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
