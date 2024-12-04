import { Utilisateur } from 'src/users/entities/utilisateur.entity';

export interface IClient {
  id: number;
  nom: string;
  prenom: string;
  idUtilisateur: Utilisateur;
}
