import { Client } from 'src/clients/entities/client.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('ventes')
export class Vente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_achat: Date;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'idClientId' })
  idClient: Client;

  @ManyToOne(() => Produit, { eager: true })
  @JoinColumn({ name: 'idProduitId' })
  idProduit: Produit;
}
