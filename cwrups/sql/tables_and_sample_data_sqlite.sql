-- import to SQLite by running: sqlite3.exe db.sqlite3 -init sqlite.sql

PRAGMA journal_mode = MEMORY;
PRAGMA synchronous = OFF;
PRAGMA foreign_keys = OFF;
PRAGMA ignore_check_constraints = OFF;
PRAGMA auto_vacuum = NONE;
PRAGMA secure_delete = OFF;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
`customer_id` INTEGER NOT NULL,
`first_name` TEXT NOT NULL,
`last_name` TEXT NOT NULL,
PRIMARY KEY (`customer_id`)
);
INSERT INTO `customer` VALUES (1,'Tyler','Thieding'),(2,'Elise','Epstein'),(3,'Phan','Trinh Ha'),(4,'Long','Phan'),(5,'Ernie','Thieding');
DROP TABLE IF EXISTS `shipping_rate`;

CREATE TABLE `shipping_rate` (
`parcel_type` INTEGER NOT NULL,
`effective_date` datetime NOT NULL,
`flat_fee` double NOT NULL,
PRIMARY KEY (`parcel_type`,`effective_date`),
FOREIGN KEY (`parcel_type`) REFERENCES `parcel_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `shipping_rate` VALUES (1,'2016-01-01 00:00:00',8.75),(1,'2018-01-01 00:00:00',9),(1,'2019-10-01 00:00:00',9.5),(2,'2016-01-01 00:00:00',5),(2,'2018-01-01 00:00:00',5.25),(2,'2019-10-01 00:00:00',5.75),(3,'2016-01-01 00:00:00',2.25),(3,'2018-01-01 00:00:00',2.75),(3,'2019-10-01 00:00:00',3.25),(4,'2016-01-01 00:00:00',0.5),(4,'2018-01-01 00:00:00',0.75),(4,'2019-10-01 00:00:00',1);
DROP TABLE IF EXISTS `distribution_center_address`;

CREATE TABLE `distribution_center_address` (
`distribution_center_id` INTEGER NOT NULL,
`address_id` INTEGER NOT NULL,
PRIMARY KEY (`distribution_center_id`),
FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`distribution_center_id`) REFERENCES `distribution_center` (`distribution_center_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `distribution_center_address` VALUES (2,1),(3,2),(4,3);
DROP TABLE IF EXISTS `order_parcel_type`;

CREATE TABLE `order_parcel_type` (
`order_id` INTEGER NOT NULL,
`parcel_type` INTEGER NOT NULL,
PRIMARY KEY (`order_id`),
FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`parcel_type`) REFERENCES `parcel_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `order_parcel_type` VALUES (2,2),(1,3);
DROP TABLE IF EXISTS `shipping_leg`;

CREATE TABLE `shipping_leg` (
`leg_id` INTEGER NOT NULL,
`departure_time` datetime NOT NULL,
`arrival_time` datetime DEFAULT NULL,
PRIMARY KEY (`leg_id`)
);
INSERT INTO `shipping_leg` VALUES (1,'2019-11-22 17:00:00','2019-11-22 18:30:00'),(2,'2019-11-23 08:00:00','2019-11-23 12:00:00'),(3,'2019-11-25 09:00:00','2019-11-25 11:00:00'),(4,'2019-11-25 13:00:00','2019-11-25 14:30:00'),(5,'2019-11-26 06:00:00','2019-11-26 09:30:00');
DROP TABLE IF EXISTS `shipping_leg_asset_used`;

CREATE TABLE `shipping_leg_asset_used` (
`leg_id` INTEGER NOT NULL,
`asset_id` INTEGER NOT NULL,
PRIMARY KEY (`leg_id`),
FOREIGN KEY (`asset_id`) REFERENCES `transit_hard_asset` (`asset_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`leg_id`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `shipping_leg_asset_used` VALUES (1,1),(5,2),(2,4),(3,4),(4,4);
DROP TABLE IF EXISTS `status_updates`;

CREATE TABLE `status_updates` (
`order` INTEGER NOT NULL,
`distribution_center` INTEGER NOT NULL,
`enter_leg` INTEGER DEFAULT NULL,
`exit_leg` INTEGER DEFAULT NULL,
PRIMARY KEY (`order`,`distribution_center`),
FOREIGN KEY (`distribution_center`) REFERENCES `distribution_center` (`distribution_center_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`enter_leg`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`exit_leg`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`order`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `status_updates` VALUES (1,0,NULL,1),(1,1,2,NULL),(1,2,1,2),(2,0,NULL,3),(2,1,5,NULL),(2,2,3,4),(2,3,4,5);
DROP TABLE IF EXISTS `parcel_type`;

CREATE TABLE `parcel_type` (
`type_id` INTEGER NOT NULL,
`type_description` TEXT NOT NULL,
PRIMARY KEY (`type_id`)
);
INSERT INTO `parcel_type` VALUES (1,'Large Package'),(2,'Small Package'),(3,'Large Envalope'),(4,'Small Envalope');
DROP TABLE IF EXISTS `transit_method`;

CREATE TABLE `transit_method` (
`method_id` INTEGER NOT NULL,
`method_description` TEXT NOT NULL,
PRIMARY KEY (`method_id`)
);
INSERT INTO `transit_method` VALUES (1,'Delivery Van'),(2,'Truck'),(3,'Train'),(4,'Airplane'),(5,'Boat');
DROP TABLE IF EXISTS `transit_asset_method`;

CREATE TABLE `transit_asset_method` (
`asset_id` INTEGER NOT NULL,
`method_id` INTEGER NOT NULL,
PRIMARY KEY (`asset_id`),
FOREIGN KEY (`asset_id`) REFERENCES `transit_hard_asset` (`asset_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`method_id`) REFERENCES `transit_method` (`method_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `transit_asset_method` VALUES (4,1),(1,2),(2,2),(3,4);
DROP TABLE IF EXISTS `shipping_leg_origin`;

CREATE TABLE `shipping_leg_origin` (
`shipping_leg_id` INTEGER NOT NULL,
`address_id` INTEGER NOT NULL,
PRIMARY KEY (`shipping_leg_id`),
FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`shipping_leg_id`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `shipping_leg_origin` VALUES (2,1),(4,1),(5,2),(3,4),(1,5);
DROP TABLE IF EXISTS `transit_hard_asset`;

CREATE TABLE `transit_hard_asset` (
`asset_id` INTEGER NOT NULL,
`make` TEXT NOT NULL,
`model` TEXT NOT NULL,
`purchase_date` datetime NOT NULL,
`temperature_controlled` tinyINTEGER NOT NULL,
PRIMARY KEY (`asset_id`)
);
INSERT INTO `transit_hard_asset` VALUES (1,'Freightliner','Business Class M2 112','2017-07-04 00:00:00',0),(2,'Freightliner','Business Class M2e Hybrid','2019-08-26 00:00:00',1),(3,'Boeing','777 Freighter','2018-08-27 00:00:00',0),(4,'Ford','Transit','2016-07-01 00:00:00',0);
DROP TABLE IF EXISTS `admin_site_credentials`;

CREATE TABLE `admin_site_credentials` (
`username` INTEGER NOT NULL,
`salted_and_hashed_password` TEXT NOT NULL,
PRIMARY KEY (`username`)
);
DROP TABLE IF EXISTS `ships_from_customer`;

CREATE TABLE `ships_from_customer` (
`order_id` INTEGER NOT NULL,
`customer_id` INTEGER NOT NULL,
PRIMARY KEY (`order_id`),
FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `ships_from_customer` VALUES (2,1),(1,2);
DROP TABLE IF EXISTS `ships_to_address`;

CREATE TABLE `ships_to_address` (
`order_id` INTEGER NOT NULL,
`address_id` INTEGER NOT NULL,
PRIMARY KEY (`order_id`),
FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `ships_to_address` VALUES (1,4),(2,6);
DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
`order_id` INTEGER NOT NULL,
`order_date` datetime NOT NULL,
`initial_estimated_arrival_date` datetime DEFAULT NULL,
`weight` double DEFAULT NULL,
PRIMARY KEY (`order_id`)
);
INSERT INTO `order` VALUES (1,'2019-11-22 00:00:00','2019-11-27 00:00:00',1.5),(2,'2019-11-25 08:00:00','2019-11-26 08:45:00',7.75);
DROP TABLE IF EXISTS `shipping_leg_destination`;

CREATE TABLE `shipping_leg_destination` (
`shipping_leg_id` INTEGER NOT NULL,
`address_id` INTEGER NOT NULL,
PRIMARY KEY (`shipping_leg_id`),
FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`shipping_leg_id`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `shipping_leg_destination` VALUES (1,1),(3,1),(4,2),(2,4),(5,6);
DROP TABLE IF EXISTS `ships_to_customer`;

CREATE TABLE `ships_to_customer` (
`order_id` INTEGER NOT NULL,
`customer_id` INTEGER NOT NULL,
PRIMARY KEY (`order_id`),
FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `ships_to_customer` VALUES (1,1),(2,5);
DROP TABLE IF EXISTS `ships_from_address`;

CREATE TABLE `ships_from_address` (
`order_id` INTEGER NOT NULL,
`address_id` INTEGER NOT NULL,
PRIMARY KEY (`order_id`),
FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `ships_from_address` VALUES (2,4),(1,5);
DROP TABLE IF EXISTS `distribution_center`;

CREATE TABLE `distribution_center` (
`distribution_center_id` INTEGER NOT NULL,
`description` TEXT NOT NULL,
PRIMARY KEY (`distribution_center_id`)
);
INSERT INTO `distribution_center` VALUES (0,'Origin Point'),(1,'Destination Point'),(2,'Cleveland, OH'),(3,'Chicago, IL'),(4,'San Fransisco, CA');
DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
`address_id` INTEGER NOT NULL,
`house_number` INTEGER NOT NULL,
`street_name` TEXT NOT NULL,
`apt_number` INTEGER DEFAULT NULL,
`city` TEXT NOT NULL,
`state` TEXT NOT NULL,
`zip_code` INTEGER NOT NULL,
PRIMARY KEY (`address_id`)
);
INSERT INTO `address` VALUES (1,5300,'Riverside Dr',NULL,'Cleveland','OH',44315),(2,10000,'W OHare Ave',NULL,'Chicago','IL',60666),(3,1500,'N Access Rd',NULL,'San Fransisco','CA',94128),(4,1030,'Cascades Dr',NULL,'Aurora','OH',44202),(5,10900,'Euclid Ave',NULL,'Cleveland','OH',44106),(6,2439,'Char Ct',NULL,'McFarland','WI',53558);



CREATE INDEX `distribution_center_address_address_id_distribution_center_address_idx` ON `distribution_center_address` (`address_id`);
CREATE INDEX `order_parcel_type_parcel_type_order_parcel_type_idx` ON `order_parcel_type` (`parcel_type`);
CREATE INDEX `shipping_leg_asset_used_asset_id_shipping_leg_asset_used_idx` ON `shipping_leg_asset_used` (`asset_id`);
CREATE INDEX `status_updates_distribution_center_id_status_updates_idx` ON `status_updates` (`distribution_center`);
CREATE INDEX `status_updates_enter_leg_status_updates_idx` ON `status_updates` (`enter_leg`);
CREATE INDEX `status_updates_exit_leg_status_updates_idx` ON `status_updates` (`exit_leg`);
CREATE INDEX `transit_asset_method_method_id_transit_asset_method_idx` ON `transit_asset_method` (`method_id`);
CREATE INDEX `shipping_leg_origin_address_id_shipping_leg_origin_idx` ON `shipping_leg_origin` (`address_id`);
CREATE INDEX `ships_from_customer_customer_id_idx` ON `ships_from_customer` (`customer_id`);
CREATE INDEX `ships_to_address_order_id_ships_to_address_idx` ON `ships_to_address` (`address_id`);
CREATE INDEX `shipping_leg_destination_address_id_shipping_leg_destination_idx` ON `shipping_leg_destination` (`address_id`);
CREATE INDEX `ships_to_customer_customer_id_idx` ON `ships_to_customer` (`customer_id`);
CREATE INDEX `ships_from_address_address_id_ships_from_address_idx` ON `ships_from_address` (`address_id`);

COMMIT;
PRAGMA ignore_check_constraints = ON;
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
