import { Utilisateur } from 'src/users/entities/utilisateur.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  numeroPhone: string;

  @Column()
  email: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.id, {
    nullable: false,
  })
  idUtilisateur: Utilisateur;

}
