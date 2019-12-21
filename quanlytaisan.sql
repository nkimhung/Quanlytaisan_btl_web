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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Pro','Nguyen Kim Hùng','hungnguyenkim@gmail.com','382880007','Hà nội','0','file-1576378881118','1575158400000','1625011200000','Sinh viên năm 3','Nam','1108425600',1,'Active'),(2,'V1','Nguyen kim hung','hungnguyenkim@gmail.com','382880007','ha noi','1108425600','','1108425600','1108425600','muon','Nam','1108425600',2,'Active'),(3,'jkkbb','Nguyễn Kim Hùng','hungnguyenkim12@gmail.com','33333333','hung','0','file-1576811106817','0','86400000','hung','Nam','1108425600',3,'Active'),(4,'jkkbb','hung','hungnguyenkim12@gmail.com','33333333','hung','1123200000',NULL,'1123200000','1548892800000','hung','Nam','1108425600',NULL,'Wait'),(5,'jkkbb','hungkmljh','hungnguyenkim12@gmail.com','33333333','hung','0',NULL,'1514764800000','1546300800000','hung','Nam','1108425600',NULL,'Active'),(6,NULL,'adf','hungnguyenkim12@gmail.com','669951566','hung','1576108800',NULL,'1577491200','1575676800','hung','Nam','1108425600',NULL,'Delete'),(7,'532212','adf','hungnguye@gmail.com','6','yeu','1576195200',NULL,'1576281600','1576886400','admin','Nữ','1108425600',NULL,'Delete'),(8,'jkkbb','gg','0979629183','4464','hung','1576800000',NULL,'1576886400','1576800000','hung','Nam','1108425600',NULL,'Active'),(9,'jkkbb','hung','hungnguyenkim12@gmail.com','2611','fdd','1575590400',NULL,'1576281600','1576713600','admin','Nam','1108425600',NULL,'Wait'),(10,'jkkbb','hung','hungnguyenkim12@gmail.com','2611','fdd','1575590400',NULL,'1576281600','1576713600','admin','Nam','1108425600',NULL,'Wait'),(11,'kskkd','adf','hungnguyenkim12@gmail.com','22','vi ey','1576108800',NULL,'1576886400','1576108800','admin','Nam','1108425600',NULL,'Active'),(12,'22','gfd','hungnguyenkim12@gmail.com','665665','hung','1576627200',NULL,'1576281600','1577145600','admin','Nam','1108425600',NULL,'Active'),(13,'22','gfd','hungnguyenkim12@gmail.com','665665','hung','1576627200',NULL,'1576281600','1577145600','admin','Nam','1108425600',NULL,'Active'),(14,'22','gfd','hungnguyenkim12@gmail.com','665665','hung','1576108800',NULL,'1577232000','1576281600','admin','Nam','1108425600',NULL,'Active'),(15,'22','gfd','hungnguyenkim12@gmail.com','665665','hung','1576713600',NULL,'1577491200','1576800000','admin','Nam','1108425600',NULL,'Active'),(16,'532212','gg','hungnguyenkim12@gmail.com','8855','fdd','1576195200',NULL,'1576800000','1576713600','hung','Nam','1108425600',NULL,'Active'),(17,'d','d','hungnguyenkim12@gmail.com','1','d','1576195200',NULL,'1577404800','1576281600','d','Nữ','1108425600',NULL,'Delete'),(18,'jkkbb','adf','hungnguyenkim12@gmail.com','56446','hung','1576022400000',NULL,'1577232000000','1577491200000','admin','Nam','1108425600',NULL,'Active'),(19,'hung','ggpppp','hungnguyenkim12@gmail.com','2555','hung','1575936000000',NULL,'1576713600000','1577491200000','hung','Nam','1108425600',1,'Active'),(20,'532212','yeu1','hungnguyenkim12@gmail.com','366556','hung','1576540800000',NULL,'1576368000000','1577836800000','admin','Nữ','1108425600',19,'Active'),(21,'532212','yeu2','hungnguyenkim12@gmail.com','366556','hung','1577232000000',NULL,'1292284800000','1552694400000','admin','Nữ','1576288413928',19,'Active'),(22,'123456','Nguyễn Kim','hungnguyenkim280399@gmail.com','986148033','Hải Dương','1576281600000',NULL,'1575158400000','1625011200000','Sinh Vien','Nam','1576423501149',1,'Active'),(23,'532212','met ','hungnguyenkim12@gmail.com','55','Hải Dương','1575676800000',NULL,'1575244800000','1654646400000','Sinh Vien','Nam','1576482935474',1,'Active');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productincart`
--

LOCK TABLES `productincart` WRITE;
/*!40000 ALTER TABLE `productincart` DISABLE KEYS */;
INSERT INTO `productincart` VALUES (1,1,2,5,'Wait','1108425600','1576489893753',1,1),(2,2,1,5,'DELETE','123566456464','1576489898950',1,1),(5,35,3,1,'Returned','1576662015787','1576662015787',3,3),(15,45,1,1,'DELETE','1576743163966','1576825877630',3,1),(16,46,4,1,'ACCEPT','1576743188212','1576743188212',3,3),(18,48,5,1,'Wait','1576822108219','1576822108219',3,3),(19,49,3,2,'Returned','1576822160693','1576825267430',3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productinfo`
--

LOCK TABLES `productinfo` WRITE;
/*!40000 ALTER TABLE `productinfo` DISABLE KEYS */;
INSERT INTO `productinfo` VALUES (1,'may chieu',' may nhap khau hang tot nhat','file-1576378881118','Điện tử',10,1,'1108425600','1576597679220',1,1),(2,'may tinh',' may nhap khau hang tot nhat','file-1576379037311','Điện tử',10,2,'1108425600','1576597684878',1,1),(3,'nha o',' may nhap khau hang tot nhat','file-1576377091734','Gia dụng',3,2,'1108425600','1576825267430',1,1),(4,'cong chuyen',' may nhap khau hang tot nhat','file-1576379997725','Điện tử',10,2,'1108425600','1576597634162',1,1),(5,'Galaxy Note','fds','file-1576055942734','Công nghệ',10,NULL,'1576313168918','1576597649652',NULL,1),(8,'Galaxy Note 15','mơ ước của nhà nhà','file-1576764403528','Công nghệ',1,NULL,'1576384133294','1576764403560',19,1),(9,'Galaxy Note1','gf','file-1576384628038','Điện tử',2,NULL,'1576384632683','1576597662463',1,1),(10,'Galaxy Note2','j','file-1576384682113','Gia dụng',1,NULL,'1576384704907','1576597671049',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productorder`
--

LOCK TABLES `productorder` WRITE;
/*!40000 ALTER TABLE `productorder` DISABLE KEYS */;
INSERT INTO `productorder` VALUES (1,'may chieu',1,1,'1108425600','1108425666','Wait','1108425600','1576489893753',1,1),(2,'May tinh',1,1,'1108425600','1575158400000','Wait','1575158400000','1576489898950',1,1),(35,'nha o',3,NULL,'1575244800000','1576108800000','Returned','1576662015787','1576662015787',3,3),(45,'may chieu',3,1,'1576713600000','1576886400000','DELETE','1576743163966','1576825877630',3,1),(46,'cong chuyen',3,NULL,'1576713600000','1576972800000','ACCEPT','1576743188212','1576743188212',3,3),(48,'Galaxy Note',3,NULL,'1576886400000','1577577600000','Wait','1576822108219','1576822108219',3,3),(49,'nha o',3,1,'1576800000000','1576972800000','Returned','1576822160693','1576825267430',3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin',1,'1108425600',1,NULL,'Admin'),(2,'user1','user1',1,'1108425600',1,NULL,'User'),(4,'hungnk','hungnk',6,NULL,NULL,NULL,'Admin'),(5,'','',2,NULL,NULL,NULL,'Admin'),(6,'','',2,NULL,NULL,NULL,'Admin'),(7,'hungnk','fg',1,NULL,NULL,NULL,'User'),(8,'aaa','aaa',1,NULL,NULL,NULL,'User'),(9,'aaa','aaa',1,NULL,NULL,NULL,'User'),(10,'aaa','aaa',1,NULL,NULL,NULL,'User'),(11,'aaa','aaa',3,NULL,NULL,NULL,'User'),(12,'hungnk','anh',2,NULL,NULL,NULL,'User'),(13,'hungnk','a',2,NULL,NULL,NULL,'User'),(14,'hun','te',2,NULL,NULL,NULL,'User'),(15,'tinh yeu','yeu',2,NULL,NULL,NULL,'User'),(16,'tinh yeull','yeu',2,NULL,NULL,NULL,'User'),(17,'tinh yeullpl','yeu',2,NULL,NULL,NULL,'User'),(18,'tinh yeullplggg','yeu',2,NULL,NULL,NULL,'User'),(19,'tinh yeullplgggl','yeu',2,NULL,NULL,NULL,'User'),(20,'hungnklpllk','h',2,NULL,NULL,NULL,'User'),(21,'kllk','f',6,NULL,NULL,NULL,'User'),(22,'kllkljjj','f',6,NULL,NULL,NULL,'User'),(23,'d','d',1,NULL,NULL,NULL,'Admin'),(24,'hung','r',2,NULL,NULL,NULL,'Admin'),(25,'nhkg','dđ',2,NULL,NULL,NULL,'User'),(26,'kdkfkgjkd','dđ',2,NULL,NULL,NULL,'User'),(27,'olpo','dđ',2,NULL,NULL,NULL,'User'),(28,'g','g',1,NULL,NULL,NULL,'User'),(29,'pp','p',3,NULL,NULL,NULL,'User'),(30,'i','hung',1,NULL,NULL,NULL,'User'),(31,'ii','hung',1,NULL,NULL,NULL,'User'),(32,'iikk','hung',1,NULL,NULL,NULL,'User'),(33,'iikklljj','hung',1,NULL,NULL,NULL,'User'),(34,'iikklljjvccccc','hung',1,NULL,NULL,NULL,'User'),(35,'nkkkh','hung',3,NULL,NULL,NULL,'User'),(36,'hungnklllllll','ghjk',1,NULL,NULL,NULL,'User'),(37,'hunllll','hkkj',2,NULL,NULL,NULL,'User'),(38,'theee','l',3,NULL,NULL,NULL,'User'),(39,'theeek','kk',2,NULL,NULL,NULL,'User'),(40,'hungnkpppp','bcb',3,NULL,NULL,NULL,'User'),(41,'looo','pll',1,NULL,NULL,NULL,'User'),(42,'hungnkv','hungg',1,'1576285965663',NULL,NULL,'Admin'),(43,'yeu','yeu',19,'1576287419231',1,'1','Admin'),(44,'yeu1','yeu1',1,'1576287593713',43,'43','User'),(45,'hungnk1','1',3,'1576288116874',1,'1','User'),(46,'hungnk5555','5555',20,'1576288578948',19,'19','Admin'),(47,'123','123',22,'1576423556345',1,'1','Admin'),(48,'met','met',23,'1576482978693',1,'1','Admin');
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

-- Dump completed on 2019-12-20 14:15:14
