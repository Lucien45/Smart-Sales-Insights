/* eslint-disable prettier/prettier */
import { Utilisateur } from "src/users/entities/utilisateur.entity";
import { DeepPartial } from "typeorm";

export class CreateClientDto {
  nom: string;
  prenom: string;
  numeroPhone: string;
  email: string;
  idUtilisateur: DeepPartial<Utilisateur>;
}

export class UpdateClientDto {
  nom?: string;
  prenom?: string;
  numeroPhone?: string;
  email?: string;
  idUtilisateur?: DeepPartial<Utilisateur>;
}

