-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `booking`;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_end_date` date NOT NULL,
  `booking_start_date` date NOT NULL,
  `start_time` time NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsh4nrvwbhl3okuio2be7wxm3a` (`product_id`),
  KEY `FKkgseyy7t56x7lkjgu3wah5s3t` (`user_id`),
  CONSTRAINT `FKkgseyy7t56x7lkjgu3wah5s3t` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKsh4nrvwbhl3okuio2be7wxm3a` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url_image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `category` (`id`, `description`, `title`, `url_image`) VALUES
(1,	'Una tracción 4x4 proporciona potencia y torque a las cuatro ruedas del vehículo. En términos generales, una camioneta 4x4 tiene un chasis más robusto con neumáticos más grandes y más distancia al suelo que una 4x2',	'4x4',	'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/l/RT_V_982d0e8bc3c54963b4810b04e39a9454.jpg'),
(2,	'Sedán​ es un tipo de carrocería típica de un automóvil. Es un tres volúmenes en el que la tapa del maletero no incluye el vidrio trasero, por lo que está fijo y el maletero está separado de la cabina. La cantidad de puertas es casi siempre 2 o 4',	'Sedan',	'https://www.carroya.com/noticias/sites/default/files/styles/noticias_relacionadas_amp/public/entradillas/421015795volkswagenjetta2019-carroya.jpg?itok=7I3NzhQt'),
(3,	'Los coches subcompactos son aquellos que tienen una longitud de entre 4 y 4,20 metros, siendo más pequeños que los compactos. Por lo general, son coches bastante ágiles y fáciles de conducir en el tráfico urbano, su principal hábitat.',	'Subcompacto',	'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_2103cf5ea8894b65a193bfddd1bca03f.jpg'),
(4,	'Un deportivo es, por lo general, un coche pequeño y bajo para dos pasajeros que ofrece una respuesta rápida, puede circular a altas velocidades y está diseñado para ser conducido en la vía pública',	'Deportivo',	'https://www.pruebaderuta.com/wp-content/uploads/2016/03/corvette-encabezado.jpg');

DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `city` (`id`, `city`, `country`, `province`) VALUES
(1,	'Buenos Aires',	'Argentina',	'Buenos Aires'),
(2,	'Córdoba',	'Argentina',	'Córdoba'),
(3,	'Rosario',	'Argentina',	'Santa Fe'),
(4,	'Neuquén',	'Argentina',	'Neuquén');

DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url_image` varchar(255) NOT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgpextbyee3uk9u6o2381m7ft1` (`product_id`),
  CONSTRAINT `FKgpextbyee3uk9u6o2381m7ft1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `image` (`id`, `title`, `url_image`, `product_id`) VALUES
(1,	'Hyundai Verna 2',	'https://rodati.cl/images/listings/2022-06/77c6e874-1654857790-256.jpg',	1),
(2,	'Hyundai Verna 3',	'https://i.ytimg.com/vi/NMi0hqejv4I/maxresdefault.jpg',	1),
(3,	'Hyundai Verna 5',	'https://http2.mlstatic.com/D_NQ_NP_646341-MLC50710126016_072022-W.jpg',	1),
(4,	'Hyundai Verna 1',	'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',	1),
(5,	'Hyundai Verna 4',	'https://cdn.wallpapersafari.com/37/34/b3PJBn.jpg',	1),
(6,	'Ford Focus 2',	'https://autosbalears.com/wp-content/uploads/2017/02/IMAGEN-FOCUS.jpg',	2),
(7,	'Ford Focus 1',	'https://www.fordpussetto.com.ar/public/images/vehiculos/colores/focus-negro-perlado.jpg',	2),
(8,	'Ford Focus 3',	'https://http2.mlstatic.com/D_NQ_NP_935349-MLA52253604383_112022-W.jpg',	2),
(9,	'Ford Focus 5',	'https://cdn.motor1.com/images/mgl/VRgMy/s3/critica-ford-focus-2-0-titanium-powershift-2016.webp',	2),
(10,	'Ford Focus 4',	'https://img-ar-2.trovit.com/1y1pQ_Qe1S/1y1pQ_Qe1S.1_11.jpg',	2),
(11,	'BMW 3 Series Gran Turismo 5',	'https://noticias.coches.com/wp-content/uploads/2016/07/BMW-Serie-3-GT-M-Sport-2016-20.jpg',	3),
(12,	'BMW 3 Series Gran Turismo 3',	'https://noticias.coches.com/wp-content/uploads/2016/07/BMW-Serie-3-GT-M-Sport-2016-11.jpg',	3),
(13,	'BMW 3 Series Gran Turismo 2',	'https://noticias.coches.com/wp-content/uploads/2016/07/BMW-Serie-3-GT-M-Sport-2016-17.jpg',	3),
(14,	'BMW 3 Series Gran Turismo 1',	'https://noticias.coches.com/wp-content/uploads/2016/07/BMW-Serie-3-GT-M-Sport-2016-16.jpg',	3),
(15,	'BMW 3 Series Gran Turismo 4',	'https://noticias.coches.com/wp-content/uploads/2016/07/BMW-Serie-3-GT-M-Sport-2016-09.jpg',	3),
(16,	'Mercedes-Benz Clase A 4',	'https://img.remediosdigitales.com/633d27/presentacion-clasea-02/450_1000.jpg',	4),
(17,	'Mercedes-Benz Clase A 2',	'https://cdn.autobild.es/sites/navi.axelspringer.es/public/styles/480/public/media/image/2018/07/mercedes-c63-amg-sedan-2018_2.jpg?itok=lwlY1nx3',	4),
(18,	'Mercedes-Benz Clase A 5',	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNmN50XDQK-wUejbo0kjiNUgzpB7qoMJMOg1wPSAwm-zpQdcL4KNFiQiDUx76qaEQnmI&usqp=CAU',	4),
(19,	'Mercedes-Benz Clase A 3',	'https://www.autopista.es/uploads/s1/57/18/67/3/article-mercedes-clase-c-coupe-amg-2015-opiniones-56446beb3f68b.jpeg',	4),
(20,	'Mercedes-Benz Clase A 1',	'https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',	4),
(21,	'Volkswagen Tiguan 2',	'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-volkswagen-tiguan-1-1631145308.jpg',	5),
(22,	'Volkswagen Tiguan 1',	'https://images.pexels.com/photos/14038635/pexels-photo-14038635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',	5),
(23,	'Volkswagen Tiguan 4',	'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-volkswagen-tiguan-17-1631145348.jpg',	5),
(24,	'Volkswagen Tiguan 3',	'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-volkswagen-tiguan-5-1631145306.jpg',	5),
(25,	'Volkswagen Tiguan 5',	'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-volkswagen-tiguan-6-1631145330.jpg',	5),
(26,	'Mercedes-Benz SL500 4',	'https://p4.wallpaperbetter.com/wallpaper/851/939/597/2013-mercedes-benz-sl500-wallpaper-preview.jpg',	6),
(27,	'Mercedes-Benz SL500 3',	'https://p4.wallpaperbetter.com/wallpaper/424/961/298/benz-mercedes-sl500-wallpaper-preview.jpg',	6),
(28,	'Mercedes-Benz SL500 5',	'https://p4.wallpaperbetter.com/wallpaper/480/802/508/2005-08-500-benz-convertible-wallpaper-preview.jpg',	6),
(29,	'Mercedes-Benz SL500 1',	'https://images.pexels.com/photos/205740/pexels-photo-205740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',	6),
(30,	'Mercedes-Benz SL500 2',	'https://p4.wallpaperbetter.com/wallpaper/305/583/704/mercedes-benz-sl500-blue-mercedes-benz-coupe-wallpaper-preview.jpg',	6),
(31,	'BMW Serie 5 Sedan 2',	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlnV686Hzq0TduCCEMrtBHrgzEzN1bQwIYIjdBIRbaPAnObEiNQ6Wgdm4BrsWMykxn6Rc&usqp=CAU',	7),
(32,	'BMW Serie 5 Sedan 4',	'https://www.diariomotor.com/imagenes/picscache/1440x655c/1440_portada_bmw-serie-5-2017-32_1440x655c.jpg',	7),
(33,	'BMW Serie 5 Sedan 5',	'https://mediapool.bmwgroup.com/cache/P9/202010/P90404078/P90404078-the-new-bmw-540i-xdrive-sedan-phytonic-blue-metallic-10-2020-600px.jpg',	7),
(34,	'BMW Serie 5 Sedan 3',	'https://w0.peakpx.com/wallpaper/923/93/HD-wallpaper-2021-bmw-5-series-540i-xdrive-m-sport-package-rear-car.jpg',	7),
(35,	'BMW Serie 5 Sedan 1',	'https://images.unsplash.com/photo-1560009341-b0a4cad519bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',	7),
(36,	'Range Rover 1',	'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',	8),
(37,	'Range Rover 2',	'https://noticias.coches.com/wp-content/uploads/2014/07/arden_land-rover-range-rover-ar6-2010_r2.jpg',	8),
(38,	'Range Rover 5',	'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_f4d077972b64495c8f9ac3d4a3e8da31.jpg',	8),
(39,	'Range Rover 3',	'https://i.pinimg.com/originals/ef/94/a3/ef94a34423dfcddb5f772d80d4b6c76c.jpg',	8),
(40,	'Range Rover 4',	'https://phantom-marca.unidadeditorial.es/b61c2f0ef2e6e4df2e036cd39cc4dca8/f/webp/assets/multimedia/imagenes/2020/09/24/16009474161982.jpg',	8);

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `availability` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `air_conditioner` varchar(255) NOT NULL,
  `autonomy` varchar(255) NOT NULL,
  `doors` int NOT NULL,
  `gps` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `motor_type` varchar(255) NOT NULL,
  `num_passengers` int NOT NULL,
  `transmission` varchar(255) NOT NULL,
  `latitude` double NOT NULL,
  `length` double NOT NULL,
  `politics` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `city_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  KEY `FKh788ivjgngf4jvk4e5h4u8dkm` (`city_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKh788ivjgngf4jvk4e5h4u8dkm` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `product` (`id`, `availability`, `description`, `air_conditioner`, `autonomy`, `doors`, `gps`, `model`, `motor_type`, `num_passengers`, `transmission`, `latitude`, `length`, `politics`, `price`, `title`, `category_id`, `city_id`) VALUES
(1,	'Disponible',	'El Hyundai Verna es un buen auto, concepto familiar y de uso en ciudad. Es cómodo y fácil de manejar, está todo bien dispuesto y a la mano, tiene un correcto equipamiento considerando su precio, y un motor confiable y relativamente eficiente. ',	'Si',	'500KM',	5,	'Si',	'2018',	'Nafta',	5,	'Manual',	299,	110,	'Aplique términos y condiciones',	100,	'Hyundai Verna',	2,	1),
(2,	'Disponible',	'El Ford Focus es un compacto de cinco puertas, del segmento C. El Ford Focus destaca por ofrecer un buen compromiso en cuanto a relación calidad-precio.',	'Si',	'400KM',	5,	'Si',	'2020',	'Nafta',	5,	'Manual',	400,	210,	'Aplique términos y condiciones',	100,	'Ford Focus',	3,	2),
(3,	'Disponible',	'Las letras GT hacen referencia a Gran Turismo. Es un coche que cuenta con bastante potencia y que está diseñado para realizar desplazamientos de larga distancia. Pero a su vez cuenta con prestaciones deportivas y las comodidades de un sedán',	'Si',	'500KM',	3,	'Si',	'2021',	'Nafta',	2,	'Automática',	320,	497,	'Aplique términos y condiciones',	100,	'BMW 3 Series Gran Turismo',	4,	4),
(4,	'Disponible',	'El Mercedes-Benz Clase A es un automóvil premium del segmento C producido por el fabricante alemán Mercedes-Benz desde el año 1997. Cuenta con tracción delantera, y todos sus motores son de cuatro cilindros en línea.',	'Si',	'500KM',	5,	'Si',	'2019',	'Nafta',	5,	'Automática',	220,	435,	'Aplique términos y condiciones',	100,	'Mercedes-Benz Clase A',	3,	2),
(5,	'Disponible',	'El Volkswagen Tiguan es un automóvil todoterreno del segmento C de cinco plazas. Tiene carrocería de cinco puertas y motor delantero transversal, disponible con tracción delantera o tracción a las cuatro ruedas conectable automáticamente 4motion.',	'Si',	'500KM',	5,	'Si',	'2020',	'Nafta',	5,	'Automática',	220,	435,	'Aplique términos y condiciones',	100,	'Volkswagen Tiguan',	1,	4),
(6,	'Disponible',	'El Mercedes-Benz SL500 es un automóvil premium producido por el fabricante alemán Mercedes-Benz desde el año 1954. Cuenta con tracción delantera, y todos sus motores son de cuatro cilindros en línea.',	'Si',	'600KM',	5,	'Si',	'2017',	'Nafta',	5,	'Manual',	220,	435,	'Aplique términos y condiciones',	100,	'Mercedes-Benz SL500',	1,	4),
(7,	'Disponible',	'Gracias a su aspecto dinámico y al mismo tiempo elegante, cumple de manera convincente con las expectativas que se ponen hoy en día en un vehículo de su clase: atletismo estético y placer de conducción con tecnología vanguardista.',	'Si',	'600KM',	5,	'Si',	'2019',	'Nafta',	5,	'Manual',	220,	435,	'Aplique términos y condiciones',	100,	'BMW Serie 5 Sedan',	2,	4),
(8,	'Disponible',	'Gracias a su aspecto dinámico y al mismo tiempo elegante, cumple de manera convincente con las expectativas que se ponen hoy en día en un vehículo de su clase: atletismo estético y placer de conducción con tecnología vanguardista.',	'Si',	'500KM',	5,	'Si',	'2020',	'Nafta',	5,	'Manual',	220,	435,	'Aplique términos y condiciones',	100,	'Range Rover',	1,	3);

DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `rol` (`id`, `name`) VALUES
(1,	'Admin'),
(2,	'User');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city_id` int NOT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK29eqyw0gxw5r4f1ommy11nd9i` (`city_id`),
  KEY `FKpikdt34c2nqt413csrypwhe69` (`rol_id`),
  CONSTRAINT `FK29eqyw0gxw5r4f1ommy11nd9i` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`),
  CONSTRAINT `FKpikdt34c2nqt413csrypwhe69` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2022-11-19 21:23:46
