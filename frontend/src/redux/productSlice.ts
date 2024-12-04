import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

const initialState: Product[] = [
  {
    id: 1,
    nom: "Produit A",
    prix: 50.0,
    stock: 10,
    idCategorie: 1,
  },
  {
    id: 2,
    nom: "Produit B",
    prix: 30.0,
    stock: 5,
    idCategorie: 2,
  },
];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
