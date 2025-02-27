import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../types/Client";

interface ClientState {
  clients: Client[];
  searchQuery: string;
}

const initialState: ClientState = {
  clients: ([] = [
    {
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
    {
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
    {
      id: 3,
      nom: "Lemoine",
      prenom: "Marie",
      numeroPhone: "0304050607",
      email: "marie.lemoine@example.com",
      idUtilisateur: {
        id: 3,
        username: "remi",
        mail: "remi@gmail.com",
        password:
          "$2b$10$NGvhjMWlbrJ583osYg8n0u42hAI0iqlk0hjqaMd2UXkMFaA8feqhK",
        type: "superuser",
        date_creation: "2024-12-04T02:20:00.467Z",
      },
    },
    {
      id: 4,
      nom: "Bernard",
      prenom: "Sophie",
      numeroPhone: "0405060708",
      email: "sophie.bernard@example.com",
      idUtilisateur: {
        id: 4,
        username: "toavina",
        mail: "toavina@gmail.com",
        password:
          "$2b$10$b2ge/HeR.KVygXlfZasIQuIsLXql799RMeKk7FJyy69ejo4yuSQ2y",
        type: "superuser",
        date_creation: "2024-12-04T02:20:10.762Z",
      },
    },
    {
      id: 5,
      nom: "Durand",
      prenom: "Luc",
      numeroPhone: "0506070809",
      email: "luc.durand@example.com",
      idUtilisateur: {
        id: 5,
        username: "lucien",
        mail: "lucien@gmail.com",
        password:
          "$2b$10$yLUHEoHUHy1sxDs91ZhwSOJhipE1l2U1zossH7gq4pxbN1r/bzJb.",
        type: "superuser",
        date_creation: "2024-12-04T02:20:24.379Z",
      },
    },
  ]),
  searchQuery: "",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<Client[]>) {
      state.clients = action.payload;
    },

    addClient(state, action: PayloadAction<Client>) {
      state.clients.push(action.payload);
    },

    deleteClient(state, action: PayloadAction<number>) {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },

    updateClient(state, action: PayloadAction<Client>) {
      const index = state.clients.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setClients, addClient, deleteClient,updateClient, setSearchQuery } =
  clientSlice.actions;

export default clientSlice.reducer;
