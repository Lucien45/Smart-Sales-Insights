import { Input } from '../ui/input';
import { Produit } from '../../types/Produit';
import React from 'react';

type TypeNewProduct = Omit<Produit, 'id'>;

const MainProduct = () => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const stockRef = React.useRef<HTMLSelectElement>(null);
  
  const [newProduct, setNewProduct] = React.useState<TypeNewProduct>({
    nom: '',
    prix: '',
    stock: 0,
    idCategorie: {
      id: 0,
      nom: ''
    }
  });

  // Fonction pour mettre à jour le produit avec les nouvelles valeurs
  const handleChange = () => {
    if (nameRef.current && stockRef.current) {
      setNewProduct({
        ...newProduct,
        nom: nameRef.current.value,
        stock: parseInt(stockRef.current.value) || 0, // Assurez-vous que stock soit un nombre
      });
    }
  };

  const handleSubmitNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Name:', newProduct.nom); 
    console.log('Stock:', newProduct.stock);
  }

  return (
    <div className='p-2 md:p-4 m-2 md:m-4 rounded-md border border-slate-900 w-[92vw] md:w-[60vw]'>
      <h1 className='text-center text-blue-500 mb-4'>Ajouter un nouveau produit</h1>
      <form 
        method='post' 
        className='flex flex-col gap-4'
        onSubmit={handleSubmitNewProduct}
      >
        <div className='flex flex-col'>
          <label htmlFor="product-name">Nom du produit</label>
          <Input 
            ref={nameRef} 
            type='text' 
            placeholder='Entrer ici le nom du produit' 
            name='product-name' 
            required 
            onChange={handleChange}
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="category-select">Catégorie du produit</label>
          <select 
            ref={stockRef} 
            className='p-2 rounded-md' 
            name="category-select" 
            id="category-select"
            onChange={handleChange}
          >
            <option value="">Choisir une catégorie</option>
            <option value="1">Nom</option>
            <option value="2">Prénom</option>
            <option value="3">Classe</option>
          </select>
        </div>
        
        <div className='flex flex-col md:flex-row justify-between'>
          <div>
            <label htmlFor="price">Prix d'un produit en Ariary</label>
            <Input 
              type='number' 
              min={0} 
              name="price" 
              onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="quantity">Nombre produit</label>
            <Input 
              type='number' 
              min={0} 
              name="quantity" 
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
        
        <Input 
          type='submit' 
          value="Enregistrer" 
          className='bg-blue-500 text-center cursor-pointer text-white'
        />
      </form>
    </div>
  );
}

export default MainProduct;
