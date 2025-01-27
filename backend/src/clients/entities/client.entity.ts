/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Utilisateur } from 'src/users/entities/utilisateur.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  nom: string;

  @Column()
  prenom: string;

  // Modification à faire pour ne paas alterer ma base de donnée
  @Column({ nullable: false, default: '12356' })
  numeroPhone: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'idUtilisateur' })
  idUtilisateur: Utilisateur;
}
