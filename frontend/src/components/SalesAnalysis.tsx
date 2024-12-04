import React, { useState } from 'react';
import '../assets/css/SalesAnalysis.css';

const SalesAnalysis: React.FC = () => {
  // Données statiques avec client ajouté
  const staticComparisonData = [
    { product: "Produit 1", category: "Catégorie A", client: "Client 1", sales: 120 },
    { product: "Produit 2", category: "Catégorie A", client: "Client 2", sales: 90 },
    { product: "Produit 1", category: "Catégorie B", client: "Client 3", sales: 80 },
    { product: "Produit 2", category: "Catégorie B", client: "Client 1", sales: 110 },
  ];

  const staticSegmentData = [
    { date: "2023-12-01", sales: 50 },
    { date: "2023-12-02", sales: 70 },
    { date: "2023-12-03", sales: 40 },
    { date: "2023-12-04", sales: 100 },
  ];

  const staticAnomalies = [
    { date: "2023-12-02", anomaly: "Baisse inhabituelle des ventes" },
    { date: "2023-12-04", anomaly: "Pic de ventes anormal" },
  ];

  const [comparisonResults, setComparisonResults] = useState([]);
  const [segmentResults, setSegmentResults] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  const [productFilter, setProductFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Extraire les options uniques des produits, catégories et clients
  const uniqueProducts = [...new Set(staticComparisonData.map((item) => item.product))];
  const uniqueCategories = [...new Set(staticComparisonData.map((item) => item.category))];
  const uniqueClients = [...new Set(staticComparisonData.map((item) => item.client))];

  // Filtrage manuel pour la comparaison
  const handleCompare = () => {
    const filteredData = staticComparisonData.filter(
      (item) =>
        (productFilter === "" || item.product === productFilter) &&
        (categoryFilter === "" || item.category === categoryFilter) &&
        (clientFilter === "" || item.client === clientFilter)
    );
    setComparisonResults(filteredData);
  };

  // Filtrage manuel pour la segmentation
  const handleSegment = () => {
    const filteredData = staticSegmentData.filter(
      (item) =>
        (startDate === "" || item.date >= startDate) &&
        (endDate === "" || item.date <= endDate)
    );
    setSegmentResults(filteredData);
  };

  // Activer/Désactiver les alertes
  const handleAlertsToggle = () => {
    const newState = !alertsEnabled;
    setAlertsEnabled(newState);
    setAnomalies(newState ? staticAnomalies : []);
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
            {uniqueProducts.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
          >
            <option value="">Sélectionner un client</option>
            {uniqueClients.map((client, index) => (
              <option key={index} value={client}>
                {client}
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
              {comparisonResults.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.category}</td>
                  <td>{item.client}</td>
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
            {segmentResults.map((item, index) => (
              <li key={index}>
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
            {anomalies.map((item, index) => (
              <li key={index}>
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
