import { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import CustomerFormEdit from "./CustomerFormEdit";
import CustomerFormAdd from "./CustomerFormAdd";
import { Customer } from "../../types/Customer";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, updateCustomer } from "../../redux/customerSlice";
import { addSales } from "../../redux/saleSlice";
import { RootState } from "../../redux/store";
import { format } from "date-fns";

interface CustomerDialogProps {
  customer: Customer;
  mode: "add" | "edit" | "view";
  onClose: () => void;
  infoSale: InfoSale;
  onChangeInfoSale: (newInfoSale: InfoSale) => void;
}

export interface InfoSale {
  nomProduit: string;
  nombre: number;
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  customer,
  mode,
  onClose,
  infoSale,
  onChangeInfoSale,
}) => {
  const products = useSelector((state: RootState) => state.products);

  const [updatedCustomer, setUpdatedCustomer] = useState<Customer>(customer);

  const [curInfoSale, setCurInfoSale] = useState<InfoSale>(infoSale);

  const dispatch = useDispatch();

  const handleChangeAdd = (
    updatedCustomer: Customer,
    updatedInfoSale: InfoSale
  ) => {
    setUpdatedCustomer(updatedCustomer);
    setCurInfoSale(updatedInfoSale);
  };

  console.log("curInfoSale : ", curInfoSale);

  // Fonction pour convetir un nomProduit en idProduit
  const getProductIdByName = (productName: string) => {
    const product = products.find(
      (p) => p.nom.toLocaleLowerCase() === productName.toLocaleLowerCase()
    );
    return product ? product.id : 1010;
  };

  // Fonction pour convertir un curInfoSale en un Sale
  const convertInfoSaleToSale = (curInfoSale: InfoSale) => {
    const now = new Date();
    const dateAchat = format(now, "dd/MM/yyyy HH:mm:ss");
    return {
      id: Date.now(),
      idClient: customer.id,
      idProduit: getProductIdByName(curInfoSale.nomProduit),
      nombre: curInfoSale.nombre,
      dateAchat: dateAchat,
    };
  };

  const handleAdd = () => {
    dispatch(addCustomer(updatedCustomer));
    dispatch(addSales(convertInfoSaleToSale(curInfoSale)));
    onClose();
  };

  const handleEdit = () => {
    dispatch(updateCustomer(updatedCustomer));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="space-y-4">
          {mode === "view" && (
            <CustomerInfo customer={customer} onClose={onClose} />
          )}
          {mode === "edit" && (
            <CustomerFormEdit
              customer={customer}
              handleSave={handleEdit}
              onChange={setUpdatedCustomer}
              onClose={onClose}
            />
          )}
          {mode === "add" && (
            <CustomerFormAdd
              customer={customer}
              handleSave={handleAdd}
              onChange={(updateCustomer, updatedInfoSale) => {
                handleChangeAdd(updateCustomer, updatedInfoSale);
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

export default CustomerDialog;
