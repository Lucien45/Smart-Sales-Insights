import { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import CustomerFormEdit from "./CustomerFormEdit";
import CustomerFormAdd from "./CustomerFormAdd";
import { Product } from "../../types/Product";
import { Customer } from "../../types/Customer";
import { Sales } from "../../types/Sales";

interface CustomerDialogProps {
  customer: Customer;
  mode: "add" | "edit" | "view";
  onSave: (updatedCustomer: Customer) => void;
  onClose: () => void;
  availableProduct: Product[];
  sales: Sales[];
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  customer,
  mode,
  onSave,
  onClose,
  availableProduct,
  sales,
}) => {
  const [updatedCustomer, setUpdatedCustomer] = useState<Customer>(customer);

  const handleSave = () => {
    onSave(updatedCustomer); // Passe le client mis à jour au parent
    onClose(); // Ferme la boîte de dialogue
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="space-y-4">
          {mode === "view" && (
            <CustomerInfo
              customer={customer}
              onClose={onClose}
              products={availableProduct}
              sales={sales}
            />
          )}
          {mode === "edit" && (
            <CustomerFormEdit
              customer={customer}
              handleSave={handleSave}
              onChange={setUpdatedCustomer}
              onClose={onClose}
            />
          )}
          {mode === "add" && (
            <CustomerFormAdd
              customer={customer}
              availableProduct={availableProduct}
              handleSave={handleSave}
              onChange={setUpdatedCustomer}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDialog;
