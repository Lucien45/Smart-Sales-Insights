import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('utilisateurs')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  mail: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['user', 'superuser'], default: 'user' })
  type: 'user' | 'superuser';

  @CreateDateColumn()
  date_creation: Date;
}