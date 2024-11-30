import { PurchaseHistory } from "./Purchase";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  user: string;
  purchaseHistory: PurchaseHistory[];
  mostPurchasedProduct?: { 
    productName: string;
    totalQuantity: number;
  };
}
