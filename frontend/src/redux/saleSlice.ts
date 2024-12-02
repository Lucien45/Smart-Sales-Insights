import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sales } from "../types/Sales";

const initialState: Sales[] = [
  {
    id: 1,
    idClient: 1,
    idProduit: 1,
    nombre: 5,
    dateAchat: "20/12/2023",
  },
  {
    id: 2,
    idClient: 1,
    idProduit: 2,
    nombre: 5,
    dateAchat: "20/12/2023",
  },
  {
    id: 3,
    idClient: 2,
    idProduit: 1,
    nombre: 5,
    dateAchat: "20/12/2023",
  },
];

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addSales: (state, action: PayloadAction<Sales>) => {
      state.push(action.payload);
    },

    updateSales: (state, action: PayloadAction<Sales>) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteSales: (state, action: PayloadAction<number>) => {
      return state.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSales, updateSales, deleteSales } = salesSlice.actions;

export default salesSlice.reducer;
