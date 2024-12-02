import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../types/Customer";

const initialState: Customer[] = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "123456789",
    idUser: 1,
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "987654321",
    idUser: 2,
  },
];

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.push(action.payload);
    },

    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },

    deleteCustomer: (state, action: PayloadAction<number>) => {
      return state.filter((customer) => customer.id !== action.payload);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
