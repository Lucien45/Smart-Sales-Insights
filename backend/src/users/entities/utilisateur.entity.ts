/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date_creation: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", })
  date_mise_jour: Date;
}
