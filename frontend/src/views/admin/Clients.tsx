import React, { useState } from "react";
import "../../index.css";
import { Customer } from "../../types/Customer";
import CustomerTable from "../../components/client/CustomerTable";
import CustomerDialog from "../../components/client/CustomerDialog";
import CustomerHeader from "../../components/client/CustomerHeader";

// Mock initial customer data
const initialCustomers: Customer[] = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "123456789",
    user: "jdupont",
    purchaseHistory: [
      {
        productName: "Produit A",
        date: "2024-11-30T12:34:56.000Z",
        quantity: 2,
        price: 50.0,
      },
      {
        productName: "Produit B",
        date: "2024-11-29T15:20:30.000Z",
        quantity: 1,
        price: 30.0,
      },
    ],
    mostPurchasedProduct: {
      productName: "Produit A",
      totalQuantity: 7,
    },
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123456789",
    user: "jdoe",
    purchaseHistory: [
      {
        productName: "Produit A",
        date: "2024-11-30T12:34:56.000Z",
        quantity: 2,
        price: 50.0,
      },
      {
        productName: "Produit B",
        date: "2024-11-29T15:20:30.000Z",
        quantity: 1,
        price: 30.0,
      },
    ],
    mostPurchasedProduct: {
      productName: "Produit 7",
      totalQuantity: 7,
    },
  },
];

const Clients: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
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
      user: "moi",
      purchaseHistory: [],
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
    setCustomers(customers.filter((c) => c.id !== customerId));
  };

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    if (dialogMode === "add") {
      // Ajoute le nouveau client à la liste
      setCustomers([...customers, updatedCustomer]);
    } else if (dialogMode === "edit") {
      // Met à jour le client existant
      setCustomers(
        customers.map((c) =>
          c.id === updatedCustomer.id ? updatedCustomer : c
        )
      );
    }

    setIsDialogOpen(false); // Ferme la boîte de dialogue
  };

  // Render
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
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
          onSave={handleSaveCustomer}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Clients;
