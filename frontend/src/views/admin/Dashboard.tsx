import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Card } from 'react-bootstrap';

// Components
import AchatsParClientChart from '../../components/chart/AchatsParClientChart';
import ProductsDonutChart from '../../components/chart/ProductsDonutChart';
import SalesByCategorie from '../../components/chart/SalesByCategorie';
import SalesChart from '../../components/chart/SalesChart';

// Types & Redux
import { RootState, AppDispatch } from '../../redux/store';
import { getProfileUser } from '../../redux/authSlice';


interface UserInfo {
  userId: number;
  username: string;
  email: string;
  role: string;
}

interface User {
  id: number;
  username: string;
}

interface Category {
  id: number;
  nom: string;
}

const UserSelector = ({ 
  value, 
  onChange, 
  users, 
  label 
}: { 
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  users: User[];
  label: string;
}) => (
  <div className="mb-4">
    <label className="mr-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="p-2 border rounded"
    >
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username} ID: {user.id}
        </option>
      ))}
    </select>
  </div>
);

const CategorySelector = ({ value, onChange, categories }: { 
  value: number; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
  categories: Category[];
}) => (
  <div className="mb-4">
    <label className="mr-2 text-gray-700">Catégorie :</label>
    <select
      value={value}
      onChange={onChange}
      className="p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.nom}
        </option>
      ))}
    </select>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: 0,
    username: '',
    email: '',
    role: '',
  });
  const [selectedIds, setSelectedIds] = useState({
    sales: 0,
    category: 0,
  });
  const [categorieId, setCategorieId] = useState<number>(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!user) {
      dispatch(getProfileUser());
      return;
    }

    setUserInfo({
      userId: user.id,
      username: user.username,
      email: user.mail,
      role: user.type || 'Utilisateur',
    });
    setSelectedIds((prev) => ({ ...prev, sales: user.id, category: user.id }));
  }, [dispatch, user]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [usersRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:3000/clients'),
          axios.get('http://localhost:3000/categories'),
        ]);
        setAllUsers(usersRes.data);
        setCategories(categoriesRes.data);
        if (categoriesRes.data.length > 0) {
          setCategorieId(categoriesRes.data[0].id);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchInitialData();
  }, []);

  const handleUserChange = (type: 'sales' | 'category') => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedIds((prev) => ({
      ...prev,
      [type]: Number(event.target.value),
    }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategorieId(Number(event.target.value));
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col gap-4 ">      
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="rounded-lg w-[40vw] ">
          <AchatsParClientChart />
        </div>
        <div className="rounded-lg w-[40vw]">
          <ProductsDonutChart />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">      
        <Card className="p-4 md:w-[40vw] h-48 bg-green-600 w-fit">
          {userInfo.role === 'superuser' && (
            <UserSelector
              value={selectedIds.sales}
              onChange={handleUserChange('sales')}
              users={allUsers}
              label="Utilisateur"
            />
          )}
          <SalesChart userId={selectedIds.sales} />
        </Card>

        <Card className="w-fit md:w-[40vw] h-48">
          {userInfo.role === 'superuser' && (
            <div className="flex flex-row justify-between gap-4 p-2">
              <UserSelector
                value={selectedIds.category}
                onChange={handleUserChange('category')}
                users={allUsers}
                label="Utilisateur :"
              />
              <CategorySelector
                value={categorieId}
                onChange={handleCategoryChange}
                categories={categories}
              />
            </div>
          )}
          <SalesByCategorie 
            userId={selectedIds.category} 
            categorieId={categorieId} 
          />
        </Card>
        </div>
      </div>
  );
};

export default Dashboard;