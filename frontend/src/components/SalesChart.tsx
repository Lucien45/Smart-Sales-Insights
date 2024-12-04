import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { getProfileUser } from '../redux/authSlice';

// Enregistrer les éléments nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({ userId }: { userId: number }) => {
  const [salesData, setSalesData] = useState<any>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [userRole, setUserRole] = useState('user');
  const [usersList, setUsersList] = useState<any[]>([]); // Liste des utilisateurs

  useEffect(() => {
    const fetchProfile = async () => {
      const userData =  getProfileUser();
      setUserRole(userData.role); // Assurez-vous que cette fonction retourne le rôle et les informations
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (userRole === 'superuser') {
      const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3000/users');
        setUsersList(response.data);
        console.log(response);
      };
      fetchUsers();
    }
  }, [userRole]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const response = await axios.get(`http://localhost:3000/ventes/user/${userId}`);
      const data = response.data;
      setSalesData(data);
    };

    fetchSalesData();
  }, [userId]); // On écoute la mise à jour de selectedUser

  useEffect(() => {
    if (salesData.length > 0) {
      const dates = salesData.map((sale: any) => sale.date);
      const quantities = salesData.map((sale: any) => sale.nombre);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Ventes',
            data: quantities,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      });
    }
  }, [salesData]);

  return (
    <div>
      <h2>Évolution des ventes</h2>        
      {chartData ? <Line data={chartData} /> : <div>Veuilez choisir un id utilisateur valide</div>}
    </div>
  );
};

export default SalesChart;
