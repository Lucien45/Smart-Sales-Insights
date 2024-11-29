import { Categorie } from 'src/categories/entities/categorie.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('produits')
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column('decimal')
  prix: number;

  @Column()
  stock: number;

  @ManyToOne(() => Categorie, (categorie) => categorie.produits)
  idCategorie: Categorie;
}