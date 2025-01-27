/* eslint-disable prettier/prettier */
import { Categorie } from "src/categories/entities/categorie.entity";
import { DeepPartial } from "typeorm";

export class CreateProduitDto {
  nom: string;
  prix: number;
  stock: number;
  idCategorie: DeepPartial<Categorie>; 
}

export class UpdateProduitDto {
  nom?: string;
  prix?: number;
  stock?: number;
  idCategorie?: DeepPartial<Categorie>; 
}