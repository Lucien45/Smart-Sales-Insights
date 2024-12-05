import { Categorie } from "./Categorie";

export interface Produit {
  id: number;
  nom: string;
  prix: string;
  stock: number;
  idCategorie: Categorie;
}
