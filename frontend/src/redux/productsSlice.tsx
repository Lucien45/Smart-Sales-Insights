import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const API_URL = 'http://localhost:3000/products';

export const getProducts = async() : Promise<TodoInterface[]> => {
    const result = await axios.get(API_URL);
    return result.data;
  }
  
  export const createTask = async (title: string): Promise<TodoInterface> => {
    const result = await axios.post(API_URL, { 
      title, 
      completed: false 
    });
    return result.data;   
  }
  
  export const updateTask = async (id: number, todo: Partial<TodoInterface>) : Promise<TodoInterface> => {
    const result = await axios.put(`${API_URL}/${id}`, todo);
    return result.data;
  }
  
  export const deleteTask = async(id: number): Promise<TodoInterface[]> => {
    const result = await axios.delete(`${API_URL}/${id}`);
    return result.data;
  }