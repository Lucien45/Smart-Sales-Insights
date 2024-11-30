
import AchatsParClientChart from '../../components/AchatsParClientChart';
import ProductsDonutChart from '../../components/ProductsDonutChart';

const Dashboard = () => {
  return (
    <div>
      <h1>Tableau de bord des utilisateurs</h1>
      <AchatsParClientChart />
      <ProductsDonutChart/>
    </div>
  );
};

export default Dashboard;
