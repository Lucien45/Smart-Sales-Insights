import { Plus, Search } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  onAdd,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Gestion des Clients</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un client"
            className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        </div>
        <button
          onClick={onAdd}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <Plus className="mr-2" size={16} /> Ajouter
        </button>
      </div>
    </div>
  );
};

export default Header;
