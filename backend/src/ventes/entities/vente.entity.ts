// import { Client } from 'src/clients/entities/client.entity';
// import { Produit } from 'src/produits/entities/produit.entity';
// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

import { Client } from 'src/clients/entities/client.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// @Entity('ventes')
// export class Vente {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   nombre: number;

//   @Column()
//   date_achat: Date;

//   @ManyToOne(() => Client, (client) => client.id)
//   @JoinColumn({ name: 'idClientId' })
//   idClient: Client;

//   @ManyToOne(() => Produit, (produit) => produit.id)
//   @JoinColumn({ name: 'idProduitId' })
//   idProduit: Produit;
// }
@Entity('ventes')
export class Vente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: number;

  @Column()
  date_achat: Date;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'idClientId' })
  idClient: Client;

  @ManyToOne(() => Produit, { eager: true })
  @JoinColumn({ name: 'idProduitId' })
  idProduit: Produit;
}
