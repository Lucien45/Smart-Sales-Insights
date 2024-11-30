import { useState } from "react";
import { Customer } from "../../types/Customer";
import CustomerForm from "./CustomerForm";
import CustomerInfo from "./CustomerInfo";

interface CustomerDialogProps {
  customer: Customer;
  mode: "add" | "edit" | "view";
  onSave: (updatedCustomer: Customer) => void;
  onClose: () => void;
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  customer,
  mode,
  onSave,
  onClose,
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
          {mode === "view" ? (
            <CustomerInfo customer={customer} onClose={onClose} />
          ) : (
            <CustomerForm
              customer={updatedCustomer}
              onChange={setUpdatedCustomer}
              handleSave={handleSave}
              onClose={onClose}
              mode={mode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDialog;
