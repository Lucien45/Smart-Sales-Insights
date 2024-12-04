import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

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
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre de ventes'
        }
      },
    },
    layout: {
      padding: {
        left: 4,
        right: 4
      },
      margin: {
        left: 4,
        right: 4
      },
    },
    barThickness: 30,
    categoryPercentage: 1.0 // Utilise 100% de l'espace de la catégorie
  };

  const backgroundColor = data.map(() =>
    `hsl(${Math.random() * 360}, 70%, 50%)`
  );

  const chartData = {
    labels: data.map(item => item.client),
    datasets: [
      {
        label: 'Nombre de ventes',
        data: data.map(item => item.ventes),
        backgroundColor: backgroundColor,
        borderColor: '#2563eb',
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="rounded-lg shadow-lg bg-white p-4">
        <div className="flex items-center justify-center h-full">
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="rounded-lg p-4 h-48 w-fit">
      <div className='overflow-y-auto w-[92vw] md:w-[40vw]'>
        <Bar options={chartOptions} data={chartData} />
      </div>
    </Card>
  );
};

export default AchatsParClientChart;