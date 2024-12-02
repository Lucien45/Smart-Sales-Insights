import React, { useState } from "react";
import "../../index.css";
import CustomerTable from "../../components/client/CustomerTable";
import CustomerDialog from "../../components/client/CustomerDialog";
import CustomerHeader from "../../components/client/CustomerHeader";
import { Customer } from "../../types/Customer";
import AvailableProductTable from "../../components/client/AvailableProductTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addCustomer,
  deleteCustomer,
  updateCustomer,
} from "../../redux/customerSlice";

const Clients: React.FC = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers);
  const products = useSelector((state: RootState) => state.products);
  const sales = useSelector((state: RootState) => state.sales);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("view");

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dialog Handlers
  const handleAddCustomer = () => {
    setSelectedCustomer({
      id: Date.now(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      idUser: 1,
    });
    setDialogMode("add");
    setIsDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer({ ...customer });
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer({ ...customer });
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const handleDeleteCustomer = (customerId: number) => {
    dispatch(deleteCustomer(customerId));
  };

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    if (dialogMode === "add") {
      dispatch(addCustomer(updatedCustomer));
    } else if (dialogMode === "edit") {
      dispatch(updateCustomer(updatedCustomer));
    }

    setIsDialogOpen(false); // Ferme la boîte de dialogue
  };

  // Render
  return (
    <div className="bg-gray-100 rounded-lg flex">
      <div className="bg-white rounded-lg w-3/5 p-3 shadow-md m-3 h-fit">
        <CustomerHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAdd={handleAddCustomer}
        />

        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
          onViewDetails={handleViewDetails}
        />

        {isDialogOpen && selectedCustomer && (
          <CustomerDialog
            sales={sales}
            customer={selectedCustomer}
            mode={dialogMode}
            availableProduct={products}
            onSave={handleSaveCustomer}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </div>

      <div className="bg-white rounded-lg w-2/5 p-3 shadow-md m-3 h-fit">
        <AvailableProductTable availableProductList={products} />
      </div>
    </div>
  );
};

export default Clients;
