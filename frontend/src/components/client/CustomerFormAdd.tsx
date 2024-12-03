import React, { useState } from "react";
import { Product } from "../../types/Product";
import { Customer } from "../../types/Customer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { InfoSale } from "./CustomerDialog";
import toast from "react-hot-toast";

interface CustomerFormAddProps {
  customer: Customer;
  onChange: (updatedCustomer: Customer, infoSale: InfoSale) => void;
  handleSave: () => void;
  onClose: () => void;
}

const CustomerFormAdd: React.FC<CustomerFormAddProps> = ({
  customer,
  onChange,
  handleSave,
  onClose,
}) => {
  const availableProduct = useSelector((state: RootState) => state.products);
  const [curCustomer, setCurCustomer] = useState<Customer>({ ...customer });
  const [curInfoSale, setCurInfoSale] = useState<InfoSale>({
    nomProduit: "Produit B",
    nombre: 4,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleChange = (field: keyof Customer, value: string | number) => {
    const updatedFormData = { ...curCustomer, [field]: value };
    setCurCustomer(updatedFormData);
    onChange(updatedFormData, curInfoSale);
  };

  console.log("curInfoSale aty amle fichier CustomerFormAdd.tsx : ", curInfoSale);
  

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productName = event.target.value;

    const updatedInfoSale = { ...curInfoSale, nomProduit: productName }
    setCurInfoSale(updatedInfoSale);
    onChange(curCustomer, updatedInfoSale)

    const product = availableProduct.find((p) => p.nom === productName) || null;
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      parseInt(event.target.value, 10),
      selectedProduct?.stock || 1
    );
    setQuantity(value);

    const updatedInfoSale = { ...curInfoSale, nombre: value }
    setCurInfoSale(updatedInfoSale);
    onChange(curCustomer, updatedInfoSale)
  };

  const handleSaveWithValidation = () => {
    if (!curCustomer.lastName || !curCustomer.email) {
      toast.error('Les champs Nom et Email sont obligatoire')
      return
    }
    
    handleSave()
    toast.success("Enregistrement effectué avec succès")
  }


  return (
    <div className="space-y-4 w-[600px]">
      <div className="flex">
        <div className="mr-2 w-1/2">
          <h3 className="text-xl font-semibold mb-2">Informations du client</h3>
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
            required
          />
          <label htmlFor="">Email</label>
          <input
            placeholder="Email"
            type="email"
            className="border rounded-md p-2 w-full"
            value={curCustomer.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          <label htmlFor="">Téléphone</label>
          <input
            placeholder="Téléphone"
            className="border rounded-md p-2 w-full"
            value={curCustomer.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>

        <div className="ml-2">
          <h3 className="text-xl font-semibold mb-2">
            Informations du produit
          </h3>
          <div className="flex flex-col">
            <label htmlFor="produit" className="text-gray-700 font-medium mb-2">
              Produit acheté:
            </label>
            <select
              name="produit"
              onChange={handleProductChange}
              required
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm text-gray-700"
            >
              <option value="" disabled selected>
                Choisir un produit
              </option>
              {availableProduct.map((p) => (
                <option key={p.id} value={p.nom}>
                  {p.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="nombreProduit"
              className="text-gray-700 font-medium mb-2 mt-4"
            >
              Quantité:
            </label>
            <input
              type="number"
              name="nombreProduit"
              min={1}
              max={selectedProduct?.stock || 1}
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="1"
              disabled={!selectedProduct}
              className={`border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm text-gray-700 ${
                !selectedProduct ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>
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

export default CustomerFormAdd;
