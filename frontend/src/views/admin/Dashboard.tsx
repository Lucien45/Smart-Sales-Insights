
import AchatsParClientChart from '../../components/AchatsParClientChart';
import ProductsDonutChart from '../../components/ProductsDonutChart';
import SalesChart from '../../components/SalesChart';

const Dashboard = () => {
  return (
    <div>
      <h1>Tableau de bord des utilisateurs</h1>
      <AchatsParClientChart />
      <ProductsDonutChart/>
      <SalesChart userId={3}/>
    </div>
  );
};

export default Dashboard;
