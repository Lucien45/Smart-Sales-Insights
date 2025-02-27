export interface IUtilisateur {
  id: number;
  username: string;
  mail: string;
  password: string;
  type: 'user' | 'superuser';
  date_creation: Date;
}

export interface FormDataUser {
  username: string;
  mail: string;
  password: string;
  type: 'user' | 'superuser';
}
