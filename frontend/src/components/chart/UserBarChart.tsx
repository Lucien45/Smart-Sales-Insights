import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Enregistrement des composants nécessaires
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type UserBarChartProps = {
  title: string;
  data: number[];
  labels: string[];
};

const UserBarChart = ({ title, data, labels }: UserBarChartProps) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',  // Couleur des barres
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',  // Couleur au survol
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,  // Assurez-vous que l'axe X commence à 0
      },
      y: {
        beginAtZero: true,  // Assurez-vous que l'axe Y commence à 0
      },
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default UserBarChart;
