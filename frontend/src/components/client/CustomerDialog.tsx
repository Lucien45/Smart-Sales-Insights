import { useState } from "react";
import { AvailableProduct, Customer } from "../../types/DataCustomer";
import CustomerInfo from "./CustomerInfo";
import CustomerFormEdit from "./CustomerFormEdit";
import CustomerFormAdd from "./CustomerFormAdd";

interface CustomerDialogProps {
  customer: Customer;
  mode: "add" | "edit" | "view";
  onSave: (updatedCustomer: Customer) => void;
  onClose: () => void;
  availableProduct: AvailableProduct[];
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  customer,
  mode,
  onSave,
  onClose,
  availableProduct,
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
            <CustomerInfo customer={customer} onClose={onClose} />
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
