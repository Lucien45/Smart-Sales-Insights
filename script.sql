-- Nettoyage des tables dans l'ordre inverse des dépendances
DELETE FROM ventes;
DELETE FROM produits;
DELETE FROM categories;
DELETE FROM clients;
DELETE FROM utilisateurs;

-- Insertion des utilisateurs
INSERT INTO utilisateurs (id, username, mail, password, type, date_creation) VALUES
(1, 'admin', 'admin@test.com', 'password123', 'superuser', '2024-01-01'),
(2, 'user1', 'user1@test.com', 'password123', 'user', '2024-01-02'),
(3, 'user2', 'user2@test.com', 'password123', 'user', '2024-01-03');

-- Insertion des catégories
INSERT INTO categories (id, nom) VALUES
(1, 'Électronique'),
(2, 'Vêtements'),
(3, 'Alimentation'),
(4, 'Livres');

-- Insertion des clients
INSERT INTO clients (id, nom, prenom, "idUtilisateurId") VALUES
(1, 'Dupont', 'Jean', 2),
(2, 'Martin', 'Sophie', 2),
(3, 'Dubois', 'Pierre', 3),
(4, 'Laurent', 'Marie', 3);

-- Insertion des produits
INSERT INTO produits (id, nom, prix, stock, "idCategorie") VALUES
-- Électronique (catégorie 1)
(1, 'Smartphone', 699.99, 50, 1),
(2, 'Tablette', 299.99, 30, 1),
(3, 'Écouteurs', 89.99, 100, 1),

-- Vêtements (catégorie 2)
(4, 'T-shirt', 19.99, 200, 2),
(5, 'Jean', 49.99, 150, 2),
(6, 'Veste', 79.99, 100, 2),

-- Alimentation (catégorie 3)
(7, 'Café', 9.99, 300, 3),
(8, 'Chocolat', 4.99, 400, 3),
(9, 'Thé', 7.99, 250, 3),

-- Livres (catégorie 4)
(10, 'Roman', 24.99, 80, 4),
(11, 'BD', 14.99, 120, 4),
(12, 'Magazine', 6.99, 150, 4);

-- Insertion des ventes
-- Pour le client 1 (Jean Dupont)
INSERT INTO ventes (id, nombre, date_achat, "idClientId", "idProduitId") VALUES
(1, 2, '2024-01-05', 1, 1),
(2, 1, '2024-02-10', 1, 1),
(3, 3, '2024-03-15', 1, 2),
(4, 2, '2024-01-20', 1, 3),
(5, 4, '2024-01-08', 1, 4),
(6, 2, '2024-02-12', 1, 5),
(7, 1, '2024-03-18', 1, 6);

-- Pour le client 2 (Sophie Martin)
INSERT INTO ventes (id, nombre, date_achat, "idClientId", "idProduitId") VALUES
(8, 5, '2024-01-03', 2, 7),
(9, 3, '2024-02-07', 2, 8),
(10, 4, '2024-03-12', 2, 9),
(11, 2, '2024-01-15', 2, 10),
(12, 3, '2024-02-20', 2, 11),
(13, 1, '2024-03-25', 2, 12);

-- Pour le client 3 (Pierre Dubois)
INSERT INTO ventes (id, nombre, date_achat, "idClientId", "idProduitId") VALUES
(14, 1, '2024-01-02', 3, 1),
(15, 2, '2024-02-05', 3, 2),
(16, 3, '2024-03-10', 3, 3),
(17, 4, '2024-01-12', 3, 4),
(18, 2, '2024-02-15', 3, 5),
(19, 1, '2024-03-20', 3, 6);

-- Pour le client 4 (Marie Laurent)
INSERT INTO ventes (id, nombre, date_achat, "idClientId", "idProduitId") VALUES
(20, 6, '2024-01-04', 4, 7),
(21, 4, '2024-02-08', 4, 8),
(22, 5, '2024-03-14', 4, 9),
(23, 2, '2024-01-18', 4, 10),
(24, 3, '2024-02-22', 4, 11),
(25, 2, '2024-03-28', 4, 12);
