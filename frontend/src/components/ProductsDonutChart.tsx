import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductsDonutChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderWidth: 1,
      hoverOffset: 4,
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/produits/stats'); // Ajustez l'URL selon votre API
        const categories = await response.json();
        
        const labels = categories.map( cat => cat.categorie);
        const data = categories.map( cat => cat.quantite_totale );
        
        // Génération de couleurs aléatoires pour chaque catégorie
        const backgroundColor = categories.map(() => 
          `hsl(${Math.random() * 360}, 70%, 50%)`
        );

        setChartData({
          labels,
          datasets: [{
            data,
            backgroundColor,
            borderWidth: 1,
            hoverOffset: 4,
          }],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw} produits`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Card className="w-48 h-96 p-4 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4 text-center">
        Distribution des Produits par Catégorie
      </h2>
      <div className="w-48 h-48 flex justify-center items-center">
        <Doughnut data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default ProductsDonutChart;