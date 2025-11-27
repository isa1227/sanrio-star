-- === Configuración inicial (opcional pero recomendado) ===
SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

-- =========================================================
-- Tablas base
-- =========================================================

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `roles` (
  `rol_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`rol_id`),
  UNIQUE KEY `nombre_rol` (`nombre_rol`),
  KEY `idx_nombre_rol` (`nombre_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usuarios` (
  `usuario_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `direccion_envio` varchar(100) DEFAULT NULL,
  `direccion_facturacion` varchar(100) DEFAULT NULL,
  `rol_id` tinyint(4) NOT NULL DEFAULT 2,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `correo` (`correo`),
  KEY `rol_id` (`rol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `categorias` (
  `categoria_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `categorias_productos` (
  `categoria_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`categoria_id`),
  UNIQUE KEY `nombre_categoria` (`nombre_categoria`),
  KEY `idx_nombre_categoria` (`nombre_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `metodos_pago` (
  `metodo_pago_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `nombre_metodo` varchar(100) NOT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`metodo_pago_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `metodos_envio` (
  `metodo_envio_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `nombre_metodo` varchar(100) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`metodo_envio_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================================================
-- Tablas de negocio
-- =========================================================

CREATE TABLE `productos` (
  `producto_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(255) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `precio` decimal(10,3) NOT NULL,
  `categoria_id` tinyint(4) DEFAULT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`producto_id`),
  KEY `categoria_id` (`categoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `carrito_compras` (
  `carrito_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `usuario_id` tinyint(4) NOT NULL,
  `producto_id` tinyint(4) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `agregado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`carrito_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `producto_id` (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `pedidos` (
  `pedido_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `usuario_id` tinyint(4) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `total_productos` int(11) DEFAULT 0,
  `costo_envio` decimal(10,2) DEFAULT 0.00,
  `metodo_envio_id` tinyint(4) DEFAULT NULL,
  `metodo_pago_id` tinyint(4) DEFAULT NULL,
  `estado` enum('Pendiente','Enviando','Completado','Cancelado') DEFAULT 'Pendiente',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`pedido_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `metodo_pago_id` (`metodo_pago_id`),
  KEY `metodo_envio_id` (`metodo_envio_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `comentarios_pedidos` (
  `comentario_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `pedido_id` tinyint(4) NOT NULL,
  `usuario_id` tinyint(4) NOT NULL,
  `comentario` text NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`comentario_id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `comentarios_productos` (
  `comentario_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `producto_id` tinyint(4) DEFAULT NULL,
  `usuario_id` tinyint(4) DEFAULT NULL,
  `comentario` text NOT NULL,
  `calificacion` int(11) DEFAULT NULL CHECK (`calificacion` >= 1 and `calificacion` <= 5),
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`comentario_id`),
  KEY `producto_id` (`producto_id`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `facturas` (
  `factura_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `usuario_id` tinyint(4) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10,2) NOT NULL,
  `metodo_pago_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`factura_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `metodo_pago_id` (`metodo_pago_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `detalles_facturas` (
  `detalle_factura_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `factura_id` tinyint(4) NOT NULL,
  `producto_id` tinyint(4) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`detalle_factura_id`),
  KEY `factura_id` (`factura_id`),
  KEY `producto_id` (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `detalles_pedidos` (
  `detalle_pedido_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `pedido_id` tinyint(4) DEFAULT NULL,
  `producto_id` tinyint(4) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`detalle_pedido_id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `inventario` (
  `inventario_id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` tinyint(4) NOT NULL,
  `cantidad` int(11) NOT NULL CHECK (`cantidad` >= 0),
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventario_id`),
  UNIQUE KEY `producto_id` (`producto_id`),
  KEY `idx_producto_id` (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================================================
-- Tablas de soporte (jobs / failed_jobs / migrations)
-- =========================================================

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- Inserts
-- =========================================================

INSERT INTO `categorias` (`categoria_id`, `nombre_categoria`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Películas', 'Películas de Sanrio', NULL, NULL),
(2, 'Series', 'Series de Sanrio', NULL, NULL),
(3, 'Música', 'Música de Sanrio', NULL, NULL),
(4, 'Merchandising', 'Productos de merchandising', NULL, NULL);

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000002_create_jobs_table', 1),
(2, '2024_01_01_000000_create_roles_table', 2),
(3, '2024_01_01_000001_create_usuarios_table', 2),
(4, '2025_08_01_032118_create_cache_table', 2),
(5, '2024_01_01_000002_create_productos_table', 3),
(6, '2024_01_01_000003_create_categorias_table', 3);

INSERT INTO `productos` (nombre_producto, descripcion, precio, categoria_id, url_imagen, ultima_actualizacion) VALUES
('Jabonera Kuromi', 'Una jabonera con la imagen de Kuromi', 12000.00, NULL, 'JABONERAkuromi.jpg', '2025-08-03 05:22:26'),
('Peluche Kuromi', 'Un hermoso y adorable peluche de Kuromi', 30000.00, NULL, 'peluchekurumi.jpg', '2025-08-03 05:22:26'),
('Bolso Kuromi', 'Bolso de Kuromi, ideal para salir con estilo.', 69000.00, NULL, 'kuBOLSO.jpg', '2025-08-03 05:22:26'),
('Abanico Kuromi', 'Un hermoso abanico con la imagen de Kuromi', 11000.00, NULL, 'kuABANICO.jpg', '2025-08-03 05:22:26'),
('Calculadora Kuromi', 'Una calculadora con estilo', 27000.00, NULL, 'kuCALCULADORA.jpg', '2025-08-03 05:22:26'),
('Manilla de Kuromi', 'Una preciosa manilla de Kuromi', 10000.00, NULL, 'kuMANILLA.jpg', '2025-08-03 05:22:26'),
('Peine de Kuromi', 'Un peine para que puedas peinar tu cabello.', 17000.00, NULL, 'kuPEINE.jpg', '2025-08-03 05:22:26'),
('Cartera Kuromi', 'Una cartera adorable para llevar tus cosas', 23000.00, NULL, 'kuCARTERA.jpg', '2025-08-03 05:22:26'),
('Papelera Kuromi', 'Una linda papelera de Kuromi', 18000.00, NULL, 'kuPAPELERA.jpg', '2025-08-03 05:22:26'),
('Balsamo de Kuromi', 'Un suave y bonito balsamo con estuche de kuromi', 9000.00, NULL, 'balsamokuromi.jpg', '2025-08-03 05:22:26'),
('Bolsa pequeña de Kuromi', 'Bolsa pequeña de kuromi', 23000.00, NULL, 'bolsakuromi.jpg', '2025-08-03 05:22:26'),
('Lapicero de Kuromi', 'Lapicero color negro de kuromi', 9550.00, NULL, 'lapizerokuromi.jpg', '2025-08-03 05:22:26'),
('Bolso de Chococat', 'Un bonito bolso pequeño de Chococat', 48000.00, NULL, 'bolsocat.jpg', '2025-08-03 05:26:02'),
('Billetera Chococat', 'Una billetera adorable para llevar tu dinero', 15000.00, NULL, 'billeteracat.jpg', '2025-08-03 05:26:02'),
('Cosmetiquera Chococat', 'Amplia y cómoda cosmetiquera para tu maquillaje', 44000.00, NULL, 'cosmetiqueracat.jpg', '2025-08-03 05:26:02'),
('Crema corporal Chococat', 'Crema humectante y suave con olor a chocolate', 28000.00, NULL, 'cremacat.jpg', '2025-08-03 05:26:02'),
('Llavero Chococat', 'Un bonito y pequeño llavero', 12000.00, NULL, 'llaverocat.jpg', '2025-08-03 05:26:02'),
('Libreta Chococat', 'Una pequeña pero bonita libreta para tus apuntes', 29000.00, NULL, 'libretacat.jpg', '2025-08-03 05:26:02'),
('Funda Chococat', 'Una preciosa funda para tu teléfono', 38000.00, NULL, 'fundacat.jpg', '2025-08-03 05:26:02'),
('Taza Chococat', 'Una bonita taza para tu café en las mañanas', 69000.00, NULL, 'tazacat.jpg', '2025-08-03 05:26:02'),
('Kit Chococat', 'Pequeño kit para el colegio', 60000.00, NULL, 'kitcat.jpg', '2025-08-03 05:26:02'),
('Peluche Chococat', 'Tierno peluche de Chococat con camarita', 56000.00, NULL, 'peluchecat.jpg', '2025-08-03 05:26:02'),
('Armario Chococat', 'Un armario para organizar tus cositas', 100000.00, NULL, 'armariocat.jpg', '2025-08-03 05:26:02'),
('Lapicero Chococat', 'Lapicero color negro', 9000.00, NULL, 'lapicerocat.jpg', '2025-08-03 05:26:02'),
('Tostadora Hello Kitty', 'Pequeña tostadora con forma de Hello Kitty para tostar panes y tostadas.', 60000.00, NULL, 'tostadora.jpg', '2025-08-04 00:31:38'),

('Cubiertos Hello Kitty', 'Unos cubiertos de Hello Kitty para comer con estilo.', 20000.00, NULL, 'cubiertos.jpg', '2025-08-04 00:31:38'),
('Loción Hello Kitty', 'Una pequeña loción de Hello Kitty para oler delicioso.', 20500.00, NULL, 'kittyLOCION.jpg', '2025-08-04 00:31:38'),
('Peluche Hello Kitty', 'Un peluche de Hello Kitty para decorar tu habitación.', 50000.00, NULL, 'kittyPELUCHE.jpg', '2025-08-04 00:31:38'),
('Lámpara Hello Kitty', 'Una pequeña lámpara de Hello Kitty para iluminar tu espacio.', 42000.00, NULL, 'kittyLAMPARA.jpeg', '2025-08-04 00:31:38'),
('Mouse Hello Kitty', 'Un mouse de Hello Kitty para jugar y divertirte.', 38000.00, NULL, 'kittyMOUSE.jpeg', '2025-08-04 00:31:38'),
('Toallas húmedas Hello Kitty', 'Unas toallas húmedas de Hello Kitty para limpiar y tener a mano.', 10000.00, NULL, 'kittyTOALLASHUMEDAS.jpeg', '2025-08-04 00:31:38'),
('Papelera Hello Kitty', 'Una linda papelera de Hello Kitty.', 18000.00, NULL, 'canecakitty.jpg', '2025-08-04 00:31:38'),
('Organizador Hello Kitty', 'Un lindo organizador para tu escritorio.', 38000.00, NULL, 'organizadorkitty.jpg', '2025-08-04 00:31:38'),


('Muñeco Cinnamoroll', 'Un adorable muñeco de peluche de Cinnamoroll para tu colección.', 38000.00, NULL, 'cinaPELUCHE.jpg', '2025-08-04 00:33:02'),
('Cuaderno Cinnamoroll', 'Cuaderno de notas con un diseño exclusivo de Cinnamoroll, ideal para tus apuntes.', 20000.00, NULL,  'cinaCUADERNO.jpg', '2025-08-04 00:33:02'),
('Kit Cinnamoroll', 'Kit completo de bolsos perfecto para estudiantes', 120000.00, NULL,  'cina.jpg', '2025-08-04 00:33:02'),
('Camiseta Cinnamoroll', 'Una camiseta con estampado de Cinnamoroll, cómoda y moderna.', 28000.00, NULL,  'camisaCINNA.jpg', '2025-08-04 00:33:02'),
('Chanclas Cinnamoroll', 'Unas hermosas chanclas con estampado de Cinnamoroll, cómodas y modernas.', 18000.00, NULL,  'cinaCHANCLAS.jpg', '2025-08-04 00:33:02'),
('Cosmetiquera Cinnamoroll', 'Una cosmetiquera de Cinnamoroll, ideal para llevar tus productos de belleza.', 20000.00, NULL,  'cinaCOSMETIQUERA.jpg', '2025-08-04 00:33:02'),
('Taza Cinnamoroll', 'Una taza perfecta para tu café.', 23000.00, NULL, 'cinaTAZA.jpg', '2025-08-04 00:33:02'),
('Bálsamo labial Cinnamoroll', 'Un bálsamo para tus labios.', 5000.00, NULL,  'balsamocina.jpg', '2025-08-04 00:33:02'),
('Libreta Cinnamoroll', 'Una pequeña pero bonita libreta para tus apuntes.', 29000.00, NULL,  'cuadernoCINA.jpg', '2025-08-04 00:33:02'),
('Morral Cinnamoroll', 'Un hermoso morral perfecto para llevar tus cositas.', 58000.00, NULL,  'bolosocinna.jpg', '2025-08-04 00:33:02'),
('Termo Cinnamoroll', 'Un bonito bolso termo para estar hidratado.', 40000.00, NULL,  'termocina.jpg', '2025-08-04 00:33:02'),
('Gorra Cinnamoroll', 'Una gorra para los calores.', 20000.00, NULL,  'gorracina.jpg', '2025-08-04 00:33:02'),
('Muñecos Keroppi', 'Tres adorables muñecos de peluche de Keroppi para tu colección.', 78000.00, NULL,  'cinnamonrol.jpg', '2025-08-04 00:33:51'),
('Cosmetiquera Keroppi', 'Cosmetiquera de Keroppi para llevar tus productos de belleza en cualquier lugar.', 20000.00, NULL, 'keCOSMETIQUERA.jpg', '2025-08-04 00:33:51'),

('Bolso Keroppi', 'Bolso de mano con el diseño de Keroppi, ideal para salir con estilo.', 34000.00, NULL,'keBOLSO.jpg', '2025-08-04 00:33:51'),
('Sandalias Keroppi', 'Unas hermosas sandalias de Keroppi para disfrutar del verano.', 18000.00, NULL,  'keSANDALIAS.jpg', '2025-08-04 00:33:51'),
('Cuaderno Keroppi', 'Un cuaderno de Keroppi para escribir tus pensamientos y recuerdos.', 20000.00, NULL,  'keCUADERNO.jpg', '2025-08-04 00:33:51'),

('Kit estudiantil de Keroppi', 'Un kit estudiantil de Keroppi para aprender a manejar su rana.', 70000.00, NULL, 'keKIT.jpg', '2025-08-04 00:33:51'),
('Organizador de Keroppi', 'Un organizador de Keroppi para llevar tus cosas en orden.', 25000.00, NULL,  'keORGANIZADOR.jpg', '2025-08-04 00:33:51'),
('Lonchera de Keroppi', 'Una lonchera de Keroppi para llevar tus alimentos en un lugar seguro.', 45000.00, NULL,  'keLONCHERA.jpg', '2025-08-04 00:33:51'),
('Set para lavado dental Keroppi', 'Un necesario set para tus pequeños a la hora del cepillado.', 30000.00, NULL,  'cepillokeropi.jpg', '2025-08-04 00:33:51'),
('Llavero Keroppi', 'Un lindo llavero para tus bolsos o llaves.', 15000.00, NULL,  'llaverokeropi.jpg', '2025-08-04 00:33:51'),
('Muñeco My Melody', 'Un adorable muñeco de peluche de My Melody para tu colección.', 40000.00, NULL,  'meloPELUCHE.jpg', '2025-08-04 02:37:03'),
('Cuaderno My Melody', 'Cuaderno de notas con un diseño exclusivo de My Melody, perfecto para tus apuntes.', 15000.00, NULL, 'meloCUADERNO.jpg', '2025-08-04 02:37:03'),
('Bolso My Melody', 'Bolso de mano con el diseño de My Melody, ideal para salir con estilo.', 34000.00, NULL, 'meloBOLSO.jpg', '2025-08-04 02:37:03'),
('Tenis My Melody', 'Unos tenis de My Melody para que puedas lucir con estilo.', 90000.00, NULL, 'meloZAPATOS.jpg', '2025-08-04 02:37:03'),
('Termo My Melody', 'Un termo de My Melody para mantener tus bebidas calientes o frías.', 22000.00, NULL, 'melodyTERMO.jpg', '2025-08-04 02:37:03'),
('Cosmetiquera My Melody', 'Una hermosa cosmetiquera de My Melody para tus productos de belleza.', 22000.00, NULL,  'meloCOSMETIQUERA.jpg', '2025-08-04 02:37:03'),
('Organizador My Melody', 'Un organizador de My Melody para mantener tus pertenencias en orden.', 28000.00, NULL, 'meloORGANIZADOR.jpg', '2025-08-04 02:37:03'),
('Peine My Melody', 'Un peine de My Melody para cuidar de tu cabello.', 14000.00, NULL, 'meloPEINE.jpg', '2025-08-04 02:37:03'),
('Reloj My Melody', 'Un reloj de My Melody para que puedas estar a la hora.', 30000.00, NULL, 'meloRELOJ.jpg', '2025-08-04 02:37:03'),
('Audífonos My Melody', 'Audífonos super cute.', 50000.00, NULL,  'audifonosmelody.jpg', '2025-08-04 02:37:03'),
('Caja organizadora My Melody', 'Una caja super cómoda para organizar tus pertenencias.', 35000.00, NULL,  'cajamelody.jpg', '2025-08-04 02:37:03'),
('Cuaderno My Melody', 'Lindo cuaderno para el colegio.', 28000.00, NULL,  'cuadernomelody.jpg', '2025-08-04 02:37:03'),

('Muñeco Pochaco', 'Un adorable muñeco de peluche de Pochaco para tu colección.', 25000.00, NULL,  'poPELUCHE.jpg', '2025-08-04 02:43:58'),
('Cubiertos de Pochaco', 'Cubiertos de Pochaco para comer con estilo.', 23000.00, NULL,  'poCUBIERTOS.jpg', '2025-08-04 02:43:58'),
('Peine Pochaco', 'Peine de Pochaco para cuidar tu peluca.', 17000.00, NULL,  'poPEINE.jpg', '2025-08-04 02:43:58'),
('Sandalias Pochaco', 'Sandalias de Pochaco para el verano.', 18000.00, NULL,  'poSANDALIAS.jpg', '2025-08-04 02:43:58'),
('Estuche de cámara de Pochaco', 'Un estuche de cámara de Pochaco para proteger tu equipo.', 30000.00, NULL,  'poESTUCHECAMARA.jpg', '2025-08-04 02:43:58'),
('Termo de Pochaco', 'Termo Pochaco para llevar tu bebida.', 25000.00, NULL,  'poTERMO.jpg', '2025-08-04 02:43:58'),
('Funko Pop de Pochaco', 'Un adorable Funko Pop de Pochaco para tu colección.', 55000.00, NULL, 'poFUNKO.jpg', '2025-08-04 02:43:58'),
('Carnet de Pochaco', 'Carnet de Pochaco para identificarte.', 18000.00, NULL,  'pochaco.jpg', '2025-08-04 02:43:58'),
('Set de escritorio', 'Un set de escritorio de Pochaco para trabajar en comodidad.', 34000.00, NULL,  'poSETESCRITORIO.jpeg', '2025-08-04 02:43:58'),
('Pantuflas Pochaco', 'Unas calientitas pantuflas para las frías mañanas.', 57000.00, NULL,  'pantuflaspochaco.jpg', '2025-08-04 02:43:58'),
('Muñeco Pompompurin', 'Un adorable muñeco de peluche de Pompompurin para tu colección.', 37000.00, NULL,  'pomPELUCHE.jpg', '2025-08-04 02:50:06'),
('Monedero de Pompompurin', 'Monedero de Pompompurin para guardar tus pequeños tesoros.', 12000.00, NULL,  'pomMONEDERO.jpg', '2025-08-04 02:50:06'),
('Bolso Pompompurin', 'Bolso de Pompompurin, ideal para salir con estilo.', 45000.00, NULL, 'pomBOLSO.jpg', '2025-08-04 02:50:06'),
('Pinzas Pompompurin', 'Unas lindas pinzas para el cabello de Pompompurin.', 12000.00, NULL,  'pomPINZAS.jpg', '2025-08-04 02:50:06'),
('Squishy Pompompurin', 'Un bonito squishy de Pompompurin para manejar tu estrés o ansiedad.', 15000.00, NULL,  'pomSQUISHY.jpg', '2025-08-04 02:50:06'),
('Taza Pompompurin', 'Una taza de Pompompurin para disfrutar de tu café o té.', 28000.00, NULL,  'pomTAZA.jpg', '2025-08-04 02:50:06'),
('Corta uñas Pompompurin', 'Unas corta uñas de Pompompurin para cuidar tus uñas.', 10000.00, NULL,  'pomCORTAUÑAS.jpg', '2025-08-04 02:50:06'),
('Termo Pompompurin', 'Un lindo termo para llevar a la escuela o al trabajo.', 12000.00, NULL, 'pomTERMO.jpg', '2025-08-04 02:50:06'),
('Organizador Pompompurin', 'Un bonito organizador para tu escritorio o mesa de trabajo.', 23000.00, NULL,  'pomORGANIZADOR.jpg', '2025-08-04 02:50:06'),
('Medias de Pompompurin', 'Set de 3 pares de medias para el diario.', 15000.00, NULL,  'mediaspompom.jpg', '2025-08-04 02:50:06'),
('Morral Pompompurin', 'Un grande y espacioso morral para el colegio.', 90000.00, NULL,  'morralpompom.jpg', '2025-08-04 02:50:06');

INSERT INTO `roles` (`rol_id`, `nombre_rol`, `descripcion`, `estado`, `fecha_creacion`, `ultima_actualizacion`) VALUES
(1, 'Usuario', 'Usuario regular del sistema', 'activo', '2025-08-03 04:12:08', '2025-08-03 04:12:08'),
(2, 'Administrador', 'Administrador del sistema', 'activo', '2025-08-03 04:12:08', '2025-08-03 04:12:08');

INSERT INTO `usuarios` (`usuario_id`, `nombre_usuario`, `correo`, `contrasena`, `direccion_envio`, `direccion_facturacion`, `rol_id`, `ultima_actualizacion`) VALUES
(3, 'val callejas', 'valery12callejas@gmail.com', '$2y$12$oON6Uc4AJw4YzXuFJrxhseCjP7C4stQ3uBvO3wNwkx2cEvkuK9ARu', NULL, NULL, 2, '2025-08-03 04:41:21');

-- =========================================================
-- Llaves foráneas
-- =========================================================

ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`);

ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_productos` (`categoria_id`);

ALTER TABLE `carrito_compras`
  ADD CONSTRAINT `carrito_compras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `carrito_compras_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`);

ALTER TABLE `comentarios_pedidos`
  ADD CONSTRAINT `comentarios_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`),
  ADD CONSTRAINT `comentarios_pedidos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

ALTER TABLE `comentarios_productos`
  ADD CONSTRAINT `comentarios_productos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`),
  ADD CONSTRAINT `comentarios_productos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

ALTER TABLE `detalles_facturas`
  ADD CONSTRAINT `detalles_facturas_ibfk_1` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`factura_id`),
  ADD CONSTRAINT `detalles_facturas_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`);

ALTER TABLE `detalles_pedidos`
  ADD CONSTRAINT `detalles_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`),
  ADD CONSTRAINT `detalles_pedidos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`);

ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodos_pago` (`metodo_pago_id`);

ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodos_pago` (`metodo_pago_id`),
  ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`metodo_envio_id`) REFERENCES `metodos_envio` (`metodo_envio_id`);

-- =========================================================
-- Finalización
-- =========================================================
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;