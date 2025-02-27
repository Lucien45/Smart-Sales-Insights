import { Utilisateur } from "./UtilisateurK";

export interface Client {
  id: number;
  nom: string;
  prenom: string;
  numeroPhone: string;
  email: string;
  idUtilisateur: Utilisateur;
}
