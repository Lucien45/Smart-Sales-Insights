import React, { useState } from 'react';
import { AddProduct } from './AddProduct';

export const AddAllProducts: React.FC = () => {
  const [productForms, setProductForms] = useState<number[]>([0]);

  const addNewForm = () => {
    setProductForms([...productForms, productForms.length]);
  };

  const handleProductAdded = () => {
    // Logique si nécessaire, par exemple rafraîchir une liste
    console.log('Produit ajouté');
  };

  return (
    <div>
      <h1>Ajouter plusieurs produits</h1>
      {productForms.map((formId) => (
        <div key={formId} style={{ marginBottom: '20px' }}>
          <AddProduct onProductAdded={handleProductAdded} />
        </div>
      ))}
      <button onClick={addNewForm}>Ajouter un autre produit</button>
    </div>
  );
};
