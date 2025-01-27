/* eslint-disable prettier/prettier */
import { Produit } from 'src/produits/entities/produit.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('categories')
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @OneToMany(() => Produit, (produit) => produit.idCategorie)
  produits: Produit[];
}
