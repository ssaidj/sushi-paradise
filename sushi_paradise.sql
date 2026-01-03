-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 28 déc. 2025 à 16:31
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sushi_paradise`
--

-- --------------------------------------------------------

--
-- Structure de la table `boxes`
--

CREATE TABLE `boxes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pieces` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `boxes`
--

INSERT INTO `boxes` (`id`, `name`, `pieces`, `price`, `image`) VALUES
(1, 'Tasty Blend', 12, 12.50, 'tasty-blend'),
(2, 'Amateur Mix', 18, 15.90, 'amateur-mix'),
(3, 'Saumon Original', 11, 12.50, 'saumon-original'),
(4, 'Salmon Lovers', 18, 15.90, 'salmon-lovers'),
(5, 'Salmon Classic', 10, 15.90, 'salmon-classic'),
(6, 'Master Mix', 12, 15.90, 'master-mix'),
(7, 'Sunrise', 18, 15.90, 'sunrise'),
(8, 'Sando Box Chicken Katsu', 13, 15.90, 'sando-box-chicken-katsu'),
(9, 'Sando Box Salmon Aburi', 13, 15.90, 'sando-box-salmon-aburi'),
(10, 'Super Salmon', 24, 19.90, 'super-salmon'),
(11, 'California Dream', 24, 19.90, 'california-dream'),
(12, 'Gourmet Mix', 22, 24.50, 'gourmet-mix'),
(13, 'Fresh Mix', 22, 24.50, 'fresh-mix');

-- --------------------------------------------------------

--
-- Structure de la table `box_flavors`
--

CREATE TABLE `box_flavors` (
  `box_id` int(11) NOT NULL,
  `flavor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `box_flavors`
--

INSERT INTO `box_flavors` (`box_id`, `flavor_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(4, 4),
(5, 1),
(6, 1),
(6, 2),
(6, 5),
(7, 1),
(7, 2),
(7, 3),
(7, 5),
(8, 1),
(8, 2),
(8, 3),
(8, 6),
(9, 1),
(9, 2),
(9, 5),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(11, 1),
(11, 2),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(12, 1),
(12, 2),
(12, 4),
(12, 6),
(12, 8),
(12, 9),
(13, 1),
(13, 2),
(13, 3),
(13, 5),
(13, 8);

-- --------------------------------------------------------

--
-- Structure de la table `box_foods`
--

CREATE TABLE `box_foods` (
  `box_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `quantity` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `box_foods`
--

INSERT INTO `box_foods` (`box_id`, `food_id`, `quantity`) VALUES
(1, 1, 3.00),
(1, 2, 3.00),
(1, 3, 3.00),
(1, 4, 3.00),
(1, 5, 1.00),
(2, 1, 3.00),
(2, 5, 1.00),
(2, 6, 3.00),
(2, 7, 3.00),
(2, 8, 6.00),
(3, 1, 6.00),
(3, 2, 5.00),
(3, 5, 1.00),
(4, 1, 6.00),
(4, 2, 6.00),
(4, 5, 1.00),
(4, 7, 6.00),
(5, 2, 10.00),
(5, 5, 1.00),
(6, 1, 3.00),
(6, 2, 4.00),
(6, 5, 1.00),
(6, 9, 2.00),
(6, 10, 3.00),
(7, 1, 6.00),
(7, 5, 1.00),
(7, 6, 6.00),
(7, 11, 6.00),
(8, 1, 6.00),
(8, 5, 1.00),
(8, 6, 6.00),
(8, 11, 6.00),
(8, 12, 0.50),
(9, 1, 6.00),
(9, 5, 1.00),
(9, 11, 6.00),
(9, 13, 0.50),
(10, 1, 6.00),
(10, 5, 1.00),
(10, 6, 6.00),
(10, 7, 6.00),
(10, 14, 6.00),
(11, 1, 6.00),
(11, 5, 1.00),
(11, 11, 6.00),
(11, 15, 6.00),
(11, 16, 6.00),
(12, 5, 1.00),
(12, 17, 6.00),
(12, 18, 4.00),
(12, 19, 3.00),
(12, 20, 6.00),
(12, 21, 3.00),
(13, 4, 6.00),
(13, 5, 1.00),
(13, 6, 6.00),
(13, 22, 4.00),
(13, 23, 4.00),
(13, 24, 2.00);

-- --------------------------------------------------------

--
-- Structure de la table `flavors`
--

CREATE TABLE `flavors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `flavors`
--

INSERT INTO `flavors` (`id`, `name`) VALUES
(2, 'avocat'),
(3, 'cheese'),
(4, 'coriandre'),
(7, 'crevette'),
(1, 'saumon'),
(9, 'seriole lalandi'),
(8, 'spicy'),
(5, 'thon'),
(6, 'viande');

-- --------------------------------------------------------

--
-- Structure de la table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `foods`
--

INSERT INTO `foods` (`id`, `name`) VALUES
(16, 'California Chicken Katsu'),
(15, 'California Crevette'),
(20, 'California French Salmon'),
(19, 'California French Touch'),
(4, 'California Pacific'),
(1, 'California Saumon Avocat'),
(10, 'California Thon Avocat'),
(11, 'California Thon Cuit Avocat'),
(21, 'California Yellowtail Ponzu'),
(5, 'Edamame/Salade de chou'),
(8, 'Maki Cheese Avocat'),
(14, 'Maki Salmon'),
(6, 'Maki Salmon Roll'),
(12, 'Sando Chicken Katsu'),
(13, 'Sando Salmon Aburi'),
(18, 'Signature Dragon Roll'),
(22, 'Signature Rock\'n Roll'),
(3, 'Spring Avocat Cheese'),
(7, 'Spring Saumon Avocat'),
(17, 'Spring Tataki Saumon'),
(23, 'Sushi Salmon'),
(2, 'Sushi Saumon'),
(24, 'Sushi Saumon Tsukudani'),
(9, 'Sushi Thon');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(50) NOT NULL DEFAULT 'paid',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `created_at`) VALUES
(15, 20, 44.30, 'pending', '2025-12-27 02:47:41'),
(16, 20, 28.40, 'pending', '2025-12-27 02:53:23'),
(17, 20, 38.06, 'pending', '2025-12-28 15:39:20'),
(18, 20, 12.50, 'completed', '2025-12-28 15:54:45'),
(19, 17, 44.30, 'completed', '2025-12-28 16:19:26'),
(20, 17, 12.50, 'completed', '2025-12-28 16:19:59'),
(21, 17, 14.31, 'pending', '2025-12-28 16:21:56'),
(22, 17, 17.04, 'completed', '2025-12-28 16:23:48'),
(23, 20, 26.58, 'pending', '2025-12-28 16:30:50');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `box_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `box_id`, `quantity`, `unit_price`) VALUES
(31, 15, 2, 1, 15.90),
(32, 15, 3, 1, 12.50),
(33, 15, 4, 1, 15.90),
(34, 16, 3, 1, 12.50),
(35, 16, 4, 1, 15.90),
(36, 17, 1, 1, 12.50),
(37, 17, 3, 1, 11.25),
(38, 17, 6, 1, 14.31),
(39, 18, 3, 1, 12.50),
(40, 19, 3, 1, 12.50),
(41, 19, 4, 1, 15.90),
(42, 19, 8, 1, 15.90),
(43, 20, 1, 1, 12.50),
(44, 21, 2, 1, 14.31),
(45, 22, 4, 1, 9.54),
(46, 22, 3, 1, 7.50),
(47, 23, 4, 1, 9.54),
(48, 23, 3, 1, 7.50),
(49, 23, 8, 1, 9.54);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `api_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `api_token`) VALUES
(1, '', '', '', '$2y$10$iXxM4wCP/RuJA80Bder/.OyfkJ/8Y5TPre7ENjkr9uvnuH0sPgNum', '2025-12-04 21:56:36', NULL),
(6, 'John', 'Doe', 'john.doe@example.com', '$2y$10$RxnyjzFOr6GRjJdGnaxO8u.39O2bh77HdsHn2V0HU2UIZYrqr8cli', '2025-12-04 22:00:55', NULL),
(11, 'Jon', 'Doe', 'joh.doe@example.com', '$2y$10$cErTU8hyJl1u7xYLZv3CrugKdptjJAIRuX0UdKtYCxe5r3U9PbBUq', '2025-12-04 22:12:43', NULL),
(14, 'Jon', 'Dooe', 'jooonh.doe@example.com', '$2y$10$xhulTf1KRI9.4om2/Kz53e74BG55tCtSmoXvH3z3zUrhQlf12x.5i', '2025-12-04 22:15:45', NULL),
(15, 'Jon', 'Dooe', 'joobnh.doe@example.com', '$2y$10$3bWNqqmmsYl9w5JKLjXHxuDjIen4vwTJWIrnb.siDPZQLlOLDgMWe', '2025-12-04 22:17:28', NULL),
(17, 'Saidj', 'Sofiane', 'saidjsofiane@gmail.com', '$2y$10$0NxZiXZ7JfV48tHywm0MiOhPrY1T2AUq35lj6M.kXew4kExJyVZ5i', '2025-12-04 22:22:57', '5813e352f872246804053a111061cf6d4c5cf6aae80f21195802750adf1babdd'),
(20, 'Sofiane', 'Saidj', 'saidjsofiane93@gmail.com', '$2y$10$j1mq1nGG7N83YDeRJitSHOcwWwNrhUzn7R4PPagBQV.DalVXB96mq', '2025-12-07 18:34:32', 'fa9bfc8280be485d32cc3467ee151dd64bc5e72b1c401a6bb2368d9fa88312a3'),
(21, 'Compte', 'Admin', 'admin@gmail.com', '$2y$10$V5qWnO2hmorWf4yZm3JfBOAd4v6bXZ0yu2twHuwXIjYt0ymGfV73S', '2025-12-28 16:01:36', 'c10640c00d2a854b7444c68cb7fa9ae620ca8e3fbb95a04dfc9736c1b8ee8a6e');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `boxes`
--
ALTER TABLE `boxes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `box_flavors`
--
ALTER TABLE `box_flavors`
  ADD PRIMARY KEY (`box_id`,`flavor_id`),
  ADD KEY `flavor_id` (`flavor_id`);

--
-- Index pour la table `box_foods`
--
ALTER TABLE `box_foods`
  ADD PRIMARY KEY (`box_id`,`food_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Index pour la table `flavors`
--
ALTER TABLE `flavors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `box_id` (`box_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `boxes`
--
ALTER TABLE `boxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `flavors`
--
ALTER TABLE `flavors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `box_flavors`
--
ALTER TABLE `box_flavors`
  ADD CONSTRAINT `box_flavors_ibfk_1` FOREIGN KEY (`box_id`) REFERENCES `boxes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `box_flavors_ibfk_2` FOREIGN KEY (`flavor_id`) REFERENCES `flavors` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `box_foods`
--
ALTER TABLE `box_foods`
  ADD CONSTRAINT `box_foods_ibfk_1` FOREIGN KEY (`box_id`) REFERENCES `boxes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `box_foods_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`box_id`) REFERENCES `boxes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
