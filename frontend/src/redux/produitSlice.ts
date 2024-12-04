// produitSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Produit } from "../types/Produit";

interface ProduitState {
  produits: Produit[];
}

const initialState: ProduitState = {
  produits: ([] = [
    {
      id: 1,
      nom: "Smartphone",
      prix: "599.99",
      stock: 50,
      idCategorie: { id: 1, nom: "Électronique" },
    },
    {
      id: 2,
      nom: "T-shirt",
      prix: "19.99",
      stock: 200,
      idCategorie: { id: 2, nom: "Vêtements" },
    },
    {
      id: 3,
      nom: "Pizza Margherita",
      prix: "9.99",
      stock: 150,
      idCategorie: { id: 3, nom: "Alimentation" },
    },
    {
      id: 4,
      nom: "Canapé",
      prix: "499.99",
      stock: 30,
      idCategorie: { id: 4, nom: "Meubles" },
    },
    {
      id: 5,
      nom: "Roman",
      prix: "14.99",
      stock: 100,
      idCategorie: { id: 5, nom: "Livres" },
    },
  ]),
};

const produitSlice = createSlice({
  name: "produit",
  initialState,
  reducers: {
    setProduits(state, action: PayloadAction<Produit[]>) {
      state.produits = action.payload;
    },
    addProduit(state, action: PayloadAction<Produit>) {
      state.produits.push(action.payload);
    },
    deleteProduit(state, action: PayloadAction<number>) {
      state.produits = state.produits.filter(
        (produit) => produit.id !== action.payload
      );
    },
  },
});

export const { setProduits, addProduit, deleteProduit } = produitSlice.actions;

export default produitSlice.reducer;
