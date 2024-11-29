import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import "../../index.css"

// Types for Customer
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastPurchaseDate: string;
  preferences: string[];
}

// Mock initial customer data
const initialCustomers: Customer[] = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 612 345 678',
    totalPurchases: 5420,
    lastPurchaseDate: '2024-07-15',
    preferences: ['Technologie', 'Accessoires']
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    phone: '+33 623 456 789',
    totalPurchases: 3750,
    lastPurchaseDate: '2024-07-22',
    preferences: ['Mode', 'Beauté']
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Dubois',
    email: 'pierre.dubois@example.com',
    phone: '+33 687 654 321',
    totalPurchases: 6200,
    lastPurchaseDate: '2024-07-10',
    preferences: ['Électronique', 'Sport']
  }
];

const Clients: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open dialog for adding a new customer
  const handleAddCustomer = () => {
    setSelectedCustomer({
      id: customers.length + 1,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      totalPurchases: 0,
      lastPurchaseDate: new Date().toISOString().split('T')[0],
      preferences: []
    });
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  // Open dialog for editing an existing customer
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer({...customer});
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  // Delete a customer
  const handleDeleteCustomer = (customerId: number) => {
    setCustomers(customers.filter(c => c.id !== customerId));
  };

  // Save customer (add or edit)
  const handleSaveCustomer = () => {
    if (selectedCustomer) {
      if (dialogMode === 'add') {
        setCustomers([...customers, selectedCustomer]);
      } else {
        setCustomers(customers.map(c => 
          c.id === selectedCustomer.id ? selectedCustomer : c
        ));
      }
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Clients</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Rechercher un client"
              className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2 top-3 text-gray-400" size={20} />
          </div>
          <button 
            onClick={handleAddCustomer}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <Plus className="mr-2" size={16} /> Ajouter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Téléphone</th>
              <th className="p-3 text-right">Achats Totaux</th>
              <th className="p-3 text-left">Dernier Achat</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{customer.firstName} {customer.lastName}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3 text-right">{customer.totalPurchases.toLocaleString()} €</td>
                <td className="p-3">{customer.lastPurchaseDate}</td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditCustomer(customer)}
                      className="text-blue-500 hover:text-blue-700 border border-blue-500 rounded-md px-3 py-1 flex items-center"
                    >
                      <Edit size={16} className="mr-2" /> Modifier
                    </button>
                    <button 
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="text-red-500 hover:text-red-700 border border-red-500 rounded-md px-3 py-1 flex items-center"
                    >
                      <Trash2 size={16} className="mr-2" /> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Dialog (Add/Edit) */}
      {isDialogOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">
              {dialogMode === 'add' ? 'Ajouter un Client' : 'Modifier un Client'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Prénom" 
                  className="border rounded-md p-2 w-full"
                  value={selectedCustomer.firstName}
                  onChange={(e) => setSelectedCustomer({
                    ...selectedCustomer, 
                    firstName: e.target.value
                  })}
                />
                <input 
                  placeholder="Nom" 
                  className="border rounded-md p-2 w-full"
                  value={selectedCustomer.lastName}
                  onChange={(e) => setSelectedCustomer({
                    ...selectedCustomer, 
                    lastName: e.target.value
                  })}
                />
              </div>
              <input 
                placeholder="Email" 
                type="email"
                className="border rounded-md p-2 w-full"
                value={selectedCustomer.email}
                onChange={(e) => setSelectedCustomer({
                  ...selectedCustomer, 
                  email: e.target.value
                })}
              />
              <input 
                placeholder="Téléphone" 
                className="border rounded-md p-2 w-full"
                value={selectedCustomer.phone}
                onChange={(e) => setSelectedCustomer({
                  ...selectedCustomer, 
                  phone: e.target.value
                })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Achats Totaux" 
                  type="number"
                  className="border rounded-md p-2 w-full"
                  value={selectedCustomer.totalPurchases}
                  onChange={(e) => setSelectedCustomer({
                    ...selectedCustomer, 
                    totalPurchases: Number(e.target.value)
                  })}
                />
                <input 
                  type="date"
                  className="border rounded-md p-2 w-full"
                  value={selectedCustomer.lastPurchaseDate}
                  onChange={(e) => setSelectedCustomer({
                    ...selectedCustomer, 
                    lastPurchaseDate: e.target.value
                  })}
                />
              </div>
              <div className="flex justify-between space-x-4">
                <button 
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  onClick={handleSaveCustomer}
                >
                  Enregistrer
                </button>
                <button 
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;