/* eslint-disable prettier/prettier */
import { Client } from "src/clients/entities/client.entity";
import { Produit } from "src/produits/entities/produit.entity";
import { DeepPartial } from "typeorm";

export class CreateVenteDto {
  nombre: number;
  date_achat: Date;
  idClient: DeepPartial<Client>; // Corrigé
  idProduit: DeepPartial<Produit>; // Corrigé
}

export class UpdateVenteDto {
  nombre?: number;
  date_achat?: Date;
  idClient?: DeepPartial<Client>; // Corrigé
  idProduit?: DeepPartial<Produit>; // Corrigé
}