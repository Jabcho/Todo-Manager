-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: todo
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TODOLIST`
--

DROP TABLE IF EXISTS `TODOLIST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TODOLIST` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list` char(200) DEFAULT NULL,
  `userId` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TODOLIST`
--

LOCK TABLES `TODOLIST` WRITE;
/*!40000 ALTER TABLE `TODOLIST` DISABLE KEYS */;
INSERT INTO `TODOLIST` VALUES (8,'ddd','hamzzi'),(12,'dffdfdfd',NULL),(24,'나카스가기','jh'),(26,'달력 추가하고','jabcho'),(27,'jordi','jordi'),(28,'수세미','smile');
/*!40000 ALTER TABLE `TODOLIST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `name` varchar(10) NOT NULL,
  `userId` varchar(30) NOT NULL,
  `hashpw` varchar(1000) NOT NULL,
  `email` varchar(50) NOT NULL,
  `salt` varchar(1000) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId` (`userId`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('wer','3333','2088a89ec10985de0c4f4b5526df633a11de6c6872c37a524fb9566b930092efb3bcda073b59e1383a94d19d61595c03a366a399bb857de0a24736945cb458fe','','1351288613263'),('ee','ee','ce6adab8b0bd12d66faa1d10827f7b375da27dcac975b54f8f018d476774db59cbc0ccb030165514fe3793d5bdcc3eedf714b58d8bfd2f16c899e4f81d5d2f72','','524223066530'),('ham','ham','1a9fa90a9507bc7f3be64ac7c2bdecc7a3b6e8c7d6c4609b5213d712cbcf0d88b4b9a4139801da84aba6072bc9cc3986e1cbe6d98bd19c5bf3b7081abf603f57','ham@ham.com','860990976417'),('jabcho','jabcho','e9398494ac12f4ccad8d129fcddeada7787f2bb73ef1e01dff89d41727b17aea88142f987a19ffd589c43b3eefac7029fb39dd45585389f7e5db111214de8091','jabcho@jabhco.com','390158721141'),('주현','jh','7060edeb64242769dc22311c87d04a187a129466c7e93250c0baf645f55ab4b238bc0834d03eeb3898dd4fdc516d4ac71635cd29fbb07e50bf1422f76d64d789','jh@jh.com','599426696653'),('죠르디','jordi','b200b06bbb6a3f23dade7faf3ed28fbfaf4ae153b8677e10084be2c13039f09a0e6feccc69e019409a5c0ed5a5a94b0ca161c5fa3fb24ce304a53dfc0e06620d','jordi@jordi.com','175104535073'),('sdf','sdf','9860368a7637d0730d8115f76b66b2ab7addcca1940392c26d84621799cf124931494aabd82e5dbe562094663d151bda59a8e24424bc7a040dd77733bee83a8b','','26295679454'),('스마일','smile','96df3bc2ca15d6065f4550dc97e1dc8dcf7bdfed2a1463ebcb131e128710d32ec9140beb77fb1b58f11e8892c66eb8784658b9cab8b6ad097fcd0c4df9b190ce','smile@smile.com','1506820576311');
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

-- Dump completed on 2022-12-10 18:30:18
