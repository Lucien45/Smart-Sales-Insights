import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { getProfileUser } from '../../redux/authSlice';


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

  const optionsChart = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ventes par clients',
        font : {
          size: 20
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre de ventes'
        }
      },
    },
  };

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
    <div className='w-[92vw] md:w-[40vw]'>      
      {chartData ? <Line data={chartData} options={ optionsChart }/> : <div>Il n'y a pas encore de vente pour cet utilisateur</div>}
    </div>
  );
};

export default SalesChart;
