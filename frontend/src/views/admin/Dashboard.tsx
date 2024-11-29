import React from 'react';
import UserBarChart from '../../components/chart/UserBarChart'

const Dashboard = () => {
  const userData = [120, 80, 150, 200, 95];
  const userLabels = ['Administrateurs', 'Éditeurs', 'Visiteurs', 'Modérateurs', 'Clients'];

  return (
    <div>
      <h1>Tableau de bord des utilisateurs</h1>
      <UserBarChart title="Nombre d'utilisateurs par catégorie" data={userData} labels={userLabels} />
    </div>
  );
};

export default Dashboard;
