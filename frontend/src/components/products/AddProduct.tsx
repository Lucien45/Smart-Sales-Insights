import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Categorie {
  id: number;
  nom: string;
}

export const AddProduct: React.FC<{ onProductAdded: () => void }> = ({ onProductAdded }) => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [nomProduit, setNomProduit] = useState('');
  const [categorie, setCategorie] = useState<number | 'new'>('new');
  const [nouvelleCategorie, setNouvelleCategorie] = useState('');
  const [prix, setPrix] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    // Récupérer les catégories existantes depuis l'API
    axios.get('/categories').then((response) => setCategories(response.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomProduit || prix <= 0 || stock <= 0) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      let categorieId = categorie;

      if (categorie === 'new') {
        // Créer une nouvelle catégorie
        const response = await axios.post('/categories', { nom: nouvelleCategorie });
        categorieId = response.data.id;
      }

      // Ajouter un produit
      await axios.post('/produits', {
        nom: nomProduit,
        idCategorie: categorieId,
        prix,
        stock,
      });

      alert('Produit ajouté avec succès !');
      setNomProduit('');
      setCategorie('new');
      setNouvelleCategorie('');
      setPrix(0);
      setStock(0);

      onProductAdded(); // Appeler un callback pour rafraîchir les données parent
    } catch (error) {
      console.error('Erreur lors de l’ajout du produit:', error);
      alert('Erreur lors de l’ajout du produit.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom du produit :</label>
        <input
          type="text"
          value={nomProduit}
          onChange={(e) => setNomProduit(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Catégorie :</label>
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value === 'new' ? 'new' : Number(e.target.value))}
        >
          <option value="new">Créer une nouvelle catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>
        {categorie === 'new' && (
          <div>
            <label>Nouvelle catégorie :</label>
            <input
              type="text"
              value={nouvelleCategorie}
              onChange={(e) => setNouvelleCategorie(e.target.value)}
              required
            />
          </div>
        )}
      </div>
      <div>
        <label>Prix unitaire :</label>
        <input
          type="number"
          value={prix}
          onChange={(e) => setPrix(Number(e.target.value))}
          min="0.01"
          step="0.01"
          required
        />
      </div>
      <div>
        <label>Nombre en stock :</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          min="1"
          required
        />
      </div>
      <button type="submit">Ajouter le produit</button>
    </form>
  );
};
