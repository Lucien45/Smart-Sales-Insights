import { Categorie } from 'src/categories/entities/categorie.entity';

export interface IProduit {
  id: number;
  nom: string;
  prix: number;
  stock: number;
  idCategorie: Categorie;
}
