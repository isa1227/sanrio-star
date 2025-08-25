-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-08-2025 a las 00:42:32
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

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `categoria_id` bigint(20) UNSIGNED NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`categoria_id`, `nombre_categoria`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Películas', 'Películas de Sanrio', NULL, NULL),
(2, 'Series', 'Series de Sanrio', NULL, NULL),
(3, 'Música', 'Música de Sanrio', NULL, NULL),
(4, 'Merchandising', 'Productos de merchandising', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_productos`
--

CREATE TABLE `categorias_productos` (
  `categoria_id` tinyint(4) NOT NULL,
  `nombre_categoria` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(6, '2024_01_01_000003_create_categorias_table', 3);

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
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `producto_id` tinyint(4) NOT NULL,
  `nombre_producto` varchar(255) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `precio` decimal(10,3) NOT NULL,
  `categoria_id` tinyint(4) DEFAULT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`producto_id`, `nombre_producto`, `descripcion`, `precio`, `categoria_id`, `url_imagen`, `ultima_actualizacion`) VALUES
(1, 'Jabonera Kuromi', 'Una jabonera con la imagen de Kuromi', 12000.000, NULL, 'JABONERAkuromi.jpg', '2025-08-03 05:22:26'),
(2, 'Peluche Kuromi', 'Un hermoso y adorable peluche de Kuromi', 30000.000, NULL, 'peluchekurumi.jpg', '2025-08-03 05:22:26'),
(3, 'Bolso Kuromi', 'Bolso de Kuromi, ideal para salir con estilo.', 69000.000, NULL, 'kuBOLSO.jpg', '2025-08-03 05:22:26'),
(4, 'Abanico Kuromi', 'Un hermoso abanico con la imagen de Kuromi', 11000.000, NULL, 'kuABANICO.jpg', '2025-08-03 05:22:26'),
(5, 'Calculadora Kuromi', 'Una calculadora con estilo', 27000.000, NULL, 'kuCALCULADORA.jpg', '2025-08-03 05:22:26'),
(6, 'Manilla de Kuromi', 'Una preciosa manilla de Kuromi', 10000.000, NULL, 'kuMANILLA.jpg', '2025-08-03 05:22:26'),
(7, 'Peine de Kuromi', 'Un peine para que puedas peinar tu cabello.', 17000.000, NULL, 'kuPEINE.jpg', '2025-08-03 05:22:26'),
(8, 'Cartera Kuromi', 'Una cartera adorable para llevar tus cosas', 23000.000, NULL, 'kuCARTERA.jpg', '2025-08-03 05:22:26'),
(9, 'Papelera Kuromi', 'Una linda papelera de Kuromi', 18000.000, NULL, 'kuPAPELERA.jpg', '2025-08-03 05:22:26'),
(10, 'Balsamo de Kuromi', 'Un suave y bonito balsamo con estuche de kuromi', 9000.000, NULL, 'balsamokuromi.jpg', '2025-08-03 05:22:26'),
(11, 'Bolsa pequeña de Kuromi', 'Bolsa pequeña de kuromi', 23000.000, NULL, 'bolsakuromi.jpg', '2025-08-03 05:22:26'),
(12, 'Lapicero de Kuromi', 'Lapicero color negro de kuromi', 9550.000, NULL, 'lapizerokuromi.jpg', '2025-08-03 05:22:26'),
(13, 'Bolso de Chococat', 'Un bonito bolso pequeño de Chococat', 48000.000, NULL, 'bolsocat.jpg', '2025-08-03 05:26:02'),
(14, 'Billetera Chococat', 'Una billetera adorable para llevar tu dinero', 15000.000, NULL, 'billeteracat.jpg', '2025-08-03 05:26:02'),
(15, 'Cosmetiquera Chococat', 'Amplia y cómoda cosmetiquera para tu maquillaje', 44000.000, NULL, 'cosmetiqueracat.jpg', '2025-08-03 05:26:02'),
(16, 'Crema corporal Chococat', 'Crema humectante y suave con olor a chocolate', 28000.000, NULL, 'cremacat.jpg', '2025-08-03 05:26:02'),
(17, 'Llavero Chococat', 'Un bonito y pequeño llavero', 12000.000, NULL, 'llaverocat.jpg', '2025-08-03 05:26:02'),
(18, 'Libreta Chococat', 'Una pequeña pero bonita libreta para tus apuntes', 29000.000, NULL, 'libretacat.jpg', '2025-08-03 05:26:02'),
(19, 'Funda Chococat', 'Una preciosa funda para tu teléfono', 38000.000, NULL, 'fundacat.jpg', '2025-08-03 05:26:02'),
(20, 'Taza Chococat', 'Una bonita taza para tu café en las mañanas', 69000.000, NULL, 'tazacat.jpg', '2025-08-03 05:26:02'),
(21, 'Kit Chococat', 'Pequeño kit para el colegio', 60000.000, NULL, 'kitcat.jpg', '2025-08-03 05:26:02'),
(22, 'Peluche Chococat', 'Tierno peluche de Chococat con camarita', 56000.000, NULL, 'peluchecat.jpg', '2025-08-03 05:26:02'),
(23, 'Armario Chococat', 'Un armario para organizar tus cositas', 100000.000, NULL, 'armariocat.jpg', '2025-08-03 05:26:02'),
(24, 'Lapicero Chococat', 'Lapicero color negro', 9000.000, NULL, 'lapicerocat.jpg', '2025-08-03 05:26:02'),
(25, 'Tostadora Hello Kitty', 'Pequeña tostadora con forma de Hello Kitty para tostar panes y tostadas.', 60000.000, NULL, 'tostadora.jpg', '2025-08-04 00:31:38'),
(26, 'Cubiertos Hello Kitty', 'Unos cubiertos de Hello Kitty para comer con estilo.', 20000.000, NULL, 'cubiertos.jpg', '2025-08-04 00:31:38'),
(27, 'Loción Hello Kitty', 'Una pequeña loción de Hello Kitty para oler delicioso.', 20500.000, NULL, 'kittyLOCION.jpg', '2025-08-04 00:31:38'),
(28, 'Peluche Hello Kitty', 'Un peluche de Hello Kitty para decorar tu habitación.', 50000.000, NULL, 'kittyPELUCHE.jpg', '2025-08-04 00:31:38'),
(29, 'Lámpara Hello Kitty', 'Una pequeña lámpara de Hello Kitty para iluminar tu espacio.', 42000.000, NULL, 'kittyLAMPARA.jpeg', '2025-08-04 00:31:38'),
(30, 'Mouse Hello Kitty', 'Un mouse de Hello Kitty para jugar y divertirte.', 38000.000, NULL, 'kittyMOUSE.jpeg', '2025-08-04 00:31:38'),
(31, 'Toallas húmedas Hello Kitty', 'Unas toallas húmedas de Hello Kitty para limpiar y tener a mano.', 10000.000, NULL, 'kittyTOALLASHUMEDAS.jpeg', '2025-08-04 00:31:38'),
(32, 'Papelera Hello Kitty', 'Una linda papelera de Hello Kitty.', 18000.000, NULL, 'canecakitty.jpg', '2025-08-04 00:31:38'),
(33, 'Organizador Hello Kitty', 'Un lindo organizador para tu escritorio.', 38000.000, NULL, 'organizadorkitty.jpg', '2025-08-04 00:31:38'),
(34, 'Muñeco Cinnamoroll', 'Un adorable muñeco de peluche de Cinnamoroll para tu colección.', 38000.000, NULL, 'cinaPELUCHE.jpg', '2025-08-04 00:33:02'),
(35, 'Cuaderno Cinnamoroll', 'Cuaderno de notas con un diseño exclusivo de Cinnamoroll, ideal para tus apuntes.', 20000.000, NULL, 'cinaCUADERNO.jpg', '2025-08-04 00:33:02'),
(36, 'Kit Cinnamoroll', 'Kit completo de bolsos perfecto para estudiantes', 120000.000, NULL, 'cina.jpg', '2025-08-04 00:33:02'),
(37, 'Camiseta Cinnamoroll', 'Una camiseta con estampado de Cinnamoroll, cómoda y moderna.', 28000.000, NULL, 'camisaCINNA.jpg', '2025-08-04 00:33:02'),
(38, 'Chanclas Cinnamoroll', 'Unas hermosas chanclas con estampado de Cinnamoroll, cómodas y modernas.', 18000.000, NULL, 'cinaCHANCLAS.jpg', '2025-08-04 00:33:02'),
(39, 'Cosmetiquera Cinnamoroll', 'Una cosmetiquera de Cinnamoroll, ideal para llevar tus productos de belleza.', 20000.000, NULL, 'cinaCOSMETIQUERA.jpg', '2025-08-04 00:33:02'),
(40, 'Taza Cinnamoroll', 'Una taza perfecta para tu café.', 23000.000, NULL, 'cinaTAZA.jpg', '2025-08-04 00:33:02'),
(41, 'Bálsamo labial Cinnamoroll', 'Un bálsamo para tus labios.', 5000.000, NULL, 'balsamocina.jpg', '2025-08-04 00:33:02'),
(42, 'Libreta Cinnamoroll', 'Una pequeña pero bonita libreta para tus apuntes.', 29000.000, NULL, 'cuadernoCINA.jpg', '2025-08-04 00:33:02'),
(43, 'Morral Cinnamoroll', 'Un hermoso morral perfecto para llevar tus cositas.', 58000.000, NULL, 'bolosocinna.jpg', '2025-08-04 00:33:02'),
(44, 'Termo Cinnamoroll', 'Un bonito bolso termo para estar hidratado.', 40000.000, NULL, 'termocina.jpg', '2025-08-04 00:33:02'),
(45, 'Gorra Cinnamoroll', 'Una gorra para los calores.', 20000.000, NULL, 'gorracina.jpg', '2025-08-04 00:33:02'),
(46, 'Muñecos Keroppi', 'Tres adorables muñecos de peluche de Keroppi para tu colección.', 78000.000, NULL, 'cinnamonrol.jpg', '2025-08-04 00:33:51'),
(47, 'Cosmetiquera Keroppi', 'Cosmetiquera de Keroppi para llevar tus productos de belleza en cualquier lugar.', 20000.000, NULL, 'keCOSMETIQUERA.jpg', '2025-08-04 00:33:51'),
(48, 'Bolso Keroppi', 'Bolso de mano con el diseño de Keroppi, ideal para salir con estilo.', 34000.000, NULL, 'keBOLSO.jpg', '2025-08-04 00:33:51'),
(49, 'Sandalias Keroppi', 'Unas hermosas sandalias de Keroppi para disfrutar del verano.', 18000.000, NULL, 'keSANDALIAS.jpg', '2025-08-04 00:33:51'),
(50, 'Cuaderno Keroppi', 'Un cuaderno de Keroppi para escribir tus pensamientos y recuerdos.', 20000.000, NULL, 'keCUADERNO.jpg', '2025-08-04 00:33:51'),
(51, 'Kit estudiantil de Keroppi', 'Un kit estudiantil de Keroppi para aprender a manejar su rana.', 70000.000, NULL, 'keKIT.jpg', '2025-08-04 00:33:51'),
(52, 'Organizador de Keroppi', 'Un organizador de Keroppi para llevar tus cosas en orden.', 25000.000, NULL, 'keORGANIZADOR.jpg', '2025-08-04 00:33:51'),
(53, 'Lonchera de Keroppi', 'Una lonchera de Keroppi para llevar tus alimentos en un lugar seguro.', 45000.000, NULL, 'keLONCHERA.jpg', '2025-08-04 00:33:51'),
(54, 'Set para lavado dental Keroppi', 'Un necesario set para tus pequeños a la hora del cepillado.', 30000.000, NULL, 'cepillokeropi.jpg', '2025-08-04 00:33:51'),
(55, 'Llavero Keroppi', 'Un lindo llavero para tus bolsos o llaves.', 15000.000, NULL, 'llaverokeropi.jpg', '2025-08-04 00:33:51'),
(56, 'Muñeco My Melody', 'Un adorable muñeco de peluche de My Melody para tu colección.', 40000.000, NULL, 'meloPELUCHE.jpg', '2025-08-04 02:37:03'),
(57, 'Cuaderno My Melody', 'Cuaderno de notas con un diseño exclusivo de My Melody, perfecto para tus apuntes.', 15000.000, NULL, 'meloCUADERNO.jpg', '2025-08-04 02:37:03'),
(58, 'Bolso My Melody', 'Bolso de mano con el diseño de My Melody, ideal para salir con estilo.', 34000.000, NULL, 'meloBOLSO.jpg', '2025-08-04 02:37:03'),
(59, 'Tenis My Melody', 'Unos tenis de My Melody para que puedas lucir con estilo.', 90000.000, NULL, 'meloZAPATOS.jpg', '2025-08-04 02:37:03'),
(60, 'Termo My Melody', 'Un termo de My Melody para mantener tus bebidas calientes o frías.', 22000.000, NULL, 'melodyTERMO.jpg', '2025-08-04 02:37:03'),
(61, 'Cosmetiquera My Melody', 'Una hermosa cosmetiquera de My Melody para tus productos de belleza.', 22000.000, NULL, 'meloCOSMETIQUERA.jpg', '2025-08-04 02:37:03'),
(62, 'Organizador My Melody', 'Un organizador de My Melody para mantener tus pertenencias en orden.', 28000.000, NULL, 'meloORGANIZADOR.jpg', '2025-08-04 02:37:03'),
(63, 'Peine My Melody', 'Un peine de My Melody para cuidar de tu cabello.', 14000.000, NULL, 'meloPEINE.jpg', '2025-08-04 02:37:03'),
(64, 'Reloj My Melody', 'Un reloj de My Melody para que puedas estar a la hora.', 30000.000, NULL, 'meloRELOJ.jpg', '2025-08-04 02:37:03'),
(65, 'Audífonos My Melody', 'Audífonos super cute.', 50000.000, NULL, 'audifonosmelody.jpg', '2025-08-04 02:37:03'),
(66, 'Caja organizadora My Melody', 'Una caja super cómoda para organizar tus pertenencias.', 35000.000, NULL, 'cajamelody.jpg', '2025-08-04 02:37:03'),
(67, 'Cuaderno My Melody', 'Lindo cuaderno para el colegio.', 28000.000, NULL, 'cuadernomelody.jpg', '2025-08-04 02:37:03'),
(68, 'Muñeco Pochaco', 'Un adorable muñeco de peluche de Pochaco para tu colección.', 25000.000, NULL, 'poPELUCHE.jpg', '2025-08-04 02:43:58'),
(69, 'Cubiertos de Pochaco', 'Cubiertos de Pochaco para comer con estilo.', 23000.000, NULL, 'poCUBIERTOS.jpg', '2025-08-04 02:43:58'),
(70, 'Peine Pochaco', 'Peine de Pochaco para cuidar tu peluca.', 17000.000, NULL, 'poPEINE.jpg', '2025-08-04 02:43:58'),
(71, 'Sandalias Pochaco', 'Sandalias de Pochaco para el verano.', 18000.000, NULL, 'poSANDALIAS.jpg', '2025-08-04 02:43:58'),
(72, 'Estuche de cámara de Pochaco', 'Un estuche de cámara de Pochaco para proteger tu equipo.', 30000.000, NULL, 'poESTUCHECAMARA.jpg', '2025-08-04 02:43:58'),
(73, 'Termo de Pochaco', 'Termo Pochaco para llevar tu bebida.', 25000.000, NULL, 'poTERMO.jpg', '2025-08-04 02:43:58'),
(74, 'Funko Pop de Pochaco', 'Un adorable Funko Pop de Pochaco para tu colección.', 55000.000, NULL, 'poFUNKO.jpg', '2025-08-04 02:43:58'),
(75, 'Carnet de Pochaco', 'Carnet de Pochaco para identificarte.', 18000.000, NULL, 'pochaco.jpg', '2025-08-04 02:43:58'),
(76, 'Set de escritorio', 'Un set de escritorio de Pochaco para trabajar en comodidad.', 34000.000, NULL, 'poSETESCRITORIO.jpeg', '2025-08-04 02:43:58'),
(77, 'Pantuflas Pochaco', 'Unas calientitas pantuflas para las frías mañanas.', 57000.000, NULL, 'pantuflaspochaco.jpg', '2025-08-04 02:43:58'),
(78, 'Muñeco Pompompurin', 'Un adorable muñeco de peluche de Pompompurin para tu colección.', 37000.000, NULL, 'pomPELUCHE.jpg', '2025-08-04 02:50:06'),
(79, 'Monedero de Pompompurin', 'Monedero de Pompompurin para guardar tus pequeños tesoros.', 12000.000, NULL, 'pomMONEDERO.jpg', '2025-08-04 02:50:06'),
(80, 'Bolso Pompompurin', 'Bolso de Pompompurin, ideal para salir con estilo.', 45000.000, NULL, 'pomBOLSO.jpg', '2025-08-04 02:50:06'),
(81, 'Pinzas Pompompurin', 'Unas lindas pinzas para el cabello de Pompompurin.', 12000.000, NULL, 'pomPINZAS.jpg', '2025-08-04 02:50:06'),
(82, 'Squishy Pompompurin', 'Un bonito squishy de Pompompurin para manejar tu estrés o ansiedad.', 15000.000, NULL, 'pomSQUISHY.jpg', '2025-08-04 02:50:06'),
(83, 'Taza Pompompurin', 'Una taza de Pompompurin para disfrutar de tu café o té.', 28000.000, NULL, 'pomTAZA.jpg', '2025-08-04 02:50:06'),
(84, 'Corta uñas Pompompurin', 'Unas corta uñas de Pompompurin para cuidar tus uñas.', 10000.000, NULL, 'pomCORTAUÑAS.jpg', '2025-08-04 02:50:06'),
(85, 'Termo Pompompurin', 'Un lindo termo para llevar a la escuela o al trabajo.', 12000.000, NULL, 'pomTERMO.jpg', '2025-08-04 02:50:06'),
(86, 'Organizador Pompompurin', 'Un bonito organizador para tu escritorio o mesa de trabajo.', 23000.000, NULL, 'pomORGANIZADOR.jpg', '2025-08-04 02:50:06'),
(87, 'Medias de Pompompurin', 'Set de 3 pares de medias para el diario.', 15000.000, NULL, 'mediaspompom.jpg', '2025-08-04 02:50:06'),
(88, 'Morral Pompompurin', 'Un grande y espacioso morral para el colegio.', 90000.000, NULL, 'morralpompom.jpg', '2025-08-04 02:50:06');

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
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` tinyint(4) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `direccion_envio` varchar(100) DEFAULT NULL,
  `direccion_facturacion` varchar(100) DEFAULT NULL,
  `rol_id` tinyint(4) NOT NULL DEFAULT 2,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre_usuario`, `correo`, `contrasena`, `direccion_envio`, `direccion_facturacion`, `rol_id`, `ultima_actualizacion`) VALUES
(3, 'val callejas', 'valery12callejas@gmail.com', '$2y$12$oON6Uc4AJw4YzXuFJrxhseCjP7C4stQ3uBvO3wNwkx2cEvkuK9ARu', NULL, NULL, 2, '2025-08-03 04:41:21'),
(4, 'Lorena Correa', 'correa@gmail.com', '$2y$12$SOurq0AWRsaJpAr6k0v10uKTTybwJMcLquKAOB0v6gcKMtSMK7CYK', NULL, NULL, 1, '2025-08-15 03:08:34');

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
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indices de la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  ADD PRIMARY KEY (`categoria_id`),
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
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`producto_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`),
  ADD KEY `idx_nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `correo` (`correo`),
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
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `categoria_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  MODIFY `categoria_id` tinyint(4) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedido_id` tinyint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `producto_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
