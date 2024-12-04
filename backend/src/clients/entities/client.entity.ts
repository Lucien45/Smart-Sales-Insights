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

  // Modification à faire pour ne paas alterer ma base de donnée
  @Column({ nullable: false, default: '12356' })
  numeroPhone: string;

  // Modification à faire pour ne paas alterer ma base de donnée
  @Column({ nullable: false, default: '12356' })
  email: string;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.id, {
    nullable: false,
  })
  idUtilisateur: Utilisateur;
}
