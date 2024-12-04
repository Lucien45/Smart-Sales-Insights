import { IsNotEmpty } from 'class-validator';
import { Utilisateur } from 'src/users/entities/utilisateur.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
  email: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.id, {
    nullable: false,
  })
  idUtilisateur: Utilisateur;
}
