-- --------------------------------------------------------
-- Host:                         isofocus.es
-- Versión del servidor:         5.7.24-0ubuntu0.16.04.1 - (Ubuntu)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             9.5.0.5249
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando datos para la tabla isofocus.configs: ~4 rows (aproximadamente)
DELETE FROM `configs`;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;
INSERT INTO `configs` (`id`, `ivaDefaultReceived`, `ivaDefaultSent`, `totalItemsByTable`, `userId`) VALUES
	(1, 21, 0, 5, NULL),
	(2, 21, 0, 5, NULL),
	(15, 21, 0, 5, NULL),
	(19, 21, 0, 5, NULL);
/*!40000 ALTER TABLE `configs` ENABLE KEYS */;

-- Volcando datos para la tabla isofocus.invoices: ~8 rows (aproximadamente)
DELETE FROM `invoices`;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` (`id`, `cif`, `date`, `fisicalAddress`, `iva`, `nameCompany`, `description`, `notes`, `visualID`, `received`, `createdAt`, `updatedAt`, `deletedAt`, `userId`, `price`) VALUES
	(1, 'IE 3423023 BH', '2018-10-30 23:00:00', '42 ABBEYGATE STREET UPPER, GALWAY', 21, 'BOON AGENCY LIMITED', NULL, '', '2018000010', 0, '2018-12-09 14:39:57', '2018-12-09 14:39:57', NULL, NULL, 0),
	(2, 'IE 3423023 BH', '2018-11-29 23:00:00', '42 ABBEYGATE STREET UPPER, GALWAY', 21, 'BOON AGENCY LIMITED', NULL, '', '2018000011', 0, '2018-12-09 14:41:20', '2018-12-09 14:41:20', NULL, NULL, 0),
	(3, '48778305C', '2018-12-10 21:41:07', 'Caca', 21, 'Mierda', 'Puta', '', '1', 0, '2018-12-10 21:41:39', '2018-12-10 22:35:00', NULL, NULL, 0),
	(5, '48778305C', '2018-12-10 22:34:36', 'Caca', 21, 'Mierda', NULL, '', '2', 1, '2018-12-10 22:34:49', '2018-12-10 22:34:49', NULL, NULL, 0),
	(16, 'A28425270', '2018-11-28 23:00:00', 'CALLE CAMPEZO 16', 21, 'CENTROS COMERC.CARREFOUR S.A.', NULL, '', '2018FBFN02483910', 1, '2018-12-11 18:31:12', '2018-12-11 21:55:01', NULL, NULL, 0),
	(17, 'A28425270', '2018-11-13 23:00:00', 'CALLE CAMPEZO 16', 21, 'CENTROS COMERC.CARREFOUR S.A.', NULL, '', '2018FBFN02360258', 1, '2018-12-11 21:54:12', '2018-12-11 22:18:08', NULL, NULL, 0),
	(18, 'A28425270', '2018-11-05 23:00:00', 'CALLE CAMPEZO 16', 21, 'CENTROS COMERC.CARREFOUR S.A.', NULL, '', '2018FBFN02294648', 1, '2018-12-11 21:58:57', '2018-12-16 23:18:09', NULL, NULL, 0),
	(19, 'A28017895', '2018-11-02 23:00:00', 'Dom. Soc. Hermosilla, 112 28009 - Madrid', 21, 'EL CORTE INGLES S.A.', 'Portátil Huawei', '', '00208013742', 1, '2018-12-11 22:29:56', '2018-12-11 22:29:56', NULL, NULL, 0);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;

-- Volcando datos para la tabla isofocus.users: ~4 rows (aproximadamente)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `password`, `phone`, `address`, `photo`, `email`, `dni`, `root`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Miguel Moya Ortega', '$2b$10$A9uikX/OHqlX4.uOu2.V0e7QMWEGAWY3ZZXcoFT1SEk4z3Wjuw/X6', '646749570', 'calle rio algar 30 4ºE', NULL, 'miguel@isofocus.es', 'Alicante', 0, '2018-12-09 15:29:41', '2018-12-19 07:52:38', NULL),
	(2, 'Google', '$2b$10$A9uikX/OHqlX4.uOu2.V0e7QMWEGAWY3ZZXcoFT1SEk4z3Wjuw/X6', NULL, NULL, NULL, 'adsense@isofocus.es', '12345678X', 0, '2018-12-09 22:06:40', '2018-12-09 22:06:40', NULL),
	(3, 'Javier', '$2b$10$ZfoF6D5I/ow8XjFEOu1h5.YRr0nyUmk0x9YSYvR7o7oqWKN8GPRou', NULL, NULL, NULL, 'javier@isofocus.es', '48778305C', 0, '2018-12-10 21:40:27', '2018-12-10 21:40:27', NULL),
	(7, 'María Jesús', '$2b$10$O1HU.x7T6FBh5eU.1x7sQOkWo2/LzTxKYwgGwk/Wy8mGCF2XqLyE.', NULL, NULL, NULL, 'chusisky@gmail.com', '21473375T', 0, '2018-12-15 09:38:38', '2018-12-15 09:38:38', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
