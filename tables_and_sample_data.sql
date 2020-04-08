CREATE DATABASE  IF NOT EXISTS `eecs341` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `eecs341`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: eecs341
-- ------------------------------------------------------
-- Server version	5.5.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Tyler','Thieding'),(2,'Elise','Epstein'),(3,'Phan','Trinh Ha'),(4,'Long','Phan'),(5,'Ernie','Thieding');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_rate`
--

DROP TABLE IF EXISTS `shipping_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_rate` (
  `parcel_type` int(11) NOT NULL,
  `effective_date` datetime NOT NULL,
  `flat_fee` double NOT NULL,
  PRIMARY KEY (`parcel_type`,`effective_date`),
  CONSTRAINT `parcel_type` FOREIGN KEY (`parcel_type`) REFERENCES `parcel_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_rate`
--

LOCK TABLES `shipping_rate` WRITE;
/*!40000 ALTER TABLE `shipping_rate` DISABLE KEYS */;
INSERT INTO `shipping_rate` VALUES (1,'2016-01-01 00:00:00',8.75),(1,'2018-01-01 00:00:00',9),(1,'2019-10-01 00:00:00',9.5),(2,'2016-01-01 00:00:00',5),(2,'2018-01-01 00:00:00',5.25),(2,'2019-10-01 00:00:00',5.75),(3,'2016-01-01 00:00:00',2.25),(3,'2018-01-01 00:00:00',2.75),(3,'2019-10-01 00:00:00',3.25),(4,'2016-01-01 00:00:00',0.5),(4,'2018-01-01 00:00:00',0.75),(4,'2019-10-01 00:00:00',1);
/*!40000 ALTER TABLE `shipping_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distribution_center_address`
--

DROP TABLE IF EXISTS `distribution_center_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `distribution_center_address` (
  `distribution_center_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`distribution_center_id`),
  KEY `address_id_distribution_center_address_idx` (`address_id`),
  CONSTRAINT `address_id_distribution_center_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `distribution_center_id_distribution_center_address` FOREIGN KEY (`distribution_center_id`) REFERENCES `distribution_center` (`distribution_center_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distribution_center_address`
--

LOCK TABLES `distribution_center_address` WRITE;
/*!40000 ALTER TABLE `distribution_center_address` DISABLE KEYS */;
INSERT INTO `distribution_center_address` VALUES (2,1),(3,2),(4,3);
/*!40000 ALTER TABLE `distribution_center_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_parcel_type`
--

DROP TABLE IF EXISTS `order_parcel_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_parcel_type` (
  `order_id` int(11) NOT NULL,
  `parcel_type` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `parcel_type_order_parcel_type_idx` (`parcel_type`),
  CONSTRAINT `order_id_order_parcel_type` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `parcel_type_order_parcel_type` FOREIGN KEY (`parcel_type`) REFERENCES `parcel_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_parcel_type`
--

LOCK TABLES `order_parcel_type` WRITE;
/*!40000 ALTER TABLE `order_parcel_type` DISABLE KEYS */;
INSERT INTO `order_parcel_type` VALUES (2,2),(1,3);
/*!40000 ALTER TABLE `order_parcel_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_leg`
--

DROP TABLE IF EXISTS `shipping_leg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_leg` (
  `leg_id` int(11) NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime DEFAULT NULL,
  PRIMARY KEY (`leg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_leg`
--

LOCK TABLES `shipping_leg` WRITE;
/*!40000 ALTER TABLE `shipping_leg` DISABLE KEYS */;
INSERT INTO `shipping_leg` VALUES (1,'2019-11-22 17:00:00','2019-11-22 18:30:00'),(2,'2019-11-23 08:00:00','2019-11-23 12:00:00'),(3,'2019-11-25 09:00:00','2019-11-25 11:00:00'),(4,'2019-11-25 13:00:00','2019-11-25 14:30:00'),(5,'2019-11-26 06:00:00','2019-11-26 09:30:00');
/*!40000 ALTER TABLE `shipping_leg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_leg_asset_used`
--

DROP TABLE IF EXISTS `shipping_leg_asset_used`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_leg_asset_used` (
  `leg_id` int(11) NOT NULL,
  `asset_id` int(11) NOT NULL,
  PRIMARY KEY (`leg_id`),
  KEY `asset_id_shipping_leg_asset_used_idx` (`asset_id`),
  CONSTRAINT `asset_id_shipping_leg_asset_used` FOREIGN KEY (`asset_id`) REFERENCES `transit_hard_asset` (`asset_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `leg_id_shipping_leg_asset_used` FOREIGN KEY (`leg_id`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_leg_asset_used`
--

LOCK TABLES `shipping_leg_asset_used` WRITE;
/*!40000 ALTER TABLE `shipping_leg_asset_used` DISABLE KEYS */;
INSERT INTO `shipping_leg_asset_used` VALUES (1,1),(5,2),(2,4),(3,4),(4,4);
/*!40000 ALTER TABLE `shipping_leg_asset_used` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_updates`
--

DROP TABLE IF EXISTS `status_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_updates` (
  `order_id` int(11) NOT NULL,
  `distribution_center_id` int(11) NOT NULL,
  `enter_leg` int(11) DEFAULT NULL,
  `exit_leg` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`,`distribution_center_id`),
  KEY `distribution_center_id_status_updates_idx` (`distribution_center_id`),
  KEY `enter_leg_status_updates_idx` (`enter_leg`),
  KEY `exit_leg_status_updates_idx` (`exit_leg`),
  CONSTRAINT `distribution_center_id_status_updates` FOREIGN KEY (`distribution_center_id`) REFERENCES `distribution_center` (`distribution_center_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `enter_leg_status_updates` FOREIGN KEY (`enter_leg`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `exit_leg_status_updates` FOREIGN KEY (`exit_leg`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_id_status_updates` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_updates`
--

LOCK TABLES `status_updates` WRITE;
/*!40000 ALTER TABLE `status_updates` DISABLE KEYS */;
INSERT INTO `status_updates` VALUES (1,0,NULL,1),(1,1,2,NULL),(1,2,1,2),(2,0,NULL,3),(2,1,5,NULL),(2,2,3,4),(2,3,4,5);
/*!40000 ALTER TABLE `status_updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parcel_type`
--

DROP TABLE IF EXISTS `parcel_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parcel_type` (
  `type_id` int(11) NOT NULL,
  `type_description` varchar(45) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parcel_type`
--

LOCK TABLES `parcel_type` WRITE;
/*!40000 ALTER TABLE `parcel_type` DISABLE KEYS */;
INSERT INTO `parcel_type` VALUES (1,'Large Package'),(2,'Small Package'),(3,'Large Envalope'),(4,'Small Envalope');
/*!40000 ALTER TABLE `parcel_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transit_method`
--

DROP TABLE IF EXISTS `transit_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transit_method` (
  `method_id` int(11) NOT NULL,
  `method_description` varchar(45) NOT NULL,
  PRIMARY KEY (`method_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transit_method`
--

LOCK TABLES `transit_method` WRITE;
/*!40000 ALTER TABLE `transit_method` DISABLE KEYS */;
INSERT INTO `transit_method` VALUES (1,'Delivery Van'),(2,'Truck'),(3,'Train'),(4,'Airplane'),(5,'Boat');
/*!40000 ALTER TABLE `transit_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transit_asset_method`
--

DROP TABLE IF EXISTS `transit_asset_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transit_asset_method` (
  `asset_id` int(11) NOT NULL,
  `method_id` int(11) NOT NULL,
  PRIMARY KEY (`asset_id`),
  KEY `method_id_transit_asset_method_idx` (`method_id`),
  CONSTRAINT `asset_id_transit_asset_method` FOREIGN KEY (`asset_id`) REFERENCES `transit_hard_asset` (`asset_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `method_id_transit_asset_method` FOREIGN KEY (`method_id`) REFERENCES `transit_method` (`method_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transit_asset_method`
--

LOCK TABLES `transit_asset_method` WRITE;
/*!40000 ALTER TABLE `transit_asset_method` DISABLE KEYS */;
INSERT INTO `transit_asset_method` VALUES (4,1),(1,2),(2,2),(3,4);
/*!40000 ALTER TABLE `transit_asset_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_leg_origin`
--

DROP TABLE IF EXISTS `shipping_leg_origin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_leg_origin` (
  `shipping_leg_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`shipping_leg_id`),
  KEY `address_id_shipping_leg_origin_idx` (`address_id`),
  CONSTRAINT `address_id_shipping_leg_origin` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `shipping_leg_id_shipping_leg_origin` FOREIGN KEY (`shipping_leg_id`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_leg_origin`
--

LOCK TABLES `shipping_leg_origin` WRITE;
/*!40000 ALTER TABLE `shipping_leg_origin` DISABLE KEYS */;
INSERT INTO `shipping_leg_origin` VALUES (2,1),(4,1),(5,2),(3,4),(1,5);
/*!40000 ALTER TABLE `shipping_leg_origin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transit_hard_asset`
--

DROP TABLE IF EXISTS `transit_hard_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transit_hard_asset` (
  `asset_id` int(11) NOT NULL,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `temperature_controlled` tinyint(4) NOT NULL,
  PRIMARY KEY (`asset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transit_hard_asset`
--

LOCK TABLES `transit_hard_asset` WRITE;
/*!40000 ALTER TABLE `transit_hard_asset` DISABLE KEYS */;
INSERT INTO `transit_hard_asset` VALUES (1,'Freightliner','Business Class M2 112','2017-07-04 00:00:00',0),(2,'Freightliner','Business Class M2e Hybrid','2019-08-26 00:00:00',1),(3,'Boeing','777 Freighter','2018-08-27 00:00:00',0),(4,'Ford','Transit','2016-07-01 00:00:00',0);
/*!40000 ALTER TABLE `transit_hard_asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_site_credentials`
--

DROP TABLE IF EXISTS `admin_site_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_site_credentials` (
  `username` int(11) NOT NULL,
  `salted_and_hashed_password` varchar(45) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_site_credentials`
--

LOCK TABLES `admin_site_credentials` WRITE;
/*!40000 ALTER TABLE `admin_site_credentials` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_site_credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ships_from_customer`
--

DROP TABLE IF EXISTS `ships_from_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ships_from_customer` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `customer_id_ships_from_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_id_ships_from_customer` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ships_from_customer`
--

LOCK TABLES `ships_from_customer` WRITE;
/*!40000 ALTER TABLE `ships_from_customer` DISABLE KEYS */;
INSERT INTO `ships_from_customer` VALUES (2,1),(1,2);
/*!40000 ALTER TABLE `ships_from_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ships_to_address`
--

DROP TABLE IF EXISTS `ships_to_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ships_to_address` (
  `order_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_id_ships_to_address_idx` (`address_id`),
  CONSTRAINT `address_id_ships_to_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_id_ships_to_address` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ships_to_address`
--

LOCK TABLES `ships_to_address` WRITE;
/*!40000 ALTER TABLE `ships_to_address` DISABLE KEYS */;
INSERT INTO `ships_to_address` VALUES (1,4),(2,6);
/*!40000 ALTER TABLE `ships_to_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `initial_estimated_arrival_date` datetime DEFAULT NULL,
  `weight` double DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'2019-11-22 00:00:00','2019-11-27 00:00:00',1.5),(2,'2019-11-25 08:00:00','2019-11-26 08:45:00',7.75);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_leg_destination`
--

DROP TABLE IF EXISTS `shipping_leg_destination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_leg_destination` (
  `shipping_leg_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`shipping_leg_id`),
  KEY `address_id_shipping_leg_destination_idx` (`address_id`),
  CONSTRAINT `address_id_shipping_leg_destination` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `shipping_leg_id_shipping_leg_destination` FOREIGN KEY (`shipping_leg_id`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_leg_destination`
--

LOCK TABLES `shipping_leg_destination` WRITE;
/*!40000 ALTER TABLE `shipping_leg_destination` DISABLE KEYS */;
INSERT INTO `shipping_leg_destination` VALUES (1,1),(3,1),(4,2),(2,4),(5,6);
/*!40000 ALTER TABLE `shipping_leg_destination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ships_to_customer`
--

DROP TABLE IF EXISTS `ships_to_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ships_to_customer` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `customer_id_ships_to_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_id_ships_to_customer` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ships_to_customer`
--

LOCK TABLES `ships_to_customer` WRITE;
/*!40000 ALTER TABLE `ships_to_customer` DISABLE KEYS */;
INSERT INTO `ships_to_customer` VALUES (1,1),(2,5);
/*!40000 ALTER TABLE `ships_to_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ships_from_address`
--

DROP TABLE IF EXISTS `ships_from_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ships_from_address` (
  `order_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `address_id_ships_from_address_idx` (`address_id`),
  CONSTRAINT `address_id_ships_from_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_id_ships_from_address` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ships_from_address`
--

LOCK TABLES `ships_from_address` WRITE;
/*!40000 ALTER TABLE `ships_from_address` DISABLE KEYS */;
INSERT INTO `ships_from_address` VALUES (2,4),(1,5);
/*!40000 ALTER TABLE `ships_from_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distribution_center`
--

DROP TABLE IF EXISTS `distribution_center`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `distribution_center` (
  `distribution_center_id` int(11) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`distribution_center_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distribution_center`
--

LOCK TABLES `distribution_center` WRITE;
/*!40000 ALTER TABLE `distribution_center` DISABLE KEYS */;
INSERT INTO `distribution_center` VALUES (0,'Origin Point'),(1,'Destination Point'),(2,'Cleveland, OH'),(3,'Chicago, IL'),(4,'San Fransisco, CA');
/*!40000 ALTER TABLE `distribution_center` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `house_number` int(11) NOT NULL,
  `street_name` varchar(45) NOT NULL,
  `apt_number` int(11) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip_code` int(11) NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,5300,'Riverside Dr',NULL,'Cleveland','OH',44315),(2,10000,'W OHare Ave',NULL,'Chicago','IL',60666),(3,1500,'N Access Rd',NULL,'San Fransisco','CA',94128),(4,1030,'Cascades Dr',NULL,'Aurora','OH',44202),(5,10900,'Euclid Ave',NULL,'Cleveland','OH',44106),(6,2439,'Char Ct',NULL,'McFarland','WI',53558);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-27 21:47:48
CREATE DATABASE  IF NOT EXISTS `mysql` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mysql`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: mysql
-- ------------------------------------------------------
-- Server version	5.5.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-27 21:47:48
