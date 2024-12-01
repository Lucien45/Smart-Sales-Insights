import React, { useState } from "react";
import { Customer } from "../../types/DataCustomer";

interface EditCustomerFormProps {
  customer: Customer;
  onSave: (updatedCustomer: Customer) => void;
  onClose: () => void;
}

const EditCustomerForm: React.FC<EditCustomerFormProps> = ({
  customer,
  onSave,
  onClose,
}) => {
  const [curCustomer, setCurCustomer] = useState<Customer>({ ...customer });

  const handleChange = (field: keyof Customer, value: string | number) => {
    setCurCustomer({ ...curCustomer, [field]: value });
  };

  const handleSave = () => {
    onSave(curCustomer);
  };

  return (
    <div>
      <h3>Modifier un client</h3>
      <input
        placeholder="Prénom"
        value={curCustomer.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
      />
      <input
        placeholder="Nom"
        value={curCustomer.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
      />
      <button onClick={handleSave}>Enregistrer</button>
      <button onClick={onClose}>Annuler</button>
    </div>
  );
};

export default EditCustomerForm;
