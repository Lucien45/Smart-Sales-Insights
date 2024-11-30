import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les éléments nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({ userId }: { userId: number }) => {
  const [salesData, setSalesData] = useState<any>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      const response = await fetch(`http://localhost:3000/ventes/user/${userId}`);
      const data = await response.json();
      setSalesData(data);
    };

    fetchSalesData();
  }, [userId]);

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
      <h2>Évolution des ventes de l'utilisateur {userId}</h2>
      {chartData && <Line data={chartData} />}
    </div>
  );
};

export default SalesChart;
