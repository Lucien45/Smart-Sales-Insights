import { Client } from 'src/clients/entities/client.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('ventes')
export class Vente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.id, { nullable: false })
  idClient: Client;

  @ManyToOne(() => Produit, (produit) => produit.id, { nullable: false })
  idProduit: Produit;

  @Column()
  nombre: number;

  @CreateDateColumn()
  date_achat: Date;
}
