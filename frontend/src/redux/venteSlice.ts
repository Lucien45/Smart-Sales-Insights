// venteSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vente } from "../types/Vente";

interface VenteState {
  ventes: Vente[];
}

const initialState: VenteState = {
  ventes: ([] = [
    {
      id: 1,
      nombre: 9,
      date_achat: "2024-11-11T11:36:25.631Z",
      idClient: {
        id: 1,
        nom: "Dupont",
        prenom: "Jean",
        numeroPhone: "0102030405",
        email: "jean.dupont@example.com",
        idUtilisateur: {
          id: 1,
          username: "kia",
          mail: "kia@gmail.com",
          password:
            "$2b$10$qRBv13H56pZluwgWceevlOM8QY0LUB6g/P3VviUb.7/.UjYbvhKz.",
          type: "superuser",
          date_creation: "2024-12-04T02:19:15.643Z",
        },
      },
      idProduit: {
        id: 2,
        nom: "T-shirt",
        prix: "19.99",
        stock: 200,
        idCategorie: { id: 2, nom: "Vêtements" },
      },
    },
    {
      id: 2,
      nombre: 10,
      date_achat: "2024-11-14T03:03:00.780Z",
      idClient: {
        id: 1,
        nom: "Dupont",
        prenom: "Jean",
        numeroPhone: "0102030405",
        email: "jean.dupont@example.com",
        idUtilisateur: {
          id: 1,
          username: "kia",
          mail: "kia@gmail.com",
          password:
            "$2b$10$qRBv13H56pZluwgWceevlOM8QY0LUB6g/P3VviUb.7/.UjYbvhKz.",
          type: "superuser",
          date_creation: "2024-12-04T02:19:15.643Z",
        },
      },
      idProduit: {
        id: 4,
        nom: "Canapé",
        prix: "499.99",
        stock: 30,
        idCategorie: { id: 4, nom: "Meubles" },
      },
    },
    {
      id: 3,
      nombre: 7,
      date_achat: "2024-11-24T12:17:31.403Z",
      idClient: {
        id: 2,
        nom: "Martin",
        prenom: "Paul",
        numeroPhone: "0203040506",
        email: "paul.martin@example.com",
        idUtilisateur: {
          id: 2,
          username: "tanjona",
          mail: "tanjona@gmail.com",
          password:
            "$2b$10$Hy.r9cU2Sgt1cM4vPLjX7u06DCUlfNj72MMUzTeiPISfrp58dHWUW",
          type: "superuser",
          date_creation: "2024-12-04T02:19:40.213Z",
        },
      },
      idProduit: {
        id: 3,
        nom: "Pizza Margherita",
        prix: "9.99",
        stock: 150,
        idCategorie: { id: 3, nom: "Alimentation" },
      },
    },
  ]),
};

const venteSlice = createSlice({
  name: "vente",
  initialState,
  reducers: {
    setVentes(state, action: PayloadAction<Vente[]>) {
      state.ventes = action.payload;
    },
    addVente(state, action: PayloadAction<Vente>) {
      state.ventes.push(action.payload);
    },
    deleteVente(state, action: PayloadAction<number>) {
      state.ventes = state.ventes.filter(
        (vente) => vente.id !== action.payload
      );
    },
  },
});

export const { setVentes, addVente, deleteVente } = venteSlice.actions;

export default venteSlice.reducer;
