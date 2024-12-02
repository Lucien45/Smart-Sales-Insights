import SalesChart from '../../components/SalesChart'; 
import { useSelector, useDispatch } from 'react-redux';
import AchatsParClientChart from '../../components/AchatsParClientChart';
import ProductsDonutChart from '../../components/ProductsDonutChart';
import { RootState, AppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getProfileUser } from '../../redux/authSlice';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [userInfo, setUserInfo] = useState({
    userId: 0,
    username: '',
    email: '',
    role: '',
  });

  const [selectedId, setSelectedId] = useState<number>(0); // ID sélectionné pour le graphique
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      dispatch(getProfileUser());
    } else {
      setUserInfo({
        userId: user.id,
        username: user.username,
        email: user.mail,
        role: user.type || 'Utilisateur',
      });
      setSelectedId(user.id); // Initialiser selectedId avec l'ID de l'utilisateur
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/clients');
        setAllUsers(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };
    fetchUsers();
  }, []);

  // Gestion du changement de sélection
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(Number(event.target.value)); // Mettre à jour selectedId
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Tableau de bord</h1>
      <AchatsParClientChart />
      <ProductsDonutChart />
      <Card className='p-4'>
        {userInfo.role === 'superuser' && (
          <div>
            <label htmlFor="">Veuillez choisir l'id de l'utilisateur</label>
            <select value={selectedId} name="userIdFroSales" onChange={(e) => handleChange(e)}>
              {allUsers.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.username} ID: {user.id}
                </option>
              ))}
            </select>
          </div>
        )}
        <SalesChart userId={selectedId} />
      </Card>
    </div>
  );
};

export default Dashboard;
