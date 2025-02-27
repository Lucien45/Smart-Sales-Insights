import { Client } from 'src/clients/entities/client.entity';
import { Produit } from 'src/produits/entities/produit.entity';

export interface IVente {
  id: number;
  idClient: Client;
  idProduit: Produit;
  nombre: number;
  date_achat: Date;
}