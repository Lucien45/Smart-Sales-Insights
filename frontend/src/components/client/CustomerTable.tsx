import { Edit, Info, Trash2 } from "lucide-react";
import { Customer } from "../../types/DataCustomer";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: number) => void;
  onViewDetails: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{`${customer.firstName} ${customer.lastName}`}</td>
              <td className="p-3 text-right">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => onViewDetails(customer)}
                    className="text-gray-600 hover:text-gray-800 border border-gray-600 rounded-md px-3 py-1 flex items-center"
                  >
                    <Info size={16} className="mr-2" /> Détails
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="text-blue-500 hover:text-blue-700 border border-blue-500 rounded-md px-3 py-1 flex items-center"
                  >
                    <Edit size={16} className="mr-2" /> Modifier
                  </button>
                  <button
                    onClick={() => onDelete(customer.id)}
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
  );
};

export default CustomerTable;
