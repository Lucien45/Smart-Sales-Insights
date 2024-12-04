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

  @Column()
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
