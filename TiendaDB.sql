-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para pwdata
CREATE DATABASE IF NOT EXISTS `pwdata` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `pwdata`;

-- Volcando estructura para tabla pwdata.articulos
CREATE TABLE IF NOT EXISTS `articulos` (
  `claveArticulo` int(11) NOT NULL,
  `descripcion` varchar(150) DEFAULT '',
  `existencia` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  PRIMARY KEY (`claveArticulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla pwdata.articulos: ~3 rows (aproximadamente)
INSERT INTO `articulos` (`claveArticulo`, `descripcion`, `existencia`, `precio`) VALUES
	(1, 'Coca Cola', 12, 20),
	(2, 'Buffalo', 25, 15),
	(3, 'Takis', 4, 23);

-- Volcando estructura para tabla pwdata.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT '',
  `apellido` varchar(150) DEFAULT '',
  `direccion` varchar(150) DEFAULT '',
  `telefono` varchar(15) DEFAULT '',
  `rfc` varchar(15) NOT NULL DEFAULT '',
  `curp` varchar(18) NOT NULL DEFAULT '',
  `cp` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla pwdata.clientes: ~3 rows (aproximadamente)
INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `direccion`, `telefono`, `rfc`, `curp`, `cp`) VALUES
	(1, 'Luis Carlos', 'Lie ', 'Lopez Mateos', '1234567890', 'ABCDE1234567891', 'ABCDE1234567891231', 80921),
	(2, 'Jesus Alfredo', 'Iniguez', 'Quintas', '1234567891', 'ABCDE1234567892', 'ABCDE1234567891232', 80922),
	(3, 'Joel', 'Olvera', 'Huizaches', '1234567892', 'ABCDE1234567893', 'ABCDE1234567891233', 80923);

-- Volcando estructura para tabla pwdata.vendedores
CREATE TABLE IF NOT EXISTS `vendedores` (
  `idVendedor` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT '',
  `apellido` varchar(150) DEFAULT '',
  `departamentoTienda` varchar(150) DEFAULT '',
  PRIMARY KEY (`idVendedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla pwdata.vendedores: ~3 rows (aproximadamente)
INSERT INTO `vendedores` (`idVendedor`, `nombre`, `apellido`, `departamentoTienda`) VALUES
	(1, 'Elizabeht', 'Zavala', 'Ventas'),
	(2, 'Diana', 'Moreno', 'Ventas'),
	(3, 'Johana', 'Aispuro', 'Ventas');

-- Volcando estructura para tabla pwdata.ventas
CREATE TABLE IF NOT EXISTS `ventas` (
  `claveArticulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `idVendedor` int(11) NOT NULL DEFAULT 0,
  KEY `FK_ventas_articulos` (`claveArticulo`),
  KEY `FK_ventas_vendedores` (`idVendedor`),
  CONSTRAINT `FK_ventas_articulos` FOREIGN KEY (`claveArticulo`) REFERENCES `articulos` (`claveArticulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ventas_vendedores` FOREIGN KEY (`idVendedor`) REFERENCES `vendedores` (`idVendedor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla pwdata.ventas: ~3 rows (aproximadamente)
INSERT INTO `ventas` (`claveArticulo`, `cantidad`, `precio`, `fecha`, `idVendedor`) VALUES
	(1, 2, 40, '2024-06-01', 1),
	(2, 3, 45, '2024-12-25', 2),
	(1, 3, 60, '2024-06-01', 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
