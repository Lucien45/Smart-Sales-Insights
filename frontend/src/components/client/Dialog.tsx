import React, { useState } from "react";
import { Client } from "../../types/Client";
import HistoriqueDAchat from "./HistoriqueDAchat";
import { useDispatch, useSelector } from "react-redux";
import { addClient, updateClient } from "../../redux/clientSlice";
import EditForm from "./EditForm";
import { InfoVente } from "../../types/InfoVente";
import { RootState } from "../../redux/store";
import { format } from "date-fns";
import { addVente } from "../../redux/venteSlice";
import AddForm from "./AddForm";

interface DialogProps {
  client: Client;
  mode: "edit" | "add" | "view";
  onClose: () => void;
  infoSale: InfoVente;
  onChangeInfoSale: (newInfoSale: InfoVente) => void;
}
const Dialog: React.FC<DialogProps> = ({
  client,
  mode,
  onClose,
  infoSale,
  onChangeInfoSale,
}) => {
  const products = useSelector((state: RootState) => state.produit.produits);

  const [updatedCustomer, setUpdatedCustomer] = useState<Client>(client);

  const [curInfoSale, setCurInfoSale] = useState<InfoVente>(infoSale);

  const dispatch = useDispatch();

  const handleChangeAdd = (
    updatedCustomer: Client,
    updatedInfoSale: InfoVente
  ) => {
    setUpdatedCustomer(updatedCustomer);
    setCurInfoSale(updatedInfoSale);
  };

  // Fonction pour convetir un nomProduit en Produit
  const getProductByName = (productName: string) => {
    const product = products.find(
      (p) => p.nom.toLocaleLowerCase() === productName.toLocaleLowerCase()
    );
    return product
      ? product
      : {
          id: -1,
          nom: "Tsita",
          prix: "Tsita",
          stock: -1,
          idCategorie: { id: -1, nom: "Tsita" },
        };
  };

  // Fonction pour convertir un curInfoSale en un Sale
  const convertInfoSaleToSale = (curInfoSale: InfoVente) => {
    const now = new Date();
    const dateAchat = format(now, "dd/MM/yyyy HH:mm:ss");
    return {
      id: Date.now(),
      idClient: {
        id: client.id,
        nom: client.nom,
        prenom: client.prenom,
        numeroPhone: client.numeroPhone,
        email: client.email,
        idUtilisateur: client.idUtilisateur,
      },
      idProduit: getProductByName(curInfoSale.nomProduit),
      nombre: curInfoSale.nombre,
      date_achat: dateAchat,
    };
  };

  const handleAdd = () => {
    dispatch(addClient(updatedCustomer));
    dispatch(addVente(convertInfoSaleToSale(curInfoSale)));
    onClose;
  };

  const handleEditSave = () => {
    dispatch(updateClient(updatedCustomer));
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="space-y-4">
          {mode === "view" && (
            <div>
              <div className="flex">
                <div className="mr-3">
                  <h4>Détails du client</h4>
                  <p>
                    <strong>Nom : </strong>
                    {client.nom}
                  </p>
                  <p>
                    <strong>Prénom : </strong>
                    {client.prenom}
                  </p>
                  <p>
                    <strong>Email : </strong>
                    {client.email}
                  </p>
                  <p>
                    <strong>Téléphone : </strong>
                    {client.numeroPhone}
                  </p>
                </div>
                <div className="ml-3">
                  <h4>Historique des achats</h4>
                  <HistoriqueDAchat client={client} />
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 mt-3"
              >
                Fermer
              </button>
            </div>
          )}

          {mode === "edit" && (
            <EditForm
              customer={client}
              handleSave={handleEditSave}
              onChange={setUpdatedCustomer}
              onClose={onClose}
            />
          )}

          {mode === "add" && (
            <AddForm
              customer={client}
              handleSave={handleAdd}
              onChange={(updatedCustomer, updatedInfoSale) => {
                handleChangeAdd(updatedCustomer, updatedInfoSale);
                onChangeInfoSale(updatedInfoSale);
              }}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
