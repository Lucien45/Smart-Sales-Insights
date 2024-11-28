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
      return rejectWithValue(error.response?.data?.message || 'Login failed');
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
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
});

export const getProfileUser = createAsyncThunk(
  'auth/getProfileUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

const initialState: AuthState = {
  user: null,
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
        Utils.success('You have successfully logged in.', 'Welcome back!');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        Utils.errorPage(state.error || 'An error occurred during login.', 'Login Failed');
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        Utils.success('Please login with your new account.', 'Registration Successful');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        Utils.errorPage(state.error || 'An error occurred during registration.', 'Registration Failed');
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        Utils.success('You have been successfully logged out.','Logged Out')
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
        Utils.errorPage(state.error || 'Failed to fetch user profile.', 'Error');
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;