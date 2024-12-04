import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import customerReducer from "./customerSlice";
import productReducer from "./productSlice";
import salesReducer from "./saleSlice";
import toggleMenuReducer from "./toggleMenuSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    products: productReducer,
    sales: salesReducer,
    toggleMenu: toggleMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
