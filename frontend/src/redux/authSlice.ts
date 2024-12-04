/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Utils } from '../utils/Utils';
import { AuthState, LoginCredentials, RegisterData } from '../types/Utilisateur';

const API_URL = 'http://localhost:3000/users';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'La connexion a échoué');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'L\'inscription a échoué');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
      try {
          localStorage.removeItem('token');
      } catch (error) {
          return rejectWithValue('Erreur lors de la déconnexion.');
      }
  }
);

export const getAllUser = createAsyncThunk('auth/getAllUser', async(_, { rejectWithValue }) =>{
  try {
    const response = await axios.get(`${API_URL}/list-user`);
    return response.data;
  } catch (error) {
    return rejectWithValue('Erreur lors de la déconnexion.');
  }
})

export const getProfileUser = createAsyncThunk(
  'auth/getProfileUser',
  async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response?.data?.message || 'Échec de la récupération du profil');
      
    }
  }
);

const initialState: AuthState = {
  user: null,
  users: [],
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Utils.success('Vous êtes connecté avec succès.', 'Welcome back!');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        Utils.errorPage(state.error || 'Une erreur s\'est produite lors de la connexion.', 'La connexion a échoué');
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        Utils.success('compte cree avec succes.', 'Registration Successful');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        Utils.errorPage(state.error || 'Une erreur s\'est produite lors de l\'inscription.', 'Registration Failed');
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        Utils.success('Vous avez été déconnecté avec succès.','Logged Out')
      })
      .addCase(getProfileUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        if (state.error !== 'Aucun token trouvé.') {
          Utils.errorPage(state.error || 'Impossible de récupérer le profil utilisateur.', 'Erreur');
        }
      })
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;