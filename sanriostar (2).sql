-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-09-2025 a las 03:13:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sanriostar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('5c785c036466adea360111aa28563bfd556b5fba', 'i:1;', 1755639673),
('5c785c036466adea360111aa28563bfd556b5fba:timer', 'i:1755639673;', 1755639673);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_compras`
--

CREATE TABLE `carrito_compras` (
  `carrito_id` tinyint(4) NOT NULL,
  `usuario_id` tinyint(4) NOT NULL,
  `producto_id` tinyint(4) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `agregado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_pedidos`
--

CREATE TABLE `comentarios_pedidos` (
  `comentario_id` tinyint(4) NOT NULL,
  `pedido_id` tinyint(4) NOT NULL,
  `usuario_id` tinyint(4) NOT NULL,
  `comentario` text NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_productos`
--

CREATE TABLE `comentarios_productos` (
  `comentario_id` tinyint(4) NOT NULL,
  `producto_id` tinyint(4) DEFAULT NULL,
  `usuario_id` tinyint(4) DEFAULT NULL,
  `comentario` text NOT NULL,
  `calificacion` int(11) DEFAULT NULL CHECK (`calificacion` >= 1 and `calificacion` <= 5),
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_facturas`
--

CREATE TABLE `detalles_facturas` (
  `detalle_factura_id` tinyint(4) NOT NULL,
  `factura_id` tinyint(4) NOT NULL,
  `producto_id` tinyint(4) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedidos`
--

CREATE TABLE `detalles_pedidos` (
  `detalle_pedido_id` tinyint(4) NOT NULL,
  `pedido_id` tinyint(4) DEFAULT NULL,
  `producto_id` tinyint(4) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `factura_id` tinyint(4) NOT NULL,
  `usuario_id` tinyint(4) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10,2) NOT NULL,
  `metodo_pago_id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `inventario_id` int(11) NOT NULL,
  `producto_id` tinyint(4) NOT NULL,
  `cantidad` int(11) NOT NULL CHECK (`cantidad` >= 0),
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodos_envio`
--

CREATE TABLE `metodos_envio` (
  `metodo_envio_id` tinyint(4) NOT NULL,
  `nombre_metodo` varchar(100) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodos_pago`
--

CREATE TABLE `metodos_pago` (
  `metodo_pago_id` tinyint(4) NOT NULL,
  `nombre_metodo` varchar(100) NOT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000002_create_jobs_table', 1),
(2, '2024_01_01_000000_create_roles_table', 2),
(3, '2024_01_01_000001_create_usuarios_table', 2),
(4, '2025_08_01_032118_create_cache_table', 2),
(5, '2024_01_01_000002_create_productos_table', 3),
(6, '2024_01_01_000003_create_categorias_table', 3),
(7, '2025_08_04_202623_create_sessions_table', 4),
(8, '2025_08_14_210131_add_email_verified_at_to_usuarios_table', 4),
(9, '2025_08_16_220517_create_personal_access_tokens_table', 4),
(10, '2025_08_19_183053_add_email_verified_at_to_usuarios_table', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `pedido_id` tinyint(4) NOT NULL,
  `usuario_id` tinyint(4) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `total_productos` int(11) DEFAULT 0,
  `costo_envio` decimal(10,2) DEFAULT 0.00,
  `metodo_envio_id` tinyint(4) DEFAULT NULL,
  `metodo_pago_id` tinyint(4) DEFAULT NULL,
  `estado` enum('Pendiente','Enviando','Completado','Cancelado') DEFAULT 'Pendiente',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `categorias_productos`
--

CREATE TABLE IF NOT EXISTS `categorias_productos` (
  `categoria_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_categoria` VARCHAR(100) NOT NULL,
  `descripcion` TEXT DEFAULT NULL,
  `ultima_actualizacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `categorias_productos`
--

INSERT INTO `categorias_productos` (`categoria_id`, `nombre_categoria`, `descripcion`, `ultima_actualizacion`) VALUES
(2, 'peluches', 'Peluches de Sanrio', '2025-08-21 22:30:15'),
(3, 'bolsos', 'Bolsos y mochilas', '2025-08-21 22:30:15'),
(4, 'maquillaje', 'Productos de maquillaje', '2025-08-21 22:30:15'),
(5, 'audifonos', 'Audífonos y accesorios de audio', '2025-08-21 22:30:15'),
(6, 'productos casa', 'Productos para el hogar', '2025-08-21 22:30:15'),
(7, 'accesorios', 'Accesorios varios', '2025-08-21 22:30:15'),
(8, 'camisetas', 'Camisetas y ropa', '2025-08-21 22:30:15'),
(9, 'escolares', 'Material escolar', '2025-08-21 22:30:15');

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE IF NOT EXISTS `productos` (
  `producto_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) DEFAULT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `categoria_id` INT UNSIGNED NULL,
  `url_imagen` VARCHAR(255) DEFAULT NULL,
  `ultima_actualizacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `personajes` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`producto_id`),
  KEY `idx_categoria` (`categoria_id`),
  CONSTRAINT `fk_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `categorias_productos`(`categoria_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `productos`
--
INSERT INTO `productos` (`producto_id`, `nombre_producto`, `descripcion`, `precio`, `categoria_id`, `url_imagen`, `ultima_actualizacion`, `personajes`) VALUES
(1, 'Jabonera Kuromi', 'Una jabonera con la imagen de Kuromi', 12000.000, NULL, 'JABONERAkuromi.jpg', '2025-08-03 05:22:26','kuromi'),
(2, 'Peluche Kuromi', 'Un hermoso y adorable peluche de Kuromi', 30000.000, NULL, 'peluchekurumi.jpg', '2025-08-03 05:22:26','kuromi'),
(3, 'Bolso Kuromi', 'Bolso de Kuromi, ideal para salir con estilo.', 69000.000, NULL, 'kuBOLSO.jpg', '2025-08-03 05:22:26','kuromi'),
(4, 'Abanico Kuromi', 'Un hermoso abanico con la imagen de Kuromi', 11000.000, NULL, 'kuABANICO.jpg', '2025-08-03 05:22:26','kuromi'),
(5, 'Calculadora Kuromi', 'Una calculadora con estilo', 27000.000, NULL, 'kuCALCULADORA.jpg', '2025-08-03 05:22:26','kuromi'),
(6, 'Manilla de Kuromi', 'Una preciosa manilla de Kuromi', 10000.000, NULL, 'kuMANILLA.jpg', '2025-08-03 05:22:26','kuromi'),
(7, 'Peine de Kuromi', 'Un peine para que puedas peinar tu cabello.', 17000.000, NULL, 'kuPEINE.jpg', '2025-08-03 05:22:26','kuromi'),
(8, 'Cartera Kuromi', 'Una cartera adorable para llevar tus cosas', 23000.000, NULL, 'kuCARTERA.jpg', '2025-08-03 05:22:26','kuromi'),
(9, 'Papelera Kuromi', 'Una linda papelera de Kuromi', 18000.000, NULL, 'kuPAPELERA.jpg', '2025-08-03 05:22:26','kuromi'),
(10, 'Balsamo de Kuromi', 'Un suave y bonito balsamo con estuche de kuromi', 9000.000, NULL, 'balsamokuromi.jpg', '2025-08-03 05:22:26','kuromi'),
(11, 'Bolsa pequeña de Kuromi', 'Bolsa pequeña de kuromi', 23000.000, NULL, 'bolsakuromi.jpg', '2025-08-03 05:22:26','kuromi'),
(12, 'Lapicero de Kuromi', 'Lapicero color negro de kuromi', 9550.000, NULL, 'lapizerokuromi.jpg', '2025-08-03 05:22:26','kuromi'),
(13, 'Bolso de Chococat', 'Un bonito bolso pequeño de Chococat', 48000.000, NULL, 'bolsocat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(14, 'Billetera Chococat', 'Una billetera adorable para llevar tu dinero', 15000.000, NULL, 'billeteracat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(15, 'Cosmetiquera Chococat', 'Amplia y cómoda cosmetiquera para tu maquillaje', 44000.000, NULL, 'cosmetiqueracat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(16, 'Crema corporal Chococat', 'Crema humectante y suave con olor a chocolate', 28000.000, NULL, 'cremacat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(17, 'Llavero Chococat', 'Un bonito y pequeño llavero', 12000.000, NULL, 'llaverocat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(18, 'Libreta Chococat', 'Una pequeña pero bonita libreta para tus apuntes', 29000.000, NULL, 'libretacat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(19, 'Funda Chococat', 'Una preciosa funda para tu teléfono', 38000.000, NULL, 'fundacat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(20, 'Taza Chococat', 'Una bonita taza para tu café en las mañanas', 69000.000, NULL, 'tazacat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(21, 'Kit Chococat', 'Pequeño kit para el colegio', 60000.000, NULL, 'kitcat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(22, 'Peluche Chococat', 'Tierno peluche de Chococat con camarita', 56000.000, NULL, 'peluchecat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(23, 'Armario Chococat', 'Un armario para organizar tus cositas', 100000.000, NULL, 'armariocat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(24, 'Lapicero Chococat', 'Lapicero color negro', 9000.000, NULL, 'lapicerocat.jpg', '2025-08-03 05:26:02', 'Chococat'),
(25, 'Tostadora Hello Kitty', 'Pequeña tostadora con forma de Hello Kitty para tostar panes y tostadas.', 60000.000, NULL, 'tostadora.jpg', '2025-08-04 00:31:38', 'Hello Kitty'),
(26, 'Cubiertos Hello Kitty', 'Unos cubiertos de Hello Kitty para comer con estilo.', 20000.000, NULL, 'cubiertos.jpg', '2025-08-04 00:31:38', 'Hello Kitty'),
(27, 'Loción Hello Kitty', 'Una pequeña loción de Hello Kitty para oler delicioso.', 20500.000, NULL, 'kittyLOCION.jpg', '2025-08-04 00:31:38', 'Hello Kitty'),
(28, 'Peluche Hello Kitty', 'Un peluche de Hello Kitty para decorar tu habitación.', 50000.000, NULL, 'kittyPELUCHE.jpg', '2025-08-04 00:31:38', 'Hello Kitty'),
(29, 'Lámpara Hello Kitty', 'Una pequeña lámpara de Hello Kitty para iluminar tu espacio.', 42000.000, NULL, 'kittyLAMPARA.jpeg', '2025-08-04 00:31:38', 'Hello Kitty'),
(30, 'Mouse Hello Kitty', 'Un mouse de Hello Kitty para jugar y divertirte.', 38000.000, NULL, 'kittyMOUSE.jpeg', '2025-08-04 00:31:38', 'Hello Kitty'),
(31, 'Toallas húmedas Hello Kitty', 'Unas toallas húmedas de Hello Kitty para limpiar y tener a mano.', 10000.000, NULL, 'kittyTOALLASHUMEDAS.jpeg', '2025-08-04 00:31:38', 'Hello Kitty'),
(32, 'Papelera Hello Kitty', 'Una linda papelera de Hello Kitty.', 18000.000, NULL, 'canecakitty.jpg', '2025-08-04 00:31:38', 'Hello Kitty'),
(33, 'Organizador Hello Kitty', 'Un lindo organizador para tu escritorio.', 38000.000, NULL, 'organizadorkitty.jpg', '2025-08-04 00:31:38', 'Hello Kitty'),
(34, 'Muñeco Cinnamoroll', 'Un adorable muñeco de peluche de Cinnamoroll para tu colección.', 38000.000, NULL, 'cinaPELUCHE.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(35, 'Cuaderno Cinnamoroll', 'Cuaderno de notas con un diseño exclusivo de Cinnamoroll, ideal para tus apuntes.', 20000.000, NULL, 'cinaCUADERNO.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(36, 'Kit Cinnamoroll', 'Kit completo de bolsos perfecto para estudiantes', 120000.000, NULL, 'cina.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(37, 'Camiseta Cinnamoroll', 'Una camiseta con estampado de Cinnamoroll, cómoda y moderna.', 28000.000, NULL, 'camisaCINNA.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(38, 'Chanclas Cinnamoroll', 'Unas hermosas chanclas con estampado de Cinnamoroll, cómodas y modernas.', 18000.000, NULL, 'cinaCHANCLAS.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(39, 'Cosmetiquera Cinnamoroll', 'Una cosmetiquera de Cinnamoroll, ideal para llevar tus productos de belleza.', 20000.000, NULL, 'cinaCOSMETIQUERA.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(40, 'Taza Cinnamoroll', 'Una taza perfecta para tu café.', 23000.000, NULL, 'cinaTAZA.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(41, 'Bálsamo labial Cinnamoroll', 'Un bálsamo para tus labios.', 5000.000, NULL, 'balsamocina.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(42, 'Libreta Cinnamoroll', 'Una pequeña pero bonita libreta para tus apuntes.', 29000.000, NULL, 'cuadernoCINA.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(43, 'Morral Cinnamoroll', 'Un hermoso morral perfecto para llevar tus cositas.', 58000.000, NULL, 'bolosocinna.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(44, 'Termo Cinnamoroll', 'Un bonito bolso termo para estar hidratado.', 40000.000, NULL, 'termocina.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(45, 'Gorra Cinnamoroll', 'Una gorra para los calores.', 20000.000, NULL, 'gorracina.jpg', '2025-08-04 00:33:02', 'Cinnamorol'),
(46, 'Muñecos Keroppi', 'Tres adorables muñecos de peluche de Keroppi para tu colección.', 78000.000, NULL, 'kePELUCHES.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(47, 'Cosmetiquera Keroppi', 'Cosmetiquera de Keroppi para llevar tus productos de belleza en cualquier lugar.', 20000.000, NULL, 'keCOSMETIQUERA.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(48, 'Bolso Keroppi', 'Bolso de mano con el diseño de Keroppi, ideal para salir con estilo.', 34000.000, NULL, 'keBOLSO.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(49, 'Sandalias Keroppi', 'Unas hermosas sandalias de Keroppi para disfrutar del verano.', 18000.000, NULL, 'keSANDALIAS.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(50, 'Cuaderno Keroppi', 'Un cuaderno de Keroppi para escribir tus pensamientos y recuerdos.', 20000.000, NULL, 'keCUADERNO.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(51, 'Kit estudiantil de Keroppi', 'Un kit estudiantil de Keroppi para aprender a manejar su rana.', 70000.000, NULL, 'keKIT.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(52, 'Organizador de Keroppi', 'Un organizador de Keroppi para llevar tus cosas en orden.', 25000.000, NULL, 'keORGANIZADOR.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(53, 'Lonchera de Keroppi', 'Una lonchera de Keroppi para llevar tus alimentos en un lugar seguro.', 45000.000, NULL, 'keLONCHERA.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(54, 'Set para lavado dental Keroppi', 'Un necesario set para tus pequeños a la hora del cepillado.', 30000.000, NULL, 'cepillokeropi.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(55, 'Llavero Keroppi', 'Un lindo llavero para tus bolsos o llaves.', 15000.000, NULL, 'llaverokeropi.jpg', '2025-08-04 00:33:51', 'Keroppi'),
(56, 'Muñeco My Melody', 'Un adorable muñeco de peluche de My Melody para tu colección.', 40000.000, NULL, 'meloPELUCHE.jpg', '2025-08-04 02:37:03', 'My Melody'),
(57, 'Cuaderno My Melody', 'Cuaderno de notas con un diseño exclusivo de My Melody, perfecto para tus apuntes.', 15000.000, NULL, 'meloCUADERNO.jpg', '2025-08-04 02:37:03', 'My Melody'),
(58, 'Bolso My Melody', 'Bolso de mano con el diseño de My Melody, ideal para salir con estilo.', 34000.000, NULL, 'meloBOLSO.jpg', '2025-08-04 02:37:03', 'My Melody'),
(59, 'Tenis My Melody', 'Unos tenis de My Melody para que puedas lucir con estilo.', 90000.000, NULL, 'meloZAPATOS.jpg', '2025-08-04 02:37:03', 'My Melody'),
(60, 'Termo My Melody', 'Un termo de My Melody para mantener tus bebidas calientes o frías.', 22000.000, NULL, 'melodyTERMO.jpg', '2025-08-04 02:37:03', 'My Melody'),
(61, 'Cosmetiquera My Melody', 'Una hermosa cosmetiquera de My Melody para tus productos de belleza.', 22000.000, NULL, 'meloCOSMETIQUERA.jpg', '2025-08-04 02:37:03', 'My Melody'),
(62, 'Organizador My Melody', 'Un organizador de My Melody para mantener tus pertenencias en orden.', 28000.000, NULL, 'meloORGANIZADOR.jpg', '2025-08-04 02:37:03', 'My Melody'),
(63, 'Peine My Melody', 'Un peine de My Melody para cuidar de tu cabello.', 14000.000, NULL, 'meloPEINE.jpg', '2025-08-04 02:37:03', 'My Melody'),
(64, 'Reloj My Melody', 'Un reloj de My Melody para que puedas estar a la hora.', 30000.000, NULL, 'meloRELOJ.jpg', '2025-08-04 02:37:03', 'My Melody'),
(65, 'Audífonos My Melody', 'Audífonos super cute.', 50000.000, NULL, 'audifonosmelody.jpg', '2025-08-04 02:37:03', 'My Melody'),
(66, 'Caja organizadora My Melody', 'Una caja super cómoda para organizar tus pertenencias.', 35000.000, NULL, 'cajamelody.jpg', '2025-08-04 02:37:03', 'My Melody'),
(67, 'Cuaderno My Melody', 'Lindo cuaderno para el colegio.', 28000.000, NULL, 'cuadernomelody.jpg', '2025-08-04 02:37:03', 'My Melody'),
(68, 'Muñeco Pochaco', 'Un adorable muñeco de peluche de Pochaco para tu colección.', 25000.000, NULL, 'poPELUCHE.jpg', '2025-08-19 01:37:22', 'Pochaco'),
(69, 'Cubiertos de Pochaco', 'Cubiertos de Pochaco para comer con estilo.', 23000.000, NULL, 'poCUBIERTOS.jpg', '2025-08-19 01:37:22', 'Pochaco'),
(70, 'Peine Pochaco', 'Peine de Pochaco para cuidar tu peluca.', 17000.000, NULL, 'poPEINE.jpg', '2025-08-19 01:37:22', 'Pochaco'),
(71, 'Sandalias Pochaco', 'Sandalias de Pochaco para el verano.', 18000.000, NULL, 'poSANDALIAS.jpg', '2025-08-19 01:37:22', 'Pochaco'),
(72, 'Estuche de cámara de Pochaco', 'Un estuche de cámara de Pochaco para proteger tu equipo.', 30000.000, NULL, 'poESTUCHECAMARA.jpg', '2025-08-19 01:37:22', 'Pochaco'),
(73, 'Termo de Pochaco', 'Termo Pochaco para llevar tu bebida.', 25000.000, NULL, 'poTERMO.jpg', '2025-08-19 01:37:22', 'Pochaco'),
(74, 'Funko Pop de Pochaco', 'Un adorable Funko Pop de Pochaco para tu colección.', 55000.000, NULL, 'poFUNKO.jpeg', '2025-08-19 20:39:46', 'Pochaco'),
(75, 'Carnet de Pochaco', 'Carnet de Pochaco para identificarte.', 18000.000, NULL, 'pochaco.jfif', '2025-08-19 20:41:08', 'Pochaco'),
(76, 'Set de escritorio', 'Un set de escritorio de Pochaco para trabajar en comodidad.', 34000.000, NULL, 'poSETESCRITORIO.jpeg', '2025-08-19 01:37:22', 'Pochaco'),
(77, 'Pantuflas Pochaco', 'Unas calientitas pantuflas para las frías mañanas.', 57000.000, NULL, 'pantuflaspochaco.jpg', '2025-08-19 01:37:22', 'Pochaco'),
(78, 'Muñeco Pompompurin', 'Un adorable muñeco de peluche de Pompompurin para tu colección.', 37000.000, NULL, 'pomPELUCHE.jpg', '2025-08-19 20:42:56', 'Pompompurin'),
(79, 'Monedero de Pompompurin', 'Monedero de Pompompurin para guardar tus pequeños tesoros.', 12000.000, NULL, 'pomMONEDERO.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(80, 'Bolso Pompompurin', 'Bolso de Pompompurin, ideal para salir con estilo.', 45000.000, NULL, 'pomBOLSO.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(81, 'Pinzas Pompompurin', 'Unas lindas pinzas para el cabello de Pompompurin.', 12000.000, NULL, 'pomPINZAS.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(82, 'Squishy Pompompurin', 'Un bonito squishy de Pompompurin para manejar tu estrés o ansiedad.', 15000.000, NULL, 'pomSQUISHY.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(83, 'Taza Pompompurin', 'Una taza de Pompompurin para disfrutar de tu café o té.', 28000.000, NULL, 'pomTAZA.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(84, 'Corta uñas Pompompurin', 'Unas corta uñas de Pompompurin para cuidar tus uñas.', 10000.000, NULL, 'pomCORTAUÑAS.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(85, 'Termo Pompompurin', 'Un lindo termo para llevar a la escuela o al trabajo.', 12000.000, NULL, 'pomTERMO.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(86, 'Organizador Pompompurin', 'Un bonito organizador para tu escritorio o mesa de trabajo.', 23000.000, NULL, 'pomORGANIZADOR.jpeg', '2025-08-19 05:00:44', 'Pompompurin'),
(87, 'Medias de Pompompurin', 'Set de 3 pares de medias para el diario.', 15000.000, NULL, 'mediaspompom.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(88, 'Morral Pompompurin', 'Un grande y espacioso morral para el colegio.', 90000.000, NULL, 'morralpompom.jpg', '2025-08-19 01:38:56', 'Pompompurin'),
(89, 'Libreta Chococat', 'Una pequeña pero bonita libreta para tus apuntes', 29000.000, NULL, 'libretacat.jpg', '2025-08-03 10:26:02', 'Chococat'),
(90, 'Funda Chococat', 'Una preciosa funda para tu teléfono', 38000.000, NULL, 'fundacat.jpg', '2025-08-03 10:26:02', 'Chococat'),
(91, 'Taza Chococat', 'Una bonita taza para tu café en las mañanas', 69000.000, NULL, 'tazacat.jpg', '2025-08-03 10:26:02', 'Chococat'),
(92, 'Kit Chococat', 'Pequeño kit para el colegio', 60000.000, NULL, 'kitcat.jpg', '2025-08-03 10:26:02', 'Chococat'),
(93, 'Peluche Chococat', 'Tierno peluche de Chococat con camarita', 56000.000, NULL, 'peluchecat.jpg', '2025-08-03 10:26:02', 'Chococat'),
(94, 'Armario Chococat', 'Un armario para organizar tus cositas', 100000.000, NULL, 'armariocat.jpg', '2025-08-03 10:26:02', 'Chococat'),
(95, 'Lapicero Chococat', 'Lapicero color negro', 9000.000, NULL, 'lapicerocat.jpg', '2025-08-03 10:26:02', 'Chococat'),
(96, 'Tostadora Hello Kitty', 'Pequeña tostadora con forma de Hello Kitty para tostar panes y tostadas.', 60000.000, NULL, 'tostadora.jpg', '2025-08-04 05:31:38', 'Hello Kitty'),
(97, 'Funko pop de Hello Kitty', 'Un Funko pop de Hello Kitty para decorar tu espacio.', 35000.000, NULL, 'funkokitty.png', '2025-08-04 05:31:38', 'Hello Kitty'),
(98, 'Cubiertos Hello Kitty', 'Unos cubiertos de Hello Kitty para comer con estilo.', 20000.000, NULL, 'cubiertos.jpg', '2025-08-04 05:31:38', 'Hello Kitty'),
(99, 'Loción Hello Kitty', 'Una pequeña loción de Hello Kitty para oler delicioso.', 20500.000, NULL, 'kittyLOCION.jpg', '2025-08-04 05:31:38', 'Hello Kitty'),
(100, 'Peluche Hello Kitty', 'Un peluche de Hello Kitty para decorar tu habitación.', 50000.000, NULL, 'kittyPELUCHE.jpg', '2025-08-04 05:31:38', 'Hello Kitty'),
(101, 'Lámpara Hello Kitty', 'Una pequeña lámpara de Hello Kitty para iluminar tu espacio.', 42000.000, NULL, 'kittyLAMPARA.jpeg', '2025-08-04 05:31:38', 'Hello Kitty'),
(102, 'Mouse Hello Kitty', 'Un mouse de Hello Kitty para jugar y divertirte.', 38000.000, NULL, 'kittyMOUSE.jpeg', '2025-08-04 05:31:38', 'Hello Kitty'),
(103, 'Toallas húmedas Hello Kitty', 'Unas toallas húmedas de Hello Kitty para limpiar y tener a mano.', 10000.000, NULL, 'kittyTOALLASHUMEDAS.jpeg', '2025-08-04 05:31:38', 'Hello Kitty'),
(104, 'Papelera Hello Kitty', 'Una linda papelera de Hello Kitty.', 18000.000, NULL, 'canecakitty.jpg', '2025-08-04 05:31:38', 'Hello Kitty'),
(105, 'Organizador Hello Kitty', 'Un lindo organizador para tu escritorio.', 38000.000, NULL, 'organizadorkitty.jpg', '2025-08-04 05:31:38', 'Hello Kitty');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` tinyint(4) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol_id`, `nombre_rol`, `descripcion`, `estado`, `fecha_creacion`, `ultima_actualizacion`) VALUES
(1, 'Usuario', 'Usuario regular del sistema', 'activo', '2025-08-03 04:12:08', '2025-08-03 04:12:08'),
(2, 'Administrador', 'Administrador del sistema', 'activo', '2025-08-03 04:12:08', '2025-08-03 04:12:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` tinyint(4) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol_id` tinyint(4) NOT NULL DEFAULT 2,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre_usuario`, `correo`, `email_verified_at`, `remember_token`, `contrasena`, `rol_id`, `ultima_actualizacion`) VALUES
(3, 'val callejas', 'valery12callejas@gmail.com', '2025-08-19 19:54:34', NULL, '$2y$12$oON6Uc4AJw4YzXuFJrxhseCjP7C4stQ3uBvO3wNwkx2cEvkuK9ARu',  2, '2025-08-19 19:54:44'),
(4, 'juan', 'pologel790@colimarl.com', NULL, NULL, '$2y$12$mt/imC.RCEcWQPO2Wqx5OupD4FeL9AkddqnGo.6Kksyvpfa.BTy5C',  1, '2025-08-20 00:53:22'),
(5, 'hola', 'maped42047@baxidy.com', NULL, NULL, '$2y$12$1QnjBL7EDo4SVjcYXMsVQ..CMvEKLq2lxZfcKUYf8tBCcCpfsfpGK', 1, '2025-08-20 00:59:51'),
(6, 'aa', 'jedine9679@colimarl.com', NULL, NULL, '$2y$12$nPwlnhSG.fhUEwNfUsZeqeFOwmeysOF0O6lSXpHoDGS1zTe8qgUam', 1, '2025-08-20 01:02:51'),
(7, 'juan', 'witif37493@baxidy.com', NULL, NULL, '$2y$12$iBt0UyA2JizV/evyxxyqc.ssomInowskRIh8OfuW73czG9PaDIu8G', 1, '2025-08-20 01:08:57'),
(8, 'Juan david Restrepo Muñoz', 'heavenorck2@gmail.com', NULL, NULL, '$2y$12$qHbMzyRleILxLCCMyqKuquCO2A6oVHF0nBWkfbrjvm11nFv3HA4ay', 1, '2025-08-20 01:11:25'),
(9, 'aa', 'wohabi3645@colimarl.com', NULL, NULL, '$2y$12$8.XDb6YgljR7pR/nVSNRzOFGjNlc4EU9BMH41BSO0NRwCgHOK4aZe', 1, '2025-08-20 01:23:43'),
(20, 'aasasas', 'dogay67052@baxidy.com', NULL, NULL, '$2y$12$BekEdfitPL/HdgVUpof4veBrm1A4k9UBGG4A1kGmk8AiIXnXwuXp2', 1, '2025-08-20 02:32:16'),
(21, 'asasas', 'tifavi5356@baxidy.com', NULL, NULL, '$2y$12$UGsYN.LZ./Y31WmFLsZzBOel4uDp/RvuSQyK2DLa0HWTl4MyIbRHu', 1, '2025-08-20 02:40:00'),
(22, 'anal', 'nasiv48913@colimarl.com', NULL, NULL, '$2y$12$OcILYGfFcgunzRM5KyxHv.vdY9OoRRafz/N.7N1YrS0rPWT1p5wfm', 1, '2025-08-20 02:43:45'),
(23, 'siu', 'yigatek127@ahanim.com', NULL, NULL, '$2y$12$ZBdhJIvFhikozUulF6bD.ufSsymnr4dR6pS6JjA1wA.ZRXoslVeEW', 1, '2025-08-24 02:24:38'),
(24, 'siu', 'widece6420@ahanim.com', NULL, NULL, '$2y$12$13PCQg6YY2iyWV2C/BZ7uuKzZTygioswD9v/BcPUqVUYbXbHtfjz.', 1, '2025-08-24 02:30:59'),
(25, 'siuu', 'petoce7168@ahanim.com', '2025-08-24 02:40:04', NULL, '$2y$12$g2LuSJBg9hbvMstf6ILwI./cb5ZgakK5Bwrro5fJ5OwtRqQDrVoPO', 1, '2025-08-23 21:40:04'),
(26, 'isa', 'cxomgqk443@tormails.com', '2025-08-26 00:36:00', NULL, '$2y$12$fyZEzfQeCSpMxtwLysVzM.7MMwgIawJmiwW8RBmlCt7gyIrmtsul.', 1, '2025-08-25 19:36:00'),
(27, 'jsajsja', 'gefali5579@ahanim.com', NULL, NULL, '$2y$12$kbTQPXTH3.pZcw6Tzm6PE.TXihKuJsW2j1NxN4r.Y3il6uH3s4Q/q', 1, '2025-08-26 01:33:00'),
(28, 'juanda', 'vopef28234@ahanim.com', NULL, NULL, '$2y$12$fvdnyS91dnswrmzmVUhpx.57uhQZ4qqM9d4Wvik0Ski9Qx.DZhsEO', 1, '2025-08-26 01:34:26'),
(29, 'pendol', 'baxobo9756@ahanim.com', NULL, NULL, '$2y$12$B8aBwmtkN04i2HSb0TyzCuudhVImGSAAhLk/ZvjGAv631dupCZVje', 1, '2025-08-26 01:36:22'),
(30, 'anaxa', 'rowohod748@ahanim.com', NULL, NULL, '$2y$12$HwmXYg44XRlp3EpHj66UBOK78KpnAZCVSg../EIKNkEDlTwlhL1iu', 1, '2025-08-26 01:38:45'),
(31, 'parra', 'parra@gamilc.com', NULL, NULL, '$2y$12$T552ke3S7utZaQpEsxDH4.R7455SVAX9GX/lTGfihLq6OZmMa4/sS', 1, '2025-08-26 01:41:15'),
(32, 'juanperez', 'juanperez@gmail.com', NULL, NULL, '$2y$12$tj/VovUJubCsaGkTMXKOue13YilbXiEEq0v/SpEkuHFsLY6FdPPQC', 1, '2025-08-26 02:29:17'),
(33, 'LUIS FERNANDO CALLEJAS', 'g5kyaeoh8u@daouse.com', NULL, NULL, '$2y$12$Mq0l1ggZRKc3KlDfGFncUO19NW1AzylKyqTStyPmChx8NtFyI.s5u', 1, '2025-08-26 09:53:24'),
(34, 'szs', 'lelit65173@ahanim.com', NULL, NULL, '$2y$12$ostTLqTVH1NNdtxPXL4TKuBcdLZSdO4SdkcLslfcYDNtT5MYxm/KC', 1, '2025-08-27 01:46:13'),
(35, 'szs', 'yovah78564@ahanim.com', '2025-08-27 01:58:13', NULL, '$2y$12$PYE9tqCmutHhNpIhbomUCuwfj.yPhlMYhrybswUkSCa5zohjXI/SC', 1, '2025-08-26 20:58:13');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  ADD PRIMARY KEY (`carrito_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  ADD UNIQUE KEY `nombre_categoria` (`nombre_categoria`),
  ADD KEY `idx_nombre_categoria` (`nombre_categoria`);

--
-- Indices de la tabla `comentarios_pedidos`
--
ALTER TABLE `comentarios_pedidos`
  ADD PRIMARY KEY (`comentario_id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `comentarios_productos`
--
ALTER TABLE `comentarios_productos`
  ADD PRIMARY KEY (`comentario_id`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `detalles_facturas`
--
ALTER TABLE `detalles_facturas`
  ADD PRIMARY KEY (`detalle_factura_id`),
  ADD KEY `factura_id` (`factura_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD PRIMARY KEY (`detalle_pedido_id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`factura_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `metodo_pago_id` (`metodo_pago_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`inventario_id`),
  ADD UNIQUE KEY `producto_id` (`producto_id`),
  ADD KEY `idx_producto_id` (`producto_id`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metodos_envio`
--
ALTER TABLE `metodos_envio`
  ADD PRIMARY KEY (`metodo_envio_id`);

--
-- Indices de la tabla `metodos_pago`
--
ALTER TABLE `metodos_pago`
  ADD PRIMARY KEY (`metodo_pago_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedido_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `metodo_pago_id` (`metodo_pago_id`),
  ADD KEY `metodo_envio_id` (`metodo_envio_id`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);





--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`),
  ADD KEY `idx_nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `usuarios_correo_unique` (`correo`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  MODIFY `carrito_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  MODIFY `categoria_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `comentarios_pedidos`
--
ALTER TABLE `comentarios_pedidos`
  MODIFY `comentario_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentarios_productos`
--
ALTER TABLE `comentarios_productos`
  MODIFY `comentario_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles_facturas`
--
ALTER TABLE `detalles_facturas`
  MODIFY `detalle_factura_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  MODIFY `detalle_pedido_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `factura_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `inventario_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodos_envio`
--
ALTER TABLE `metodos_envio`
  MODIFY `metodo_envio_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodos_pago`
--
ALTER TABLE `metodos_pago`
  MODIFY `metodo_pago_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedido_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `producto_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  ADD CONSTRAINT `carrito_compras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `carrito_compras_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`);

--
-- Filtros para la tabla `comentarios_pedidos`
--
ALTER TABLE `comentarios_pedidos`
  ADD CONSTRAINT `comentarios_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`),
  ADD CONSTRAINT `comentarios_pedidos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `comentarios_productos`
--
ALTER TABLE `comentarios_productos`
  ADD CONSTRAINT `comentarios_productos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`),
  ADD CONSTRAINT `comentarios_productos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `detalles_facturas`
--
ALTER TABLE `detalles_facturas`
  ADD CONSTRAINT `detalles_facturas_ibfk_1` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`factura_id`),
  ADD CONSTRAINT `detalles_facturas_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`);

--
-- Filtros para la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD CONSTRAINT `detalles_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`),
  ADD CONSTRAINT `detalles_pedidos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`);

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodos_pago` (`metodo_pago_id`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodos_pago` (`metodo_pago_id`),
  ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`metodo_envio_id`) REFERENCES `metodos_envio` (`metodo_envio_id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_productos` (`categoria_id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
