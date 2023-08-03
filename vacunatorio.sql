-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2023 a las 21:29:48
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vacunatorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centrovacunacion`
--

CREATE TABLE `centrovacunacion` (
  `idCentro` int(11) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centrovacunacion`
--

INSERT INTO `centrovacunacion` (`idCentro`, `idLocalidad`, `direccion`, `telefono`) VALUES
(1, 1, ' Calle Florida 123', '+54 11 1234-5678'),
(2, 1, 'Avenida Corrientes 456', '+54 11 2345-6789'),
(3, 2, 'Calle Independencia 789', '+54 351 5678-9012'),
(4, 2, 'Avenida Colón 234', '+54 351 9012-3456'),
(5, 3, 'Calle Pellegrini 567', '+54 341 6789-0123'),
(6, 3, 'Avenida Francia 901', '+54 341 0123-4567'),
(7, 4, 'Avenida Las Heras 123', '+54 261 8901-2345'),
(8, 4, 'Calle San Martín 789', '+54 261 2345-6789'),
(9, 5, 'Avenida Sarmiento 567', '+54 381 5678-9012'),
(10, 5, 'Calle 25 de Mayo 901', '+54 381 9012-3456'),
(11, 6, 'Calle 7 789', '+54 221 6789-0123'),
(12, 6, 'Avenida 13 234', '+54 221 0123-4567'),
(13, 7, 'Calle Balcarce 567', '+54 387 6789-0123'),
(14, 7, 'Avenida San Martín 901', '+54 387 0123-4567'),
(15, 8, 'Calle San Martín 789', '+54 342 8901-2345'),
(16, 8, 'Avenida Freyre 123', '+54 342 2345-6789'),
(17, 9, 'Calle San Martín 567', '+54 223 9012-3456'),
(18, 9, 'Avenida Colón 901', '+54 223 5678-9012'),
(19, 10, 'Calle Mitre 789', '+54 264 8901-2345'),
(20, 10, 'Avenida España 234', '+54 264 2345-6789'),
(21, 11, 'Calle 9 de Julio 567', '+54 362 5678-9012'),
(22, 11, 'Avenida Sarmiento 901', '+54 362 9012-3456'),
(23, 12, 'Calle Libertad 789', '+54 385 6789-0123'),
(24, 12, 'Avenida Belgrano 123', '+54 385 0123-4567'),
(25, 13, 'Calle Junín 567', '+54 379 9012-3456'),
(26, 13, 'Avenida 3 de Abril 901', '+54 379 5678-9012'),
(27, 14, 'Calle O\'Higgins 789', '+54 291 6789-0123'),
(28, 14, 'Avenida Alem 234', '+54 291 0123-4567'),
(29, 15, 'Calle Belgrano 567', '+54 291 0123-4567'),
(30, 15, 'Avenida 19 de Abril 901', '+54 388 9012-3456'),
(31, 16, 'Calle San Martín 789', '+54 376 6789-0123'),
(32, 16, 'Avenida Roque Pérez 123', '+54 376 0123-4567'),
(33, 17, 'Calle Urquiza 567', '+54 343 5678-9012'),
(34, 17, 'Avenida Ramírez 901', '+54 343 9012-3456'),
(35, 18, 'Calle España 789', '+54 370 6789-0123'),
(36, 18, 'Avenida 25 de Mayo 234', '+54 370 0123-4567'),
(37, 19, 'Calle Roca 567', '+54 299 5678-9012'),
(38, 19, 'Avenida Argentina 901', '+54 299 9012-3456'),
(39, 20, 'Calle Pringles 789', '+54 266 6789-0123'),
(40, 20, 'Avenida Illia 123', '+54 266 0123-4567'),
(41, 21, 'Calle San Nicolás 567', '+54 380 5678-9012'),
(42, 21, 'Avenida San Martín 901', '+54 380 9012-3456'),
(43, 22, 'Avenida San Martín 234', '+54 2966 6789-0123'),
(44, 22, 'Calle Ilia 789', '+54 2966 0123-4567'),
(45, 23, 'Calle Rivadavia 567', '+54 383 5678-9012'),
(46, 23, 'Avenida General Paz 901', '+54 383 9012-3456'),
(47, 24, 'Calle Mitre 789', '+54 2920 6789-0123'),
(48, 24, 'Avenida Costanera 123', '+54 2920 0123-4567'),
(49, 25, 'Calle San Martín 567', '+54 280 5678-9012'),
(50, 25, 'Avenida 25 de Mayo 901', '+54 280 9012-3456'),
(51, 26, 'Calle San Martín 789', '+54 2901 6789-0123'),
(52, 26, 'Avenida Maipú 234', '+54 2901 0123-4567'),
(53, 27, 'Calle San Martín 567', '+54 2954 5678-9012'),
(54, 27, 'Avenida 9 de Julio 901', '+54 2954 9012-3456'),
(55, 28, 'Calle Moreno 789', '+54 2944 6789-0123'),
(56, 28, 'Avenida Bustillo 123', '+54 2944 0123-4567'),
(57, 29, ' Calle República 567', '+54 11 4231-8765'),
(58, 29, 'Avenida Belgrano 901', '+54 11 3211-6544'),
(59, 30, 'Calle San Martín 789', '+54 11 9877-7899'),
(60, 30, 'Avenida 9 de Julio 234', '+54 11 7411-2588'),
(121, 33, 'Poeta Aguero 123', '2664232323'),
(122, 52, '9 de Julio y Saavedra', '03704429200'),
(123, 55, 'Dorrego 365', '388145645'),
(124, 58, 'Av. Blanco Vega 463.', '03791234567');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centrovacunacionstock`
--

CREATE TABLE `centrovacunacionstock` (
  `id` int(11) NOT NULL,
  `idCentro` int(11) NOT NULL,
  `idSublote` int(11) NOT NULL,
  `cantVacunas` int(11) NOT NULL,
  `fechaRecepcion` date DEFAULT NULL,
  `estado` enum('enViaje','enStock','sinStock','descartado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centrovacunacionstock`
--

INSERT INTO `centrovacunacionstock` (`id`, `idCentro`, `idSublote`, `cantVacunas`, `fechaRecepcion`, `estado`) VALUES
(1, 1, 21, 0, '2023-07-19', 'descartado'),
(2, 1, 20, 0, '2023-07-20', 'descartado'),
(3, 1, 20, 0, '2023-07-19', 'descartado'),
(4, 1, 20, 0, '2023-07-28', 'descartado'),
(5, 1, 14, 200, '2023-07-22', 'enStock'),
(6, 1, 20, 0, '2023-07-25', 'descartado'),
(7, 1, 21, 0, '2023-07-22', 'descartado'),
(8, 39, 22, 0, '2023-07-23', 'sinStock'),
(9, 4, 23, 0, '2023-07-27', 'descartado'),
(10, 1, 21, 0, '2023-07-27', 'descartado'),
(11, 1, 20, 0, '2023-07-28', 'descartado'),
(12, 2, 20, 0, '2023-07-20', 'descartado'),
(13, 17, 20, 0, '2023-07-23', 'sinStock'),
(14, 58, 20, 0, '2023-07-22', 'descartado'),
(15, 40, 24, 0, '2023-07-20', 'descartado'),
(16, 15, 25, 1232, '2023-07-21', 'enStock'),
(17, 56, 24, 0, '2023-07-20', 'descartado'),
(18, 4, 23, 0, '2023-07-22', 'descartado'),
(19, 1, 27, 0, '2023-07-22', 'descartado'),
(20, 54, 28, 0, '2023-07-22', 'descartado'),
(21, 17, 14, 0, '2023-07-23', 'sinStock'),
(22, 40, 22, 0, '2023-07-23', 'sinStock'),
(23, 39, 22, 0, '2023-07-23', 'sinStock'),
(24, 53, 28, 0, '2023-07-23', 'descartado'),
(25, 41, 29, 0, '2023-07-23', 'descartado'),
(26, 42, 29, 0, '2023-07-23', 'descartado'),
(27, 51, 30, 2499, '2023-07-23', 'enStock'),
(28, 52, 30, 0, '2023-07-23', 'descartado'),
(29, 60, 14, 499, '2023-07-24', 'enStock'),
(30, 54, 28, 0, '2023-07-24', 'descartado'),
(31, 37, 32, 0, '2023-07-25', 'descartado'),
(32, 38, 32, 0, '2023-07-25', 'descartado'),
(33, 35, 33, 0, '2023-07-25', 'descartado'),
(34, 36, 33, 0, '2023-07-25', 'descartado'),
(35, 59, 14, 1000, '2023-07-29', 'enStock'),
(36, 40, 22, 4999, '2023-07-26', 'enStock'),
(37, 23, 34, 0, '2023-07-26', 'descartado'),
(38, 32, 35, 4999, '2023-07-26', 'enStock'),
(39, 49, 37, 0, '2023-07-27', 'descartado'),
(40, 17, 38, 1500, '2023-07-27', 'enStock'),
(41, 29, 8, 0, '2023-07-27', 'descartado'),
(42, 16, 25, 5000, '2023-07-27', 'enStock'),
(43, 16, 25, 5000, '2023-07-27', 'enStock'),
(44, 39, 22, 10000, '2023-07-27', 'enStock'),
(45, 22, 39, 5999, '2023-07-27', 'enStock'),
(46, 121, 22, 4998, '2023-07-28', 'enStock'),
(47, 4, 41, 2500, '2023-07-28', 'enStock'),
(48, 123, 49, 4999, '2023-07-28', 'enStock'),
(49, 32, 35, 5000, '2023-07-29', 'enStock'),
(50, 52, 55, 20000, '2023-07-29', 'enStock'),
(51, 36, 57, 10000, '2023-07-30', 'enStock'),
(52, 124, 58, 0, '2023-08-01', 'sinStock'),
(53, 26, 58, 49999, '2023-08-01', 'enStock'),
(54, 25, 58, 0, '2023-08-01', 'descartado'),
(55, 26, 58, 0, '2023-08-01', 'sinStock'),
(56, 124, 58, 49999, '2023-08-01', 'enStock'),
(57, 14, 59, 0, '2023-08-03', 'descartado'),
(58, 45, 60, 14999, '2023-08-03', 'enStock');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compralote`
--

CREATE TABLE `compralote` (
  `idCompra` int(11) NOT NULL,
  `idLote` int(11) NOT NULL,
  `fechaCompra` date NOT NULL,
  `cantVacunas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compralote`
--

INSERT INTO `compralote` (`idCompra`, `idLote`, `fechaCompra`, `cantVacunas`) VALUES
(1, 3, '2023-04-01', 100),
(2, 4, '2023-05-15', 2500),
(3, 5, '2023-04-08', 10000),
(4, 6, '2023-03-01', 5000),
(5, 7, '2023-07-17', 1000),
(6, 8, '2023-07-17', 1000),
(7, 9, '2023-07-17', 1500),
(8, 10, '2023-07-17', 10000),
(9, 11, '2023-07-17', 5000),
(10, 12, '2023-07-02', 5000),
(11, 13, '2023-07-17', 5000),
(12, 14, '2023-07-18', 5000),
(13, 15, '2023-07-18', 5000),
(14, 16, '2023-07-18', 10000),
(15, 17, '2023-07-18', 10000),
(16, 27, '2023-07-18', 20000),
(17, 28, '2023-07-18', 10000),
(18, 29, '2023-07-19', 20000),
(19, 30, '2023-07-19', 50000),
(20, 31, '2023-07-19', 50000),
(21, 32, '2023-07-19', 25000),
(22, 33, '2023-07-20', 50000),
(23, 34, '2023-07-20', 10000),
(24, 35, '2023-07-21', 50000),
(25, 36, '2023-07-22', 50000),
(26, 37, '2023-07-22', 10000),
(27, 38, '2023-07-24', 10000),
(28, 39, '2023-07-24', 15000),
(29, 40, '2023-07-25', 15000),
(30, 41, '2023-07-25', 15000),
(31, 42, '2023-07-26', 50000),
(32, 43, '2023-07-26', 5000),
(33, 44, '2023-07-27', 15000),
(34, 45, '2023-07-27', 50000),
(35, 46, '2023-07-27', 30000),
(36, 47, '2023-07-29', 15000),
(37, 48, '2023-07-29', 50000),
(38, 49, '2023-07-29', 15000),
(39, 50, '2023-07-29', 15000),
(40, 51, '2023-07-30', 50000),
(41, 52, '2023-08-01', 500000),
(42, 53, '2023-08-03', 50000),
(43, 54, '2023-08-03', 50000),
(44, 55, '2023-08-03', 500000),
(45, 56, '2023-08-03', 50000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depoprovinciastock`
--

CREATE TABLE `depoprovinciastock` (
  `id` int(11) NOT NULL,
  `idDepoProv` int(11) NOT NULL,
  `idLote` int(11) NOT NULL,
  `cantVacunas` int(11) NOT NULL,
  `fechaRecepcion` date DEFAULT NULL,
  `estado` enum('enViaje','enStock','sinStock','descartado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `depoprovinciastock`
--

INSERT INTO `depoprovinciastock` (`id`, `idDepoProv`, `idLote`, `cantVacunas`, `fechaRecepcion`, `estado`) VALUES
(1, 9, 3, 5000, '2023-07-19', 'enStock'),
(2, 9, 5, 6000, '2023-07-19', 'enStock'),
(3, 12, 5, 3000, '2023-07-18', 'enStock'),
(4, 12, 5, 3000, '2023-07-19', 'enStock'),
(5, 17, 4, 0, NULL, 'descartado'),
(6, 17, 5, 200, NULL, 'enViaje'),
(7, 10, 5, 100, NULL, 'enViaje'),
(8, 11, 4, 0, '2023-07-21', 'descartado'),
(9, 24, 5, 0, '2023-07-19', 'sinStock'),
(10, 13, 3, 30, NULL, 'enViaje'),
(11, 9, 4, 0, '2023-07-21', 'descartado'),
(12, 10, 3, 50, NULL, 'enViaje'),
(13, 15, 4, 0, '2023-07-22', 'descartado'),
(14, 1, 6, 0, '2023-07-20', 'sinStock'),
(15, 24, 16, 0, '2023-07-24', 'enStock'),
(16, 14, 6, 100, NULL, 'enViaje'),
(17, 11, 16, 0, '2023-07-24', 'enStock'),
(20, 1, 29, 0, '2023-07-19', 'descartado'),
(21, 1, 29, 0, '2023-07-19', 'descartado'),
(22, 16, 30, 5000, '2023-07-19', 'enStock'),
(23, 2, 33, 0, '2023-07-19', 'descartado'),
(24, 16, 34, 0, '2023-07-20', 'descartado'),
(25, 3, 35, 1111, '2023-07-21', 'enStock'),
(26, 20, 36, 0, '2023-07-21', 'descartado'),
(27, 1, 37, 0, '2023-07-22', 'descartado'),
(28, 23, 4, 0, '2023-07-22', 'descartado'),
(29, 17, 38, 0, '2023-07-23', 'descartado'),
(30, 22, 39, 0, '2023-07-23', 'sinStock'),
(31, 13, 40, 0, NULL, 'descartado'),
(32, 15, 40, 0, '2023-07-25', 'descartado'),
(33, 14, 41, 0, '2023-07-25', 'descartado'),
(34, 9, 43, 0, '2023-07-26', 'descartado'),
(35, 12, 42, 5000, '2023-07-26', 'enStock'),
(36, 7, 35, 10000, NULL, 'enViaje'),
(37, 21, 45, 0, '2023-07-27', 'descartado'),
(38, 1, 11, 1000, '2023-07-27', 'enStock'),
(39, 8, 46, 4000, '2023-07-27', 'enStock'),
(40, 16, 46, 1000, '2023-07-28', 'enStock'),
(41, 26, 47, 2500, '2023-07-28', 'enStock'),
(47, 13, 42, 1000, '2023-07-28', 'enStock'),
(48, 9, 42, 9000, '2023-07-28', 'enStock'),
(49, 28, 48, 20000, '2023-07-28', 'enStock'),
(52, 20, 32, 5000, NULL, 'enViaje'),
(53, 20, 48, 2500, NULL, 'enViaje'),
(54, 22, 50, 40000, '2023-07-29', 'enStock'),
(55, 22, 50, 0, '2023-07-29', 'sinStock'),
(56, 20, 51, 30000, '2023-07-30', 'enStock'),
(57, 14, 51, 5000, '2023-07-30', 'enStock'),
(58, 29, 52, 0, '2023-08-01', 'sinStock'),
(59, 6, 53, 0, '2023-08-03', 'descartado'),
(60, 19, 52, 5000, '2023-08-03', 'enStock');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositonacion`
--

CREATE TABLE `depositonacion` (
  `idDepoNacion` int(11) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `depositonacion`
--

INSERT INTO `depositonacion` (`idDepoNacion`, `idLocalidad`, `direccion`, `telefono`) VALUES
(1, 1, 'Calle San Martín 123', '+54 9 11 1234 5678'),
(2, 29, 'Avenida Libertad 456', '+54 9 351 9876543'),
(3, 1, 'Calle Belgrano 789', '+54 9 341 6543210'),
(4, 6, 'Avenida Mitre 321', '+54 9 261 8765432'),
(5, 6, 'Calle Rivadavia 654', '+54 9 387 2345678'),
(6, 54, 'Av. Pueyredon 123', '11123123'),
(7, 57, 'Av. Hipólito Yrigoyen 3863', '11232111');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositoprovincia`
--

CREATE TABLE `depositoprovincia` (
  `idDepoProv` int(11) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `depositoprovincia`
--

INSERT INTO `depositoprovincia` (`idDepoProv`, `idLocalidad`, `direccion`, `telefono`) VALUES
(1, 1, 'Calle Corrientes 1234', '+54 11 5678-9012'),
(2, 2, 'Avenida Colón 567', '+54 351 2345-6789'),
(3, 3, 'Calle Oroño 789', '+54 341 9876-5432'),
(4, 4, 'Calle San Martín 456', '+54 261 8765-4321'),
(5, 5, 'Avenida Independencia 321', '+54 381 6543-2109'),
(6, 7, 'Calle Balcarce 234', '+54 387 2109-8765'),
(7, 10, 'Avenida España 678', '+54 264 2109-8765'),
(8, 11, 'Calle 25 de Mayo 432', '+54 362 9876-5432'),
(9, 12, 'Avenida Belgrano 789', '+54 385 6543-2109'),
(10, 13, 'Calle Junín 543', '+54 379 4321-0987'),
(11, 15, 'Avenida Alem 234', '+54 388 5432-1098'),
(12, 16, 'Avenida Uruguay 901', '+54 376 3210-9876'),
(13, 17, 'Calle España 567', '+54 343 2109-8765'),
(14, 18, 'Avenida 25 de Mayo 432', '+54 370 9876-5432'),
(15, 19, 'Calle Roca 789', '+54 299 6543-2109'),
(16, 20, 'Avenida Illia 543', '+54 266 4321-0987'),
(17, 21, 'Calle San Nicolás 234', '+54 380 2109-8765'),
(18, 22, 'Avenida Kirchner 678', '+54 2966 5432-1098'),
(19, 23, 'Calle Rivadavia 901', '+54 383 3210-9876'),
(20, 24, 'Avenida Roca 567', '+54 2920 2109-8765'),
(21, 25, 'Calle 25 de Mayo 432', '+54 280 9876-5432'),
(22, 26, 'Avenida Maipú 789', '+54 2901 6543-2109'),
(23, 27, 'Calle San Martín 543', '+54 2954 4321-0987'),
(24, 29, 'Avenida Alem 234', '+54 291 2109-8765'),
(25, 30, 'Calle Luro 901', '+54 223 5432-1098'),
(26, 51, 'Av. San Martin 544', '3541234545'),
(27, 53, 'Av. 9 de Julio 111', '123456654'),
(28, 55, 'Av. Belrano 222', '388154322469'),
(29, 58, 'Av. Santa Fe esq. Corrientes', '3791499187');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermero`
--

CREATE TABLE `enfermero` (
  `idEnfermero` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `enfermero`
--

INSERT INTO `enfermero` (`idEnfermero`, `nombre`, `idCentro`) VALUES
(1, 'Sofia Lopez', 1),
(2, 'Santiago Rodriguez', 1),
(3, 'Valentina Martinez', 2),
(4, 'Mateo Gonzalez', 2),
(5, 'Lucas Torres', 3),
(6, 'Isabella Fernandez', 3),
(7, 'Mia Perez', 4),
(8, 'Daniel Ramirez', 4),
(9, 'Emma Garcia', 5),
(10, 'Sebastian Sanchez', 5),
(11, 'Victoria Lopez', 6),
(12, 'Gabriel Martinez', 6),
(13, 'Camila Gonzalez', 7),
(14, 'Benjamín Fernandez', 7),
(15, 'Martina Perez', 8),
(16, 'Matias Rodriguez', 8),
(17, 'Nicolás Herrera', 9),
(18, 'Renata Silva', 9),
(19, 'Alejandro González', 10),
(20, 'Emilia Suarez', 10),
(21, 'Agustín Mendoza', 11),
(22, 'Catalina Rojas', 11),
(23, 'Facundo Castro', 12),
(24, 'Isidora Herrera', 12),
(25, 'Juan Pablo Medina', 13),
(26, 'Luciana Molina', 13),
(27, 'Maximiliano Castro', 14),
(28, 'Antonella Costa', 14),
(29, 'Tomás Ramirez', 15),
(30, 'Pablo Castro', 15),
(31, 'Valeria Torres', 16),
(32, 'Andrés Soto', 16),
(33, 'Valentina Castro', 17),
(34, 'Julián Valenzuela', 17),
(35, 'Martina Ortiz', 18),
(36, 'Felipe Leiva', 18),
(37, 'Antonella Espinoza', 19),
(38, 'Jerónimo Ríos', 19),
(39, 'Josefina Miranda', 20),
(40, 'Ignacio Silva', 20),
(41, 'Emilia Vargas', 21),
(42, 'Agustín Mendoza', 21),
(43, 'Ignacio Soto', 22),
(44, 'Antonia Villalobos', 22),
(45, 'Manuel Vargas', 23),
(46, 'Emilia Mendoza', 23),
(47, 'Francisco Valenzuela', 24),
(48, 'Martina Romero', 24),
(49, 'Leonardo Guzmán', 25),
(50, 'Isabella Ríos', 25),
(51, 'Joaquín Paredes', 26),
(52, 'Catalina Morales', 26),
(53, 'Emiliano Guzmán', 27),
(54, 'Amelia Soto', 27),
(55, 'Sebastián Ríos', 28),
(56, 'Sofia Paredes', 28),
(57, 'Lucas Morales', 29),
(58, 'Renata Espinoza', 29),
(59, 'Alejandro Castro', 30),
(60, 'Isidora Vargas', 30),
(61, 'Matías Rojas', 31),
(62, 'Victoria Fuentes', 31),
(63, 'Maximiliano Castro', 32),
(64, 'Antonella Fuentes', 32),
(65, 'Tomás Soto', 33),
(66, 'Emilia Vargas', 33),
(67, 'Matías Villalobos', 34),
(68, 'Camila Espinoza', 34),
(69, 'Santiago Rojas', 35),
(70, 'Valentina Fuentes', 35),
(71, 'Felipe Vargas', 36),
(72, 'Daniela Ríos', 36),
(73, 'Ignacio Rojas', 37),
(74, 'Catalina Fuentes', 37),
(75, 'Gabriel Soto', 38),
(76, 'Sofia Rojas', 38),
(77, 'Juan Pablo Guzmán', 39),
(78, 'Victoria Fuentes', 39),
(79, 'Lucas Rojas', 40),
(80, 'Isabella Soto', 40),
(81, 'Isabella Soto', 41),
(82, 'Alejandro Guzmán', 41),
(83, 'Andrés Soto', 42),
(84, 'Martina Rojas', 42),
(85, 'Francisco Fuentes', 43),
(86, 'Antonella Soto', 43),
(87, 'Joaquín Rojas', 44),
(88, 'Camila Fuentes', 44),
(89, 'Leonardo Soto', 45),
(90, 'Isabella Rojas', 45),
(91, 'Lucresia Gonzalez', 1),
(92, 'Gabriel Torres', 46),
(93, 'Valentina Martinez', 47),
(94, 'Lucas Gonzalez', 47),
(95, 'Isabella Fernandez', 48),
(96, 'Mateo Ramirez', 48),
(97, 'Mia Perez', 49),
(98, 'Santiago Rodriguez', 49),
(99, 'Emma Garcia', 50),
(100, 'Sebastian Sanchez', 50),
(101, 'Camila Lopez', 51),
(102, 'Benjamin Martinez', 51),
(103, 'Valeria Torres', 52),
(104, 'Juan Ramirez', 52),
(105, 'Lucia Fernandez', 53),
(106, 'Maximiliano Perez', 53),
(107, 'Antonella Rodriguez', 54),
(108, 'Agustin Garcia', 54),
(109, 'Catalina Sanchez', 55),
(110, 'Facundo Lopez', 55),
(111, 'Isidora Martinez', 56),
(112, 'Joaquin Torres', 56),
(113, 'Renata Ramirez', 57),
(114, 'Nicolas Fernandez', 57),
(115, 'Antonia Perez', 58),
(116, 'Emilio Rodriguez', 58),
(117, 'Amelia Garcia', 59),
(118, 'Sebastian Sanchez', 59),
(119, 'Valentina Ramirez', 60),
(120, 'Luciano Perez', 60),
(121, 'Juan Carlos Gomez', 121),
(122, 'Ava Evelyn Herrera', 123),
(123, 'Rocio Diaz', 124);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorio`
--

CREATE TABLE `laboratorio` (
  `idLaboratorio` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `pais` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `laboratorio`
--

INSERT INTO `laboratorio` (`idLaboratorio`, `nombre`, `pais`, `email`, `telefono`) VALUES
(7, 'Vaccinex Pharma', 'Argentina', 'info@vaccinexpharma.com', '+1 (555) 123-4567'),
(8, 'Immunotech Solutions', 'Inglaterra', 'contact@immunotechsolutions.com', '+1 (555) 987-6543'),
(9, 'VaxCorp Laboratories', 'Argentina', 'info@vaxcorplabs.com', '+1 (555) 789-0123'),
(10, 'Biogenix Vaccines', 'USA', 'contact@biogenixvaccines.com', '+1 (555) 234-5678'),
(11, 'MedVax Research', 'USA', 'info@medvaxresearch.com', '+1 (555) 876-5432'),
(12, 'ViralGuard Labs', 'USA', 'contact@viralguardlabs.com', '+1 (555) 432-1098'),
(13, 'Immunovia Pharmaceuticals', 'Inglaterra', 'info@immunoviapharma.com', '+1 (555) 321-0987'),
(14, 'ViroGen Solutions', 'Alemania', 'contact@virogensolutions.com', '+1 (555) 210-9876'),
(15, 'BioShield Biologics', 'China', 'info@bioshieldbiologics.com', '+1 (555) 678-9012'),
(16, 'CureVax Laboratories', 'Chile', 'contact@curevaxlabs.com', '+1 (555) 901-2345'),
(17, 'Pfizer', 'USA', 'contact@pfizer.com', '1147887000'),
(18, 'BioTechMed', 'Canada', 'info@biotechmed.com', '1123123123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE `localidad` (
  `idLocalidad` int(11) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`idLocalidad`, `provincia`, `ciudad`) VALUES
(1, 'Buenos Aires', 'Ciudad Autónoma de Buenos Aires'),
(2, 'Córdoba', 'Córdoba '),
(3, 'Santa Fe', 'Rosario '),
(4, 'Mendoza', 'Mendoza '),
(5, 'Tucumán', 'San Miguel'),
(6, 'Buenos Aires', 'La Plata'),
(7, 'Salta', 'Salta'),
(8, 'Santa Fe', 'Santa Fe'),
(9, 'Buenos Aires', 'Mar del Plata'),
(10, 'San Juan', 'San Juan'),
(11, 'Chaco', 'Resistencia '),
(12, 'Santiago del Estero', 'Santiago del Estero'),
(13, 'Corrientes', 'Corrientes'),
(14, 'Buenos Aires', 'Bahía Blanca'),
(15, 'Jujuy', 'San Salvador de Jujuy'),
(16, 'Misiones', 'Posadas'),
(17, 'Entre Ríos', 'Paraná'),
(18, 'Formosa', 'Formosa'),
(19, 'Neuquén', 'Neuquén'),
(20, 'San Luis', 'San Luis'),
(21, 'La Rioja', 'La Rioja'),
(22, 'Santa Cruz', 'Río Gallegos'),
(23, 'Catamarca', 'Catamarca'),
(24, 'Río Negro', 'Viedma'),
(25, 'Chubut', 'Rawson'),
(26, 'Tierra del Fuego', 'Ushuaia'),
(27, 'La Pampa', 'Santa Rosa'),
(28, 'Río Negro', 'San Carlos de Bariloche'),
(29, 'Buenos Aires', 'La Matanza'),
(30, 'Buenos Aires', 'Quilmes'),
(33, 'San Luis', 'Merlo'),
(42, 'Buenos Aires', 'Merlo'),
(43, 'Buenos Aires', 'Moron'),
(44, 'Córdoba', 'Capilla del Monte'),
(45, 'San Luis', 'Carpinteria'),
(46, 'Tierra del Fuego', 'Ushuai'),
(47, 'Córdoba', 'Unquillo'),
(48, 'Buenos Aires', 'Caballito'),
(49, 'Catamarca', 'sadsadsadsad'),
(50, 'Santa Fe', 'Venado Tuerto'),
(51, 'Córdoba', 'Villa Dolores'),
(52, 'Formosa', 'Clorinda'),
(53, 'Mendoza', 'San Rafael'),
(54, 'Buenos Aires', 'Ezeiza'),
(55, 'Jujuy', 'Purmamarca'),
(56, 'Corrientes', 'Azul'),
(57, 'Buenos Aires', 'Lanus'),
(58, 'Corrientes', 'Bella Vista'),
(59, 'Buenos Aires', 'Buenos Aires'),
(60, 'San Luis', 'Concaran'),
(61, 'Córdoba', 'Ria Cuarto'),
(62, 'Salta', 'Aguaray');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loteprovedor`
--

CREATE TABLE `loteprovedor` (
  `idLote` int(11) NOT NULL,
  `idVacuna` int(11) NOT NULL,
  `fechaFabricacion` date NOT NULL,
  `fechaVencimiento` date NOT NULL,
  `estado` enum('enViaje','enStock','sinStock','descartado') NOT NULL,
  `cantVacunas` int(11) NOT NULL,
  `fechaAdquisicion` date DEFAULT NULL,
  `idDepoNacion` int(11) DEFAULT NULL,
  `vencida` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `loteprovedor`
--

INSERT INTO `loteprovedor` (`idLote`, `idVacuna`, `fechaFabricacion`, `fechaVencimiento`, `estado`, `cantVacunas`, `fechaAdquisicion`, `idDepoNacion`, `vencida`) VALUES
(3, 8, '2023-04-20', '2023-09-15', 'sinStock', 0, '2023-07-08', 1, 0),
(4, 15, '2023-02-22', '2023-07-30', 'descartado', 0, '2023-06-14', 2, 1),
(5, 9, '2023-02-09', '2023-11-18', 'enStock', 3000, '2023-07-10', 3, 0),
(6, 23, '2023-04-14', '2023-11-17', 'enStock', 2900, '2023-07-15', 1, 0),
(7, 11, '2023-02-17', '2023-09-28', 'enViaje', 1000, NULL, 4, 0),
(8, 11, '2023-03-08', '2023-07-16', 'descartado', 0, '2023-07-26', 4, 1),
(9, 20, '2023-04-11', '2023-11-23', 'enViaje', 1500, NULL, 3, 0),
(10, 21, '2023-04-01', '2023-08-02', 'descartado', 0, NULL, 4, 1),
(11, 7, '2023-02-14', '2023-11-09', 'enStock', 2500, '2023-07-17', 4, 0),
(12, 22, '2023-03-08', '2023-12-05', 'enStock', 5000, '2023-07-14', 5, 0),
(13, 6, '2023-03-19', '2023-08-28', 'sinStock', 5000, '2023-07-18', 3, 0),
(14, 11, '2023-03-18', '2023-08-21', 'enStock', 5000, '2023-07-18', 4, 0),
(15, 20, '2023-01-11', '2023-08-27', 'enStock', 5000, '2023-07-18', 3, 0),
(16, 23, '2023-01-02', '2023-07-15', 'descartado', 0, '2023-07-18', 3, 1),
(17, 17, '2023-02-21', '2023-11-29', 'enViaje', 10000, NULL, 4, 0),
(23, 9, '2022-11-16', '2023-07-10', 'descartado', 0, '2023-07-17', 1, 1),
(25, 15, '2023-01-03', '2023-07-16', 'descartado', 0, '2023-07-17', 1, 1),
(26, 19, '2023-02-01', '2023-07-02', 'descartado', 0, '2023-07-22', 3, 1),
(27, 20, '2023-02-08', '2023-07-02', 'descartado', 0, '2023-07-19', 5, 1),
(28, 6, '2023-03-19', '2023-07-07', 'descartado', 0, '2023-07-19', 3, 1),
(29, 6, '2023-02-10', '2023-07-21', 'descartado', 0, '2023-07-19', 3, 1),
(30, 24, '2023-02-24', '2023-09-16', 'enStock', 20000, '2023-07-19', 4, 0),
(31, 24, '2023-02-13', '2023-10-15', 'enStock', 50000, '2023-07-19', 4, 0),
(32, 8, '2023-04-06', '2023-09-22', 'enStock', 20000, '2023-07-19', 2, 0),
(33, 20, '2023-01-25', '2023-07-21', 'descartado', 0, '2023-07-19', 4, 1),
(34, 7, '2023-03-05', '2023-11-07', 'descartado', 0, '2023-07-20', 4, 1),
(35, 15, '2023-02-05', '2023-10-22', 'enStock', 15310, '2023-07-21', 4, 0),
(36, 6, '2023-03-14', '2023-07-21', 'descartado', 0, '2023-07-22', 1, 1),
(37, 6, '2023-03-09', '2023-07-21', 'descartado', 0, '2023-07-22', 1, 1),
(38, 21, '2023-03-22', '2023-08-05', 'descartado', 0, '2023-07-23', 1, 0),
(39, 21, '2023-03-27', '2023-09-30', 'enStock', 10000, '2023-07-23', 4, 0),
(40, 7, '2023-02-06', '2023-07-24', 'descartado', 0, '2023-07-25', 2, 1),
(41, 25, '2023-01-12', '2023-07-24', 'descartado', 0, '2023-07-25', 2, 1),
(42, 7, '2023-01-14', '2023-09-30', 'enStock', 20000, '2023-07-25', 2, 0),
(43, 22, '2023-02-25', '2023-07-27', 'descartado', 0, '2023-07-26', 1, 1),
(44, 24, '2023-02-28', '2023-09-17', 'descartado', 0, '2023-07-27', 3, 0),
(45, 11, '2023-01-25', '2023-10-23', 'descartado', 0, '2023-07-27', 3, 0),
(46, 17, '2023-01-31', '2023-09-12', 'enStock', 5000, '2023-07-27', 3, 0),
(47, 11, '2023-04-17', '2023-09-30', 'sinStock', 0, '2023-07-28', 6, 0),
(48, 20, '2023-02-25', '2023-08-17', 'enStock', 20000, '2023-07-28', 6, 0),
(49, 10, '2023-04-12', '2023-09-20', 'enStock', 80000, '2023-07-29', 1, 0),
(50, 12, '2023-04-25', '2023-10-26', 'enStock', 36000, '2023-07-29', 5, 0),
(51, 19, '2023-03-21', '2023-09-01', 'enStock', 5000, '2023-07-30', 3, 0),
(52, 26, '2023-02-24', '2023-09-18', 'enStock', 330000, '2023-08-01', 7, 0),
(53, 12, '2023-01-14', '2023-08-25', 'descartado', 0, '2023-08-03', 5, 0),
(54, 26, '2023-01-06', '2023-08-03', 'descartado', 0, '2023-08-03', 3, 1),
(55, 6, '2023-01-06', '2023-11-19', 'enStock', 500000, '2023-08-03', 2, 0),
(56, 8, '2023-01-11', '2023-10-15', 'enViaje', 50000, NULL, 2, 0);

--
-- Disparadores `loteprovedor`
--
DELIMITER $$
CREATE TRIGGER `actualizar_vencida` BEFORE INSERT ON `loteprovedor` FOR EACH ROW BEGIN
    IF NEW.fechaVencimiento < CURDATE() THEN
        SET NEW.vencida = TRUE;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `idPaciente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  `dni` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `genero` enum('Masculino','Femenino') NOT NULL,
  `mail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`idPaciente`, `nombre`, `apellido`, `idLocalidad`, `dni`, `telefono`, `direccion`, `genero`, `mail`) VALUES
(1, 'Nelson Marco', 'Silva', 33, '35830731', '123456', 'Av. Inventada 1234', 'Masculino', 'marco@gmail.com'),
(4, 'Roberto ', 'Gomez', 33, '12345612', '4564546546456', 'Av. Mentira 777', 'Masculino', 'roberto@gmail.com'),
(6, 'Pepe', 'Ramires', 42, '98765445', '12345645', 'San Martin 1234', 'Masculino', 'pepe@gmail.com'),
(7, 'Rocio', 'Gomez', 20, '56123789', '2664457898', 'Los Sauces 999', 'Femenino', 'rocio@gmail.com'),
(8, 'Maria Cristina', 'Gayarre', 33, '10555666', '2664124578', 'Los Jilgueros 123', 'Femenino', 'cristina@gmail.com'),
(9, 'Carolina', 'Perez', 33, '38565656', '2664666666', 'San Martin 123', 'Femenino', 'carolina@gmail.com'),
(10, 'Ramiro', 'Diaz', 43, '20234564', '1123656565', 'Mercau 1234', 'Masculino', 'wqewqsadas@sadsa'),
(11, 'Analia', 'Schultheis', 3, '15235678', '1126556445', 'Av. Siempre Viva 742', 'Femenino', 'ana@gmail.com'),
(12, 'Pedro', 'Silva', 44, '4123456', '354456456', 'Ruta 4 1234', 'Masculino', 'silvapedro@gmail.com'),
(13, 'Lucas', 'Perez', 45, '35666111', '2664178239', 'Los Mandarinos 666', 'Masculino', 'lucasperez@gmail.com'),
(14, 'Rosario', 'Rodriguez', 46, '38123456', '1145645645', 'Roque 123', 'Femenino', 'rorodriguez@gmail.com'),
(15, 'Roberto ', 'Gallardo', 47, '20333111', '354232323', 'La Usina 123', 'Masculino', 'bob@gmail.com'),
(16, 'Luciano', 'Terricabras', 48, '22123321', '115656565', 'Av. Ilia 23', 'Masculino', 'luterri@gmail.com'),
(17, 'Manuel', 'Rodriguez', 47, '34963258', '354789845', 'Calle Inventada 1234', 'Masculino', 'juanmaro@gmail.com'),
(18, 'Pablo Nicolas', 'Castro', 33, '35333333', '2664123123', 'Calle Trucha 123', 'Masculino', 'pcastro@gmail.com'),
(19, 'Pablo Nicolas', 'Castro', 33, '35111236', '2664690227', 'Calle Trucha 123', 'Masculino', 'pcastro@gmail.com'),
(20, 'Luciana', 'Gutierrez', 50, '12456666', '356444444', 'Av. General Huemes 123', 'Femenino', 'luguti@gmail.com'),
(21, 'Mateo Santiago', 'Martinez', 56, '34567890', '02954678901', 'Calle Santa Clara 123', 'Masculino', 'santiago.martinez@example.com'),
(22, 'Juan', 'Martínez', 1, '35478901', '1123456789', 'Av. Rivadavia 1234', 'Femenino', 'juan.martinez@example.com'),
(23, 'Sofia ', 'Martinez', 59, '32222777', '111234567', 'Calle 123, N° 456', 'Femenino', 'sofia.martinez@example.com'),
(24, 'Carlos ', 'Ramirez', 60, '22333555', '26649876543', 'Avenida Principal, N° 789', 'Masculino', 'carlos.ramirez@example.com'),
(25, 'Emily', 'Johnson', 61, '34951753', '3545678901', 'Elm Street, N° 456', 'Femenino', 'emily.johnson@example.com'),
(26, 'Juan Cruz', 'Gomez', 62, '25666851', '3873460796', 'Av. Sarmiento y Pje Arenales', 'Masculino', 'juanc@example.com'),
(27, 'Roberto', 'Gomez', 33, '24122325', '112365454', 'Calle de Mentira 123', 'Masculino', 'robergomez@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `dni`, `correo`, `pass`, `createdAt`, `updatedAt`) VALUES
(1, 'Marco', 'Silva', '35830731', 'marco@gmail.com', '$2a$10$FyNDeP9WaxWgw82eIX4iY.D2ZA5P9uHk31KBZFHaYryg3sOk.6PU.', '2023-06-05 13:19:59', '2023-06-05 13:19:59'),
(7, 'Juan', 'Perez', '12345645', 'admin@gmail.com', '$2a$10$xVJzX91qj1nu4Ix.XgfmbOO.1iEfWYoYJ6fSO7dlvsYR4z50JBX3O', '2023-07-20 00:24:17', '2023-07-20 00:24:17'),
(8, 'Roberto', 'Gomez', '45789789', 'roberto@gmail.com', '$2a$10$Y50Ki.nTR4cylE5pdlBTqeq8URfLvoUjENcwKjFqILFB/v4BvRkfK', '2023-07-26 18:52:46', '2023-07-26 18:52:46'),
(9, 'Roxana', 'Calivares', '25456456', 'roxi@gmail.com', '$2a$10$f.xlF.6JpYB4K33WbMID7e16WoxUTwnFaFTcYQEHz.uMWGT7mQw/6', '2023-07-26 18:53:51', '2023-07-26 18:53:51'),
(10, 'Maria', 'Cristina', '12456789', 'macristi@gmail.com', '$2a$10$VHthaOJTP8Jo5QYhIoo/IO166jdaHvpXESBeA1VK2zXAfPtm8P54O', '2023-07-26 18:55:02', '2023-07-26 18:55:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacuna`
--

CREATE TABLE `vacuna` (
  `idVacuna` int(11) NOT NULL,
  `idLaboratorio` int(11) NOT NULL,
  `tipoVacuna` varchar(50) NOT NULL,
  `nombreComercial` varchar(50) NOT NULL,
  `paisOrigen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vacuna`
--

INSERT INTO `vacuna` (`idVacuna`, `idLaboratorio`, `tipoVacuna`, `nombreComercial`, `paisOrigen`) VALUES
(6, 7, 'Vacuna contra la Hepatitis A', 'Havrix', 'Argentina'),
(7, 7, 'Vacuna contra la Influenza', 'FluMist', 'Argentina'),
(8, 7, 'Vacuna Triple Viral', 'Priorix', 'Argentina'),
(9, 8, 'Vacuna contra el Tétanos', 'Adacel', 'Inglaterra'),
(10, 8, 'Vacuna contra la Neumococo', 'Prevnar 13', 'Inglaterra'),
(11, 9, 'Vacuna contra la Fiebre Tifoidea', 'Typhim Vi', 'Argentina'),
(12, 9, 'Vacuna contra la Fiebre Amarilla', 'YF-Vax', 'Argentina'),
(13, 10, 'Vacuna contra la Fiebre Amarilla', 'Stamaril', 'USA'),
(14, 10, 'Vacuna contra la Influenza', 'Fluarix', 'USA'),
(15, 10, 'Vacuna contra la Rabia', 'Imovax Rabies', 'USA'),
(16, 11, 'Vacuna contra la Rabia', 'RabAvert', 'USA'),
(17, 11, 'Vacuna contra la Tos Ferina', 'Boostrix', 'USA'),
(18, 12, 'Vacuna contra la Neumococo', 'Pneumovax 23', 'USA'),
(19, 13, 'Vacuna contra la Varicela', 'Havrix', 'Inglaterra'),
(20, 13, 'Vacuna contra la Hepatitis B', 'Recombivax HB', 'Inglaterra'),
(21, 14, 'Vacuna contra la Varicela', 'ProQuad', 'Alemania'),
(22, 15, 'Vacuna contra la Difteria', 'Infanrix', 'China'),
(23, 16, 'Vacuna contra el Virus del Papiloma Humano', 'Gardasil', 'Chile'),
(24, 16, 'Vacuna contra la Hepatitis A', 'Vaqta', 'Chile'),
(25, 16, 'Vacuna contra la Varicela', 'Varipro', 'Chile'),
(26, 17, 'Vacuna Contra el Covid-19', 'Pfizer-BioNTech COVID-19 Vaccine', 'USA'),
(27, 18, 'Vacuna Contra el Covid-19', 'VaxiGuard', 'Canada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunasaplicadas`
--

CREATE TABLE `vacunasaplicadas` (
  `idAplicacion` int(11) NOT NULL,
  `idLote` int(11) NOT NULL,
  `idLoteCentro` int(11) NOT NULL,
  `fechaAplicacion` date NOT NULL,
  `idPaciente` int(11) NOT NULL,
  `idEnfermero` int(11) NOT NULL,
  `idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vacunasaplicadas`
--

INSERT INTO `vacunasaplicadas` (`idAplicacion`, `idLote`, `idLoteCentro`, `fechaAplicacion`, `idPaciente`, `idEnfermero`, `idCentro`) VALUES
(2, 29, 1, '2023-07-20', 7, 1, 1),
(3, 29, 1, '2023-07-20', 1, 2, 1),
(4, 34, 15, '2023-07-20', 8, 80, 40),
(5, 34, 15, '2023-07-20', 8, 80, 40),
(6, 34, 15, '2023-07-21', 9, 79, 40),
(7, 29, 3, '2023-07-21', 10, 91, 1),
(8, 35, 16, '2023-07-21', 11, 29, 15),
(9, 33, 18, '2023-07-22', 12, 8, 4),
(10, 30, 8, '2023-07-23', 13, 77, 39),
(11, 39, 27, '2023-07-23', 14, 101, 51),
(12, 4, 30, '2023-07-25', 15, 107, 54),
(13, 6, 29, '2023-07-27', 16, 119, 60),
(14, 46, 45, '2023-07-27', 17, 43, 22),
(15, 42, 38, '2023-07-27', 12, 63, 32),
(16, 30, 46, '2023-07-28', 19, 121, 121),
(17, 30, 46, '2023-07-28', 1, 121, 121),
(18, 35, 16, '2023-07-28', 20, 29, 15),
(21, 52, 54, '2023-08-01', 23, 49, 25),
(22, 52, 53, '2023-08-01', 24, 52, 26),
(23, 52, 52, '2023-08-01', 25, 123, 124),
(24, 53, 57, '2023-08-03', 26, 27, 14),
(25, 52, 58, '2023-08-03', 27, 89, 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunasdescarte`
--

CREATE TABLE `vacunasdescarte` (
  `idDescarte` int(11) NOT NULL,
  `idLote` int(11) NOT NULL,
  `motivo` varchar(50) NOT NULL,
  `fechaDescarte` date NOT NULL,
  `personaACargo` int(11) NOT NULL,
  `tipoLote` enum('LoteNacion','LoteProvincia','LoteCentro') NOT NULL,
  `cantVacunas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vacunasdescarte`
--

INSERT INTO `vacunasdescarte` (`idDescarte`, `idLote`, `motivo`, `fechaDescarte`, `personaACargo`, `tipoLote`, `cantVacunas`) VALUES
(344, 38, 'Perdida de Frio', '2023-07-24', 1, 'LoteNacion', 5000),
(345, 29, 'Perdida de Frio', '2023-07-24', 1, 'LoteProvincia', 1000),
(346, 25, 'Perdida de Frio', '2023-07-24', 1, 'LoteCentro', 2500),
(347, 26, 'Perdida de Frio', '2023-07-24', 1, 'LoteCentro', 1500),
(348, 8, 'Vencida', '2023-07-24', 1, 'LoteNacion', 1000),
(349, 16, 'Vencida', '2023-07-24', 1, 'LoteNacion', 4900),
(350, 15, 'Vencida', '2023-07-24', 1, 'LoteProvincia', 3000),
(351, 17, 'Vencida', '2023-07-24', 1, 'LoteProvincia', 100),
(352, 23, 'Vencida', '2023-07-24', 1, 'LoteNacion', 5000),
(353, 25, 'Vencida', '2023-07-24', 1, 'LoteNacion', 4900),
(354, 26, 'Vencida', '2023-07-24', 1, 'LoteNacion', 0),
(355, 27, 'Vencida', '2023-07-24', 1, 'LoteNacion', 20000),
(356, 28, 'Vencida', '2023-07-24', 1, 'LoteNacion', 10000),
(357, 29, 'Vencida', '2023-07-24', 1, 'LoteNacion', 2900),
(358, 20, 'Vencida', '2023-07-24', 1, 'LoteProvincia', 0),
(359, 2, 'Vencida', '2023-07-24', 1, 'LoteCentro', 100),
(360, 3, 'Vencida', '2023-07-24', 1, 'LoteCentro', 99),
(361, 4, 'Vencida', '2023-07-24', 1, 'LoteCentro', 200),
(362, 6, 'Vencida', '2023-07-24', 1, 'LoteCentro', 100),
(363, 11, 'Vencida', '2023-07-24', 1, 'LoteCentro', 400),
(364, 12, 'Vencida', '2023-07-24', 1, 'LoteCentro', 500),
(365, 13, 'Vencida', '2023-07-24', 1, 'LoteCentro', 500),
(366, 14, 'Vencida', '2023-07-24', 1, 'LoteCentro', 500),
(367, 21, 'Vencida', '2023-07-24', 1, 'LoteProvincia', 1000),
(368, 1, 'Vencida', '2023-07-24', 1, 'LoteCentro', 4998),
(369, 7, 'Vencida', '2023-07-24', 1, 'LoteCentro', 50),
(370, 10, 'Vencida', '2023-07-24', 1, 'LoteCentro', 50),
(371, 33, 'Vencida', '2023-07-24', 1, 'LoteNacion', 25000),
(372, 23, 'Vencida', '2023-07-24', 1, 'LoteProvincia', 10000),
(373, 9, 'Vencida', '2023-07-24', 1, 'LoteCentro', 5000),
(374, 18, 'Vencida', '2023-07-24', 1, 'LoteCentro', 9999),
(375, 34, 'Vencida', '2023-07-24', 1, 'LoteNacion', 5000),
(376, 24, 'Vencida', '2023-07-24', 1, 'LoteProvincia', 2500),
(377, 15, 'Vencida', '2023-07-24', 1, 'LoteCentro', 2497),
(378, 17, 'Vencida', '2023-07-24', 1, 'LoteCentro', 5000),
(379, 36, 'Vencida', '2023-07-24', 1, 'LoteNacion', 25000),
(380, 26, 'Vencida', '2023-07-24', 1, 'LoteProvincia', 25000),
(381, 37, 'Vencida', '2023-07-24', 1, 'LoteNacion', 5000),
(382, 27, 'Vencida', '2023-07-24', 1, 'LoteProvincia', 0),
(383, 19, 'Vencida', '2023-07-24', 1, 'LoteCentro', 5000),
(384, 28, 'Rotura', '2023-07-24', 1, 'LoteCentro', 2500),
(385, 30, 'Perdida de Frio', '2023-07-25', 1, 'LoteCentro', 249),
(386, 43, 'Perdida de Frio', '2023-07-26', 1, 'LoteNacion', 2000),
(387, 34, 'Perdida de Frio', '2023-07-26', 1, 'LoteProvincia', 1000),
(388, 37, 'Perdida de Frio', '2023-07-26', 1, 'LoteCentro', 2000),
(389, 44, 'Rotura', '2023-07-27', 8, 'LoteNacion', 15000),
(390, 45, 'Defecto de Origen', '2023-07-27', 8, 'LoteNacion', 25000),
(391, 37, 'Defecto de Origen', '2023-07-27', 8, 'LoteProvincia', 10000),
(392, 39, 'Defecto de Origen', '2023-07-27', 8, 'LoteCentro', 15000),
(398, 54, 'Perdida de Frio', '2023-08-01', 8, 'LoteCentro', 49999),
(399, 53, 'Desperfecto del Lote', '2023-08-03', 8, 'LoteNacion', 25000),
(400, 59, 'Desperfecto del Lote', '2023-08-03', 8, 'LoteProvincia', 10000),
(401, 57, 'Desperfecto del Lote', '2023-08-03', 8, 'LoteCentro', 14999),
(402, 4, 'Vencida', '2023-08-03', 1, 'LoteNacion', 1000),
(403, 5, 'Vencida', '2023-08-03', 1, 'LoteProvincia', 200),
(404, 8, 'Vencida', '2023-08-03', 1, 'LoteProvincia', 0),
(405, 41, 'Vencida', '2023-08-03', 1, 'LoteCentro', 300),
(406, 11, 'Vencida', '2023-08-03', 1, 'LoteProvincia', 100),
(407, 13, 'Vencida', '2023-08-03', 1, 'LoteProvincia', 400),
(408, 28, 'Vencida', '2023-08-03', 1, 'LoteProvincia', 250),
(409, 20, 'Vencida', '2023-08-03', 1, 'LoteCentro', 0),
(410, 24, 'Vencida', '2023-08-03', 1, 'LoteCentro', 0),
(411, 30, 'Vencida', '2023-08-03', 1, 'LoteCentro', 0),
(412, 10, 'Vencida', '2023-08-03', 1, 'LoteNacion', 10000),
(413, 40, 'Vencida', '2023-08-03', 1, 'LoteNacion', 5000),
(414, 31, 'Vencida', '2023-08-03', 1, 'LoteProvincia', 5000),
(415, 32, 'Vencida', '2023-08-03', 1, 'LoteProvincia', 1000),
(416, 31, 'Vencida', '2023-08-03', 1, 'LoteCentro', 3000),
(417, 32, 'Vencida', '2023-08-03', 1, 'LoteCentro', 1000),
(418, 41, 'Vencida', '2023-08-03', 1, 'LoteNacion', 10000),
(419, 33, 'Vencida', '2023-08-03', 1, 'LoteProvincia', 0),
(420, 33, 'Vencida', '2023-08-03', 1, 'LoteCentro', 3000),
(421, 34, 'Vencida', '2023-08-03', 1, 'LoteCentro', 2000),
(422, 54, 'Vencida', '2023-08-03', 1, 'LoteNacion', 50000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `centrovacunacion`
--
ALTER TABLE `centrovacunacion`
  ADD PRIMARY KEY (`idCentro`),
  ADD KEY `idLocalidad2_fk` (`idLocalidad`);

--
-- Indices de la tabla `centrovacunacionstock`
--
ALTER TABLE `centrovacunacionstock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSublote` (`idSublote`),
  ADD KEY `idCentro2` (`idCentro`);

--
-- Indices de la tabla `compralote`
--
ALTER TABLE `compralote`
  ADD PRIMARY KEY (`idCompra`),
  ADD KEY `idLote6_fk` (`idLote`);

--
-- Indices de la tabla `depoprovinciastock`
--
ALTER TABLE `depoprovinciastock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idDepoProv2_fk` (`idDepoProv`),
  ADD KEY `idLote2_fk` (`idLote`);

--
-- Indices de la tabla `depositonacion`
--
ALTER TABLE `depositonacion`
  ADD PRIMARY KEY (`idDepoNacion`),
  ADD KEY `idLocalidad3_fk` (`idLocalidad`);

--
-- Indices de la tabla `depositoprovincia`
--
ALTER TABLE `depositoprovincia`
  ADD PRIMARY KEY (`idDepoProv`),
  ADD KEY `idLocalidad_fk` (`idLocalidad`);

--
-- Indices de la tabla `enfermero`
--
ALTER TABLE `enfermero`
  ADD PRIMARY KEY (`idEnfermero`),
  ADD KEY `idCentro2_fk` (`idCentro`);

--
-- Indices de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  ADD PRIMARY KEY (`idLaboratorio`);

--
-- Indices de la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD PRIMARY KEY (`idLocalidad`);

--
-- Indices de la tabla `loteprovedor`
--
ALTER TABLE `loteprovedor`
  ADD PRIMARY KEY (`idLote`),
  ADD KEY `idVacuna2_fk` (`idVacuna`),
  ADD KEY `idDepoNacion1_fk` (`idDepoNacion`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`idPaciente`),
  ADD KEY `idLocalidad` (`idLocalidad`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD PRIMARY KEY (`idVacuna`),
  ADD KEY `id_lab` (`idLaboratorio`);

--
-- Indices de la tabla `vacunasaplicadas`
--
ALTER TABLE `vacunasaplicadas`
  ADD PRIMARY KEY (`idAplicacion`),
  ADD KEY `idLote4_fk` (`idLote`),
  ADD KEY `idPaciente_fk` (`idPaciente`),
  ADD KEY `idEnfermero` (`idEnfermero`),
  ADD KEY `idCentro` (`idCentro`),
  ADD KEY `idLoteCentro` (`idLoteCentro`);

--
-- Indices de la tabla `vacunasdescarte`
--
ALTER TABLE `vacunasdescarte`
  ADD PRIMARY KEY (`idDescarte`),
  ADD KEY `personaAcargo_fk` (`personaACargo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `centrovacunacion`
--
ALTER TABLE `centrovacunacion`
  MODIFY `idCentro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT de la tabla `centrovacunacionstock`
--
ALTER TABLE `centrovacunacionstock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `compralote`
--
ALTER TABLE `compralote`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `depoprovinciastock`
--
ALTER TABLE `depoprovinciastock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `depositonacion`
--
ALTER TABLE `depositonacion`
  MODIFY `idDepoNacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `depositoprovincia`
--
ALTER TABLE `depositoprovincia`
  MODIFY `idDepoProv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `enfermero`
--
ALTER TABLE `enfermero`
  MODIFY `idEnfermero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `idLaboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `localidad`
--
ALTER TABLE `localidad`
  MODIFY `idLocalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `loteprovedor`
--
ALTER TABLE `loteprovedor`
  MODIFY `idLote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `idPaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  MODIFY `idVacuna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `vacunasaplicadas`
--
ALTER TABLE `vacunasaplicadas`
  MODIFY `idAplicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `vacunasdescarte`
--
ALTER TABLE `vacunasdescarte`
  MODIFY `idDescarte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=423;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `centrovacunacion`
--
ALTER TABLE `centrovacunacion`
  ADD CONSTRAINT `idLocalidad2_fk` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`);

--
-- Filtros para la tabla `centrovacunacionstock`
--
ALTER TABLE `centrovacunacionstock`
  ADD CONSTRAINT `idCentro2` FOREIGN KEY (`idCentro`) REFERENCES `centrovacunacion` (`idCentro`),
  ADD CONSTRAINT `idSublote` FOREIGN KEY (`idSublote`) REFERENCES `depoprovinciastock` (`id`);

--
-- Filtros para la tabla `compralote`
--
ALTER TABLE `compralote`
  ADD CONSTRAINT `idLote6_fk` FOREIGN KEY (`idLote`) REFERENCES `loteprovedor` (`idLote`);

--
-- Filtros para la tabla `depoprovinciastock`
--
ALTER TABLE `depoprovinciastock`
  ADD CONSTRAINT `idDepoProv2_fk` FOREIGN KEY (`idDepoProv`) REFERENCES `depositoprovincia` (`idDepoProv`),
  ADD CONSTRAINT `idLote2_fk` FOREIGN KEY (`idLote`) REFERENCES `loteprovedor` (`idLote`);

--
-- Filtros para la tabla `depositonacion`
--
ALTER TABLE `depositonacion`
  ADD CONSTRAINT `idLocalidad3_fk` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`);

--
-- Filtros para la tabla `depositoprovincia`
--
ALTER TABLE `depositoprovincia`
  ADD CONSTRAINT `idLocalidad_fk` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`);

--
-- Filtros para la tabla `enfermero`
--
ALTER TABLE `enfermero`
  ADD CONSTRAINT `idCentro2_fk` FOREIGN KEY (`idCentro`) REFERENCES `centrovacunacion` (`idCentro`);

--
-- Filtros para la tabla `loteprovedor`
--
ALTER TABLE `loteprovedor`
  ADD CONSTRAINT `idDepoNacion1_fk` FOREIGN KEY (`idDepoNacion`) REFERENCES `depositonacion` (`idDepoNacion`),
  ADD CONSTRAINT `idVacuna2_fk` FOREIGN KEY (`idVacuna`) REFERENCES `vacuna` (`idVacuna`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `idLocalidad` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`);

--
-- Filtros para la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD CONSTRAINT `id_lab` FOREIGN KEY (`idLaboratorio`) REFERENCES `laboratorio` (`idLaboratorio`);

--
-- Filtros para la tabla `vacunasaplicadas`
--
ALTER TABLE `vacunasaplicadas`
  ADD CONSTRAINT `idCentro` FOREIGN KEY (`idCentro`) REFERENCES `centrovacunacion` (`idCentro`),
  ADD CONSTRAINT `idEnfermero` FOREIGN KEY (`idEnfermero`) REFERENCES `enfermero` (`idEnfermero`),
  ADD CONSTRAINT `idLote4_fk` FOREIGN KEY (`idLote`) REFERENCES `loteprovedor` (`idLote`),
  ADD CONSTRAINT `idLoteCentro` FOREIGN KEY (`idLoteCentro`) REFERENCES `centrovacunacionstock` (`id`),
  ADD CONSTRAINT `idPaciente_fk` FOREIGN KEY (`idPaciente`) REFERENCES `paciente` (`idPaciente`);

--
-- Filtros para la tabla `vacunasdescarte`
--
ALTER TABLE `vacunasdescarte`
  ADD CONSTRAINT `personaAcargo_fk` FOREIGN KEY (`personaACargo`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
