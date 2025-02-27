import { Client } from "./Client";
import { Produit } from "./Produit";

export interface Vente {
  id: number;
  nombre: number;
  date_achat: string;
  idClient: Client;
  idProduit: Produit;
}
