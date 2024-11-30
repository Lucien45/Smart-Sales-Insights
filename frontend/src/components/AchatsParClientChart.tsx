import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

// Enregistrer les composants ChartJS nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

interface VenteParClient {
  client: string;
  ventes: number;
}

const AchatsParClientChart = () => {
  const [data, setData] = useState<VenteParClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/stats/ventes-par-client');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: "Nombre d'achats par client",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.map(item => item.client),
    datasets: [
      {
        label: 'Nombre de ventes',
        data: data.map(item => item.ventes),
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return (
      <Card className="w-full h-96 border rounded-lg shadow-lg">
        <div className="flex items-center justify-center h-full">
          <p>Chargement des données...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full p-4 border rounded-lg shadow-lg">
      <div className="h-96 w-full">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </Card>
  );
};

export default AchatsParClientChart;