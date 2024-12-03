import React, { useState } from "react";
import "../../index.css";
import CustomerTable from "../../components/client/CustomerTable";
import CustomerDialog, {
  InfoSale,
} from "../../components/client/CustomerDialog";
import CustomerHeader from "../../components/client/CustomerHeader";
import { Customer } from "../../types/Customer";
import AvailableProductTable from "../../components/client/AvailableProductTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteCustomer } from "../../redux/customerSlice";

const Clients: React.FC = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers);

  const auth = useSelector((state: RootState) => state.auth)
  console.log("auth.user : ", auth.user);
  

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [infoSale, setInfoSale] = useState<InfoSale>({
    nomProduit: "Produit ZZZ",
    nombre: 1212,
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("view");

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    setSelectedCustomer({
      id: Date.now(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      idUser: auth.user?.id || 1 
    });
    setInfoSale({
      nomProduit: "Produit A",
      nombre: 1,
    });
    setDialogMode("add");
    setIsDialogOpen(true);
  };

  const handleInfoSaleChange = (newInfoSale: InfoSale) => {
    setInfoSale(newInfoSale); // Synchronise l’état global
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

  console.log("infoSale ato amle fichier Clients.tsx: ",infoSale);
  

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
            customer={selectedCustomer}
            mode={dialogMode}
            onClose={() => setIsDialogOpen(false)}
            infoSale={infoSale}
            onChangeInfoSale={handleInfoSaleChange}
          />
        )}
      </div>

      <div className="bg-white rounded-lg w-2/5 p-3 shadow-md m-3 h-fit">
        <AvailableProductTable />
      </div>
    </div>
  );
};

export default Clients;