export interface AvailableProduct {
  id: number; // ID du produit
  nom: string; // Nom du produit
  prix: number; // Prix du produit
  stock: number; // Stock du produit
  categorie: string; // Nom de la catégorie
}

interface Purchase {
  productName: string; // Nom du produit acheté
  date: string; // Date de l'achat (au format ISO)
  quantity: number; // Quantité achetée
  price: number; // Prix du produit au moment de l'achat
}

interface MostPurchasedProduct {
  productName: string; // Nom du produit le plus acheté
  totalQuantity: number; // Quantité totale achetée
}

export interface Customer {
  id: number; // ID du client
  firstName: string; // Prénom du client
  lastName: string; // Nom du client
  email: string; // Email du client
  phone: string; // Numéro de téléphone du client
  user: string; // Nom de l'utilisateur associé
  purchaseHistory: Purchase[]; // Historique des achats
  mostPurchasedProduct?: MostPurchasedProduct; // Produit le plus acheté
}

export interface DataCustomer {
  availableProduct: AvailableProduct[]; // Liste des produits disponibles
  customerList: Customer[]; // Liste des clients
}
