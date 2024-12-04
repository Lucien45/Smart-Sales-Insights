import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesByCategorieProps {
  userId: number;
  categorieId: number;
}

interface Sale {
  date_achat: string;
  nombre: number;
  idProduit: {
    nom: string;
  };
}

const SalesByCategorie = ({ userId, categorieId }: SalesByCategorieProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      // Réinitialiser les états
      setIsLoading(true);
      setError(null);
      setChartData(null);

      // Vérifier si les IDs sont valides
      if (!userId || !categorieId) {
        setIsLoading(false);
        setError("Utilisateur ou catégorie non sélectionné");
        return;
      }

      try {
        console.log(`Fetching data for userId: ${userId}, categorieId: ${categorieId}`);
        const response = await axios.get<Sale[]>(
          `http://localhost:3000/ventes/user/${userId}/categorie/${categorieId}`
        );

        // console.log('Received data:', response.data);

        if (response.data.length === 0) {
          setIsLoading(false);
          setError("Aucune vente trouvée pour cette période");
          return;
        }

        // Formatter les données
        const dates = response.data.map(item => 
          new Date(item.date_achat).toLocaleDateString('fr-FR')
        );
        const quantities = response.data.map(item => item.nombre);

        const newChartData = {
          labels: dates,
          datasets: [
            {
              label: 'Nombre de ventes',
              data: quantities,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1,
              fill: true,
            },
          ],
        };

        console.log('Formatted chart data:', newChartData);
        setChartData(newChartData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError("Erreur lors du chargement des données");
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [userId, categorieId]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Évolution des ventes par catégorie',
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

  if (isLoading) {
    return <div className="text-center p-4">Chargement des données...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (!chartData || !chartData.datasets) {
    return <div className="text-center p-4">Aucune donnée disponible</div>;
  }

  return (
    <div className="p-4 w-fit md:w-[40vw]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesByCategorie;