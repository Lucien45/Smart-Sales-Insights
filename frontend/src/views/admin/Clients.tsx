import React, { useState } from "react";
import "../../index.css";
import CustomerTable from "../../components/client/CustomerTable";
import CustomerDialog from "../../components/client/CustomerDialog";
import CustomerHeader from "../../components/client/CustomerHeader";
import { Customer, DataCustomer } from "../../types/DataCustomer";

// Mock initial customer data
const data: DataCustomer = {
  availableProduct: [
    {
      id: 1,
      nom: "Produit A",
      prix: 50.0,
      stock: 10,
      categorie: "Catégorie 1",
    },
    {
      id: 2,
      nom: "Produit B",
      prix: 30.0,
      stock: 5,
      categorie: "Catégorie 2",
    },
  ],
  customerList: [
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
      phone: "987654321",
      user: "jdoe",
      purchaseHistory: [
        {
          productName: "Produit B",
          date: "2024-11-28T10:15:45.000Z",
          quantity: 3,
          price: 30.0,
        },
        {
          productName: "Produit A",
          date: "2024-11-27T14:22:00.000Z",
          quantity: 1,
          price: 50.0,
        },
      ],
      mostPurchasedProduct: {
        productName: "Produit B",
        totalQuantity: 3,
      },
    },
  ],
};

const Clients: React.FC = () => {
  const [curstomers, setCustomers] = useState<Customer[]>(data.customerList);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("view");

  // Filter curstomers based on search term
  const filteredCustomers = curstomers.filter(
    (customer) =>
      customer.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
    setCustomers(curstomers.filter((c) => c.id !== customerId));
  };

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    if (dialogMode === "add") {
      // Ajoute le nouveau client à la liste
      setCustomers([...curstomers, updatedCustomer]);
    } else if (dialogMode === "edit") {
      // Met à jour le client existant
      setCustomers(
        curstomers.map((c) =>
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
          availableProduct={data.availableProduct}
          onSave={handleSaveCustomer}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Clients;
