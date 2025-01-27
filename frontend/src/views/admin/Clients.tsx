import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteClient, setSearchQuery } from "../../redux/clientSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Dialog from "../../components/client/Dialog";
import TableClient from "../../components/client/TableClients";
import Header from "../../components/client/Header";
import TableProduits from "../../components/client/TableProduit";
import { InfoVente } from "../../types/InfoVente";
import { Client } from "../../types/Client";
import { Utilisateur } from "../../types/UtilisateurK";
import { User } from "../../types/Utilisateur";

const ClientTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Sélection des données depuis le store Redux
  const { clients, searchQuery } = useSelector(
    (state: RootState) => state.client
  );

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("view");

  const [infoSale, setInfoSale] = useState<InfoVente>({
    nombre: -1,
    nomProduit: "Produit XYZ",
  });

  const auth = useSelector((state: RootState) => state.auth);

  const handleDelete = (id: number) => {
    dispatch(deleteClient(id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Filtrer les clients selon la recherche
  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleDetail = (client: Client) => {
    setSelectedClient({ ...client });
    setIsDialogOpen(true);
    setDialogMode("view");
  };

  const handleModif = (client: Client) => {
    // setSelectedClientId(-1)
    // setInfoSale({nombre: -1, nomProduit:"Produit XYZ"})
    setSelectedClient(client);
    setIsDialogOpen(true);
    setDialogMode("edit");
  };

  const convertUserToUtilisateur = (user: User): Utilisateur => {
    return {
      id: user.id,
      username: user.username,
      mail: user.mail,
      password: "", // Générer un mot de passe
      type: user.type, // Reprise directe
      date_creation: user.dateCreation, // Copier la date
    };
  };

  const handleAjout = () => {
    setSelectedClient({
      id: Date.now(),
      nom: "",
      prenom: "",
      email: "",
      idUtilisateur: convertUserToUtilisateur(auth.user),
      numeroPhone: "",
    });
    setIsDialogOpen(true);
    setDialogMode("add");
  };

  const onClose = () => {
    setIsDialogOpen(false);
  };

  const handleInfoSaleChange = (newInfoSale: InfoVente) => {
    setInfoSale(newInfoSale); // Synchronise l’état global
  };

  return (
    <div className="bg-gray-100 rounded-lg flex">
      <div className="bg-white rounded-lg w-3/5 p-3 shadow-md m-3 h-fit">
        <Header
          searchTerm={searchQuery}
          setSearchTerm={handleSearch}
          onAdd={handleAjout}
        />

        <TableClient
          clients={filteredClients}
          onDelete={handleDelete}
          onEdit={handleModif}
          onViewDetails={handleDetail}
        />

        {selectedClient && isDialogOpen && (
          <Dialog
            client={selectedClient}
            mode={dialogMode}
            onClose={onClose}
            infoSale={infoSale}
            onChangeInfoSale={handleInfoSaleChange}
          />
        )}
      </div>
      <div className="bg-white rounded-lg w-2/5 p-3 shadow-md m-3 h-fit">
        <TableProduits />
      </div>
    </div>
  );
};

export default ClientTable;
