import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import clientReducer from "./clientSlice";
import produitReducer from "./produitSlice";
import venteReducer from "./venteSlice";
import toggleMenuReducer from "./toggleMenuSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    produit: produitReducer,
    vente: venteReducer,
    toggleMenu: toggleMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
