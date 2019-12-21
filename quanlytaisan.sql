-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: quanlytaisan
-- ------------------------------------------------------
-- Server version	5.5.62-log

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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthDate` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `jobStartDate` varchar(255) DEFAULT NULL,
  `jobEndDate` varchar(255) DEFAULT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `timeCreated` varchar(255) DEFAULT NULL,
  `createdBy` int(18) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Pro','Nguyen Kim','hungnguyenkim@gmail.com','382880007','Hà nội','915148800000','file-1576916006270','0','1209600000','Sinh viên năm 3','Nam','1108425600',1,'Active'),(31,NULL,'Nguyen Van dat',NULL,'11',NULL,NULL,'file-1576927716752',NULL,NULL,NULL,NULL,'1576920260633',31,'Active'),(32,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1576921525945',1,'Active'),(33,NULL,NULL,NULL,NULL,NULL,'0',NULL,'0','0',NULL,NULL,'1576927982909',1,'Delete'),(34,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1576937055858',1,'Active');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productincart`
--

DROP TABLE IF EXISTS `productincart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productincart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productOrderID` int(11) DEFAULT NULL,
  `productInfoID` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `timeCreated` varchar(255) DEFAULT NULL,
  `timeModified` varchar(255) DEFAULT NULL,
  `createdBy` int(18) DEFAULT NULL,
  `modifiedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productincart`
--

LOCK TABLES `productincart` WRITE;
/*!40000 ALTER TABLE `productincart` DISABLE KEYS */;
INSERT INTO `productincart` VALUES (20,50,12,2,'Returned','1576920566827','1576920710003',31,1),(21,51,13,2,'Returned','1576920654581','1576928309092',31,1),(22,52,12,1,'Returned','1576921573693','1576928396752',32,1),(23,53,12,1,'Returned','1576928113430','1576928350928',33,1),(24,54,13,1,'Returned','1576928134504','1576929391361',33,1),(25,55,12,1,'Returned','1576928245613','1576928325926',31,1),(26,56,13,8,'Returned','1576928264188','1576928418041',31,1),(27,57,13,5,'Returned','1576929009781','1576929370295',31,1),(28,58,12,5,'Returned','1576930216792','1576930284611',31,1),(29,59,12,5,'ACCEPT','1576930256120','1576934313229',31,1),(30,60,12,1,'Returned','1576930755338','1576931326224',31,1),(31,61,13,1,'ACCEPT','1576934378632','1576936262762',31,1),(32,62,13,1,'ACCEPT','1576939219269','1576939320055',31,1),(33,63,18,1,'ACCEPT','1576939249440','1576939328656',31,1);
/*!40000 ALTER TABLE `productincart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productinfo`
--

DROP TABLE IF EXISTS `productinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `amountInWarehouse` int(11) DEFAULT NULL,
  `employeeIDcreate` int(11) DEFAULT NULL,
  `timeCreated` varchar(255) DEFAULT NULL,
  `timeModified` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `modifiedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productinfo`
--

LOCK TABLES `productinfo` WRITE;
/*!40000 ALTER TABLE `productinfo` DISABLE KEYS */;
INSERT INTO `productinfo` VALUES (12,'Galaxy Note','Dung lượng pin 3500mAh và 4300mAh (tiêu chuẩn) là giá trị tiêu chuẩn đã được kiểm tra trong phòng thí nghiệm của bên thứ ba.','file-1576937703254','Điện tử',3,NULL,'1576920164315','1576937703280',1,1),(13,'Ti vi','Ti vi','file-1576939031294','Công nghệ',16,NULL,'1576920230251','1576939320055',1,1),(14,'Máy tính để bàn','- Mainboard: Asrock E3V5 WS socket 1151 full ATX dòng 4 khe ram full 64GB \n\n- CPU: Xeon E3-1230V5 (3.4Ghz turbo 3.8Ghz / 8M cache, 4 Cores, 8 Threads ) \n\n- VGA: MSI / ASUS GTX 1060 OC 2 fan bản 6GB / 192bit / DDR5 dựng hình - render - Game','file-1576937999305','Công nghệ',5,NULL,'1576937999335','1576937999313',1,1),(15,'Laptop dell','CPU: Intel® Core™ i5-10210U (1.6GHz up to 4.2GHz, 4 nhân 8 luồng, 6MB Cache)\nRam: 8GB LPDDR3 2133MHz\nỔ cứng: 512GB PCIe SSD\nVGA: NVIDIA GeForce MX250 2GB GDDR5\nDisplay: 14.0\" Full HD (1920 x 1080)','file-1576938210730','Điện tử',20,NULL,'1576938210758','1576938210742',1,1),(16,'Bàn ghế văn phòng','Bộ bàn ghê chuyên dành cho các văn phòng','file-1576938286389','Gia dụng',10,NULL,'1576938286413','1576938286396',1,1),(17,'Ghế ngồi ','Ghế tiện lợi di chuyển thích hợp cho mọi văn phòng','file-1576938377179','Gia dụng',15,NULL,'1576938377211','1576938377189',1,1),(18,'Máy in','Máy in hàng nhập khẩu chất lượng tuyệt vời','file-1576938443837','Điện tử',4,NULL,'1576938443862','1576939328656',1,1),(19,'laptop','Máy tính thích hợp cho dân văn phòng. ','file-1576938561135','Điện tử',3,NULL,'1576938561159','1576938561145',1,1),(20,'Máy chiếu','Máy chiếu công nghệ mới của Nhật','file-1576938609106','Công nghệ',10,NULL,'1576938609137','1576938609122',1,1),(21,'Máy in Canon','Máy in thế hệ mới','file-1576938662258','Khác',5,NULL,'1576938662284','1576938662267',1,1);
/*!40000 ALTER TABLE `productinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productorder`
--

DROP TABLE IF EXISTS `productorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `employeeIDrequest` int(11) DEFAULT NULL,
  `employeeIDresponse` int(11) DEFAULT NULL,
  `dateBorrow` varchar(255) DEFAULT NULL,
  `dateReturn` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `timeCreated` varchar(255) DEFAULT NULL,
  `timeModified` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `modifiedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productorder`
--

LOCK TABLES `productorder` WRITE;
/*!40000 ALTER TABLE `productorder` DISABLE KEYS */;
INSERT INTO `productorder` VALUES (50,'Galaxy Note',31,1,'1576886400000','1577059200000','Returned','1576920566827','1576920710003',31,1),(51,'Ti vi',31,1,'1576886400000','1577145600000','Returned','1576920654581','1576928309092',31,1),(52,'Galaxy Note',32,1,'1576886400000','1577318400000','Returned','1576921573693','1576928396752',32,1),(53,'Galaxy Note',33,1,'1576886400000','1577491200000','Returned','1576928113430','1576928350928',33,1),(54,'Ti vi',33,1,'1576886400000','1577145600000','Returned','1576928134504','1576929391361',33,1),(55,'Galaxy Note',31,1,'1576886400000','1577491200000','Returned','1576928245613','1576928325926',31,1),(56,'Ti vi',31,1,'1576886400000','1577491200000','Returned','1576928264188','1576928418041',31,1),(57,'Ti vi',31,1,'1576886400000','1577318400000','Returned','1576929009781','1576929370295',31,1),(58,'Galaxy Note',31,1,'1576972800000','1577404800000','Returned','1576930216792','1576930284611',31,1),(59,'Galaxy Note',31,1,'1577232000000','1577404800000','ACCEPT','1576930256120','1576934313229',31,1),(60,'Galaxy Note',31,1,'1576886400000','1576972800000','Returned','1576930755338','1576931326224',31,1),(61,'Ti vi',31,1,'1576886400000','1577491200000','ACCEPT','1576934378632','1576936262762',31,1),(62,'Ti vi',31,1,'1576972800000','1577491200000','ACCEPT','1576939219269','1576939320055',31,1),(63,'Máy in',31,1,'1576972800000','1577145600000','ACCEPT','1576939249440','1576939328656',31,1);
/*!40000 ALTER TABLE `productorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `timeCreated` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `modifiedBy` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin',1,'1108425600',1,NULL,'Admin'),(52,'user','user',31,'1576920260633',1,'1','User'),(53,'hung','hung',32,'1576921525945',1,'1','User'),(54,'k','k',33,'1576927982909',1,'1','User'),(55,'User1','User1',34,'1576937055858',1,'1','User');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-21 23:40:14
