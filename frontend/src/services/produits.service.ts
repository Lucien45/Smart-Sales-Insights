import { IProduit } from './../../../backend/src/types/Produit';
import axios from 'axios';

export const API_URL = 'http://localhost:3000/produits';

export const getProducts = async() : Promise<IProduit[]> => {
    const result = await axios.get(API_URL);
    return result.data;
  }
  
  export const createProduct = async (title: string): Promise<IProduit> => {
    const result = await axios.post(API_URL, { 
      title, 
      completed: false 
    });
    return result.data;   
  }
  
  export const updateProduct = async (id: number, product: Partial<IProduit>) : Promise<IProduit> => {
    const result = await axios.put(`${API_URL}/${id}`, product);
    return result.data;
  }
  
  export const deleteProduct = async(id: number): Promise<IProduit[]> => {
    const result = await axios.delete(`${API_URL}/${id}`);
    return result.data;
  }