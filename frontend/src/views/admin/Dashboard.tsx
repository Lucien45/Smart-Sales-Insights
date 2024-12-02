import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Card } from 'react-bootstrap';

// Components
import SalesChart from '../../components/SalesChart';
import AchatsParClientChart from '../../components/AchatsParClientChart';
import ProductsDonutChart from '../../components/ProductsDonutChart';
import SalesByCategorie from '../../components/SalesByCategorie';

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
          {user.username} (ID: {user.id})
        </option>
      ))}
    </select>
  </div>
);

const CategorySelector = ({
  value,
  onChange,
  categories
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: Category[];
}) => (
  <div className="mb-4 ml-4">
    <label className="mr-2">Catégorie :</label>
    <select
      value={value}
      onChange={onChange}
      className="p-2 border rounded"
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
  
  // State
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: 0,
    username: '',
    email: '',
    role: '',
  });
  const [selectedIds, setSelectedIds] = useState({
    sales: 0,
    category: 0
  });
  const [categorieId, setCategorieId] = useState<number>(1); // Initialiser à 1 au lieu de 0
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch user profile
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
    setSelectedIds(prev => ({ ...prev, sales: user.id, category: user.id }));
  }, [dispatch, user]);

  // Fetch all users and categories
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [usersRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:3000/clients'),
          axios.get('http://localhost:3000/categories')
        ]);
        setAllUsers(usersRes.data);
        setCategories(categoriesRes.data);
        // Set initial category
        if (categoriesRes.data.length > 0) {
          setCategorieId(categoriesRes.data[0].id);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchInitialData();
  }, []);

  // Handlers
  const handleUserChange = (type: 'sales' | 'category') => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedIds(prev => ({
      ...prev,
      [type]: Number(event.target.value)
    }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategorieId(Number(event.target.value));
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Tableau de bord</h1>
      
      <AchatsParClientChart />
      <ProductsDonutChart />
      
      <Card className="p-4">
        {userInfo.role === 'superuser' && (
          <UserSelector
            value={selectedIds.sales}
            onChange={handleUserChange('sales')}
            users={allUsers}
            label="Veuillez choisir l'id de l'utilisateur"
          />
        )}
        <SalesChart userId={selectedIds.sales} />
      </Card>

      <Card className="p-4">
        {userInfo.role === 'superuser' && (
          <div className="flex flex-col items-center">
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
  );
};

export default Dashboard;