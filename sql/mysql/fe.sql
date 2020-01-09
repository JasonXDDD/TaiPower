-- MySQL dump 10.13  Distrib 5.5.29, for Win32 (x86)
--
-- Host: localhost    Database: line161kv
-- ------------------------------------------------------
-- Server version	5.5.29

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
-- Table structure for table `faultevents`
--

DROP TABLE IF EXISTS `faultevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faultevents` (
  `Num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Date` char(10) NOT NULL,
  `Time` char(10) NOT NULL,
  `LineType` char(2) DEFAULT NULL,
  `FaultType` char(4) DEFAULT NULL,
  `Station1` char(10) NOT NULL,
  `Station2` char(10) NOT NULL,
  `Station3` char(10) DEFAULT NULL,
  `File1` char(20) NOT NULL,
  `File2` char(20) NOT NULL,
  `File3` char(20) DEFAULT NULL,
  `STref` char(10) DEFAULT NULL,
  `FLkm` char(10) DEFAULT NULL,
  `Notes` char(50) DEFAULT NULL,
  PRIMARY KEY (`Num`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faultevents`
--

LOCK TABLES `faultevents` WRITE;
/*!40000 ALTER TABLE `faultevents` DISABLE KEYS */;
INSERT INTO `faultevents` VALUES (1,'2014/12/20','12:30','2','','嘉民(北)','斗工(紅)','','20150215025','20150215026','','嘉民(北)','3','14點修護完畢'),(2,'2014/07/20','12:30','2','','嘉民(北)','斗工(紅)','','20150215027','20150215028','','斗工(紅)','1','鹽霧害、已處理'),(3,'2015/01/20','12:50','2','','台東','豐里','','20150215032','20150215033','','豐里','0.1','處理中');
/*!40000 ALTER TABLE `faultevents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-16  1:38:56
