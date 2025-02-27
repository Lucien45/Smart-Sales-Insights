import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../assets/css/SalesAnalysis.css';

const API_URL = "http://localhost:3000";

const SalesAnalysis: React.FC = () => {
  const [comparisonResults, setComparisonResults] = useState([]);
  const [segmentResults, setSegmentResults] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  const [productFilter, setProductFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Obtenez les catégories et clients au chargement
  const [categories, setCategories] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const categoriesResponse = await axios.get(`${API_URL}/categories`);
      setCategories(categoriesResponse.data);

      const clientsResponse = await axios.get(`${API_URL}/clients`);
      setClients(clientsResponse.data);

      const productsResponse = await axios.get(`${API_URL}/produits`);
      setProducts(productsResponse.data);
    };

    fetchFilters();
  }, []);

  const handleCompare = async () => {
    const response = await axios.get(`${API_URL}/ventes/user/${clientFilter}/categorie/${categoryFilter}`);
    setComparisonResults(response.data);
  };

  const handleSegment = async () => {
    const response = await axios.get(`${API_URL}/ventes`, {
      params: { startDate, endDate },
    });
    setSegmentResults(response.data);
  };

  const handleAlertsToggle = async () => {
    const newState = !alertsEnabled;
    setAlertsEnabled(newState);

    if (newState) {
      const anomaliesResponse = await axios.get(`${API_URL}/ventes/stats`);
      setAnomalies(anomaliesResponse.data);
    } else {
      setAnomalies([]);
    }
  };

  return (
    <div className="sales-analysis-container">
      {/* Titre */}
      <h1 className="sales-analysis-title">Analyse des Ventes et Achats</h1>

      {/* Comparaison des Performances */}
      <div className="performance-comparison">
        <h2>Comparaison des Performances</h2>
        <div>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="">Sélectionner un produit</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nom}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nom}
              </option>
            ))}
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
          >
            <option value="">Sélectionner un client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nom}
              </option>
            ))}
          </select>

          <button onClick={handleCompare}>Analyser les Performances</button>
        </div>
        {comparisonResults.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Client</th>
                <th>Ventes</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResults.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.nom}</td>
                  <td>{item.category.nom}</td>
                  <td>{item.client.nom}</td>
                  <td>{item.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Segmentation des Données */}
      <div className="data-segmentation">
        <h2>Segmentation des Données</h2>
        <div>
          <input
            type="date"
            placeholder="Date de début"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date de fin"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleSegment}>Segmenter les Données</button>
        </div>
        {segmentResults.length > 0 && (
          <ul>
            {segmentResults.map((item) => (
              <li key={item.id}>
                Date: {item.date}, Ventes: {item.sales}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Alertes d'Anomalies */}
      <div className="alerts-section">
        <h2>Alertes d'Anomalies</h2>
        <button onClick={handleAlertsToggle}>
          {alertsEnabled ? "Désactiver les Anomalies" : "Activer les Anomalies"}
        </button>
        {anomalies.length > 0 && (
          <ul>
            {anomalies.map((item) => (
              <li key={item.id}>
                Date: {item.date}, Anomalie: {item.anomaly}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SalesAnalysis;
