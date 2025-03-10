export interface User {
  id: number;
  username: string;
  mail: string;
  type: 'user' | 'superuser';
  dateCreation: string;
  dateMiseJour: string;
}

export interface AuthState {
  user: User | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any[],
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  identification: string;
  password: string;
}

export interface RegisterData {
  username: string;
  mail: string;
  password: string;
  role: string;
}

export interface UpdateDataUser  {
  username: string;
  mail: string;
  password: string;
  confirme_mdp: string,
  type: string;
}

export interface UpdateUserProps {
  id: number;
  onClose: () => void;
}
