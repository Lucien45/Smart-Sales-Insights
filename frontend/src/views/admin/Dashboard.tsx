import React from 'react';
import UserBarChart from '../../components/chart/UserBarChart'
import { getProducts } from '../../services/produits.service';

const Dashboard = async () => {
  const userData = getProducts();
  // const data = userData;
    
  const userLabels = ['Administrateurs', 'Éditeurs', 'Visiteurs', 'Modérateurs', 'Clients'];

  return (
    <div>
      <h1>Tableau de bord des utilisateurs</h1>
      <UserBarChart title="Nombre d'utilisateurs par catégorie" data={[1,2,3]} labels={userLabels} />
    </div>
  );
};

export default Dashboard;
