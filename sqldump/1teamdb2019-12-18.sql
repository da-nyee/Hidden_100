-- MySQL dump 10.14  Distrib 5.5.60-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: db2019
-- ------------------------------------------------------
-- Server version	5.5.60-MariaDB

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
-- Table structure for table `t1_admin`
--

DROP TABLE IF EXISTS `t1_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_admin` (
  `admin_name` varchar(15) NOT NULL,
  `admin_id` varchar(15) NOT NULL DEFAULT '',
  `admin_pass` varchar(20) NOT NULL,
  `admin_email` varchar(40) NOT NULL,
  `admin_phone` varchar(20) NOT NULL,
  `admin_bday` varchar(20) NOT NULL,
  `regist_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `admin_id` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_admin`
--

LOCK TABLES `t1_admin` WRITE;
/*!40000 ALTER TABLE `t1_admin` DISABLE KEYS */;
INSERT INTO `t1_admin` VALUES ('한혜경','aaa6495','aaa','nn@gmail.com','01032313893','980727','2019-12-10 17:28:29'),('관리인2','abc123','abc123','abc123@hanmail.net','01058293230','970706','2019-12-18 10:14:44'),('admin','admin','admin','admin@gmail.com','01054329876','920219','2019-12-10 12:30:58'),('admin2','admin2','admin2','admin2@gmail.com','01034342323','930218','2019-12-10 17:58:05'),('admin4','admin4','admin4','admin4@gachon.ac.kr','01052834983','940328','2019-12-18 10:12:42'),('admin5','admin5','admin5','admin5@gachon.ac.kr','01053282392','980809','2019-12-18 10:14:05'),('관리인','adminad','adminad','adminad@gc.gachon.ac.kr','01085349129','911028','2019-12-18 09:58:13'),('김설현','aoaoaoao','aoaoaoao','aoaoaoao@naver.com','01047283239','940329','2019-12-18 10:18:44'),('이다은','danyee','danyee','danyee@gmail.com','01056953023','970418','2019-12-18 10:10:01'),('이루리','dream','cometrue','dream@naver.com','01058384382','930618','2019-12-18 09:59:04'),('김가천','gachoni','gachoni','gachoni@gachon.ac.kr','01083953894','880228','2019-12-18 10:07:27'),('박안경','glasssss','glasssss','glasssss@naver.com','01048239293','921028','2019-12-18 10:15:52'),('정해인','haein','haein','haein@gmail.com','01028321372','930917','2019-12-18 10:18:14'),('유재석','jaesuk','jaesuk','jaesuk@gmail.com','01058239231','850830','2019-12-18 10:16:21'),('여진구','jingggg9','jingggg9','jingggg9@gmail.com','01072392193','970528','2019-12-18 10:17:48'),('lws','lws','test','amicusadaras6@gmail.com','01020770883','950920','2019-12-12 10:51:12'),('이우석','lwssss','lwssss','lwssss@naver.com','01038842828','950218','2019-12-18 10:15:16'),('신규관리자','newadmin','12345','q@gmail.com','01021314554','980727','2019-12-13 05:53:42'),('뉴비','newbie','newbie','newbie@newbie.com','01012181218','971218','2019-12-18 06:24:47'),('뉴비2','newbie2','newbie2','newbie2@naver.com','01058493892','970719','2019-12-18 10:02:36'),('뉴비3','newbie3','newbie3','newbie3@gmail.com','01058938932','940908','2019-12-18 10:03:30'),('새로운','newnew','newnew','newnew@hanmail.net','01085389124','951025','2019-12-18 09:59:56'),('신애리','newnewnew','newnewnew','newnewnew@naver.com','01058834829','930729','2019-12-18 10:16:52'),('sunday','sss123','123','g111@gmail.com','01032313893','980727','2019-12-12 15:11:48'),('이우주','universe','universe','universe@naver.com','01023572329','970422','2019-12-18 10:10:27'),('하얀색','whites','whites','whites@naver.com','01082828392','921027','2019-12-18 10:17:23'),('연두색','yellowgreen','ygreen','yellowgreen@hanmail.net','01058892839','990918','2019-12-18 10:01:28'),('박예림','yeyeye','yeyeye','yeyeye@naver.com','01048239239','971029','2019-12-18 10:11:08'),('유애나','youna','youna','youna@gmail.com','01058398428','970421','2019-12-18 10:09:37'),('오유리','youriri','youriri','youriri@gmail.com','01025832921','980503','2019-12-18 10:13:09');
/*!40000 ALTER TABLE `t1_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t1_deal`
--

DROP TABLE IF EXISTS `t1_deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_deal` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `goo_id` int(11) NOT NULL,
  `goo_name` varchar(50) NOT NULL,
  `goo_type` varchar(50) NOT NULL,
  `goal_price` int(11) NOT NULL,
  `seller_id` varchar(20) NOT NULL,
  `buyer_id` varchar(20) NOT NULL,
  `invest_coin` int(11) NOT NULL,
  `invest_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`num`),
  KEY `goo_id` (`goo_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `t1_deal_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `t1_member` (`mem_id`),
  CONSTRAINT `t1_deal_ibfk_1` FOREIGN KEY (`goo_id`) REFERENCES `t1_goods` (`goo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_deal`
--

LOCK TABLES `t1_deal` WRITE;
/*!40000 ALTER TABLE `t1_deal` DISABLE KEYS */;
INSERT INTO `t1_deal` VALUES (15,937698,'에어팟2 애플 블루투스 이어폰','digital',50000,'sun123','qkdrnvhrrur',20000,'2019-12-10 18:41:59','win'),(17,937698,'에어팟2 애플 블루투스 이어폰','digital',50000,'sun123','qkdrnvhrrur',10000,'2019-12-10 18:44:08','win'),(21,946420,'회색 모자','clothes',5000,'sun123','qkdrnvhrrur',5000,'2019-12-12 05:54:59','active'),(23,937698,'에어팟2 애플 블루투스 이어폰','digital',50000,'sun123','qkdrnvhrrur',20000,'2019-12-12 05:56:18','win'),(24,937698,'에어팟2 애플 블루투스 이어폰','digital',50000,'sun123','1',500,'2019-12-12 05:57:14','lose'),(28,36926,'포스터 ','clothes',2000,'sun123','qkdrnvhrrur',5000,'2019-12-12 17:12:26','active'),(30,946420,'회색 모자','clothes',5000,'sun123','test',1000,'2019-12-13 05:12:23','active'),(32,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','lws',4000,'2019-12-13 05:26:51','active'),(44,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','qkdrnvhrrur',1111,'2019-12-14 13:27:05','active'),(63,937698,'에어팟2 애플 블루투스 이어폰','digital',50000,'sun123','test',4000,'2019-12-14 17:55:44','lose'),(64,36044,'에어팟2','digital',120000,'sun123','sun123',100,'2019-12-15 06:23:23','fail'),(65,36926,'립스틱 니케 세트','makeup',2000,'sun123','qkdrnvhrrur',10000,'2019-12-15 17:19:19','active'),(70,36926,'립스틱 니케 세트','makeup',2000,'sun123','sun123',600,'2019-12-16 07:09:25','active'),(71,36926,'립스틱 니케 세트','makeup',2000,'sun123','sun123',900,'2019-12-16 07:09:31','active'),(72,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','sun123',200,'2019-12-16 07:34:36','active'),(74,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','sun123',200,'2019-12-16 10:13:17','active'),(76,36926,'립스틱 니케 세트','makeup',2000,'sun123','blueming',4000,'2019-12-16 10:14:14','active'),(82,813681,'에어팟2','digital',120000,'sun123','sun123',5200,'2019-12-16 17:28:29','fail'),(83,46722,'lp플레이어','digital',500000,'qkdrnvhrrur','test',6000,'2019-12-17 05:12:09','active'),(84,195016,'핸드폰','digital',1000000,'qkdrnvhrrur','lsh2757',2323,'2019-12-17 06:33:25','active'),(88,981225,'수줍은 어피치 필통','others',8000,'test','blueming',4000,'2019-12-17 17:29:29','fail'),(89,510332,'수줍은 어피치 필통','others',8000,'test','blueming',6000,'2019-12-18 05:15:44','fail'),(92,860400,'둥글둥글 화분','others',8000,'blueming','blueming',5000,'2019-12-18 05:21:41','active'),(93,860400,'둥글둥글 화분','others',8000,'blueming','sun123',12000,'2019-12-18 05:22:15','active'),(95,195016,'핸드폰','digital',1000000,'qkdrnvhrrur','sun123',11000205,'2019-12-18 07:06:04','active'),(96,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','sun123',7000,'2019-12-18 07:06:43','active'),(97,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','test',14000,'2019-12-18 07:07:27','active'),(101,626209,'폴로 스웨터/니트','clothes',14000,'test','leeje',15000,'2019-12-18 08:10:40','active'),(102,831332,'프라모델','clothes',50000,'lws','mma100',200,'2019-12-18 09:39:15','active'),(103,359206,'게임기!!!','digital',10000,'qkdrnvhrrur','mma100',4000,'2019-12-18 09:39:23','active'),(104,399597,'즉석 카메라','digital',20000,'lws','mma100',1800,'2019-12-18 09:39:34','active'),(105,831332,'프라모델','clothes',50000,'lws','pp100',5200,'2019-12-18 09:42:03','active'),(106,359206,'게임기!!!','digital',10000,'qkdrnvhrrur','pp100',7000,'2019-12-18 09:42:12','active'),(107,898992,'포그바 친필 사인 유니폼!!!','clothes',50000,'lws','pp100',4000,'2019-12-18 09:42:20','active'),(108,399597,'즉석 카메라','digital',20000,'lws','pp100',200,'2019-12-18 09:42:34','active'),(109,626209,'폴로 스웨터/니트','clothes',14000,'test','pp100',1800,'2019-12-18 09:43:29','active'),(110,860400,'둥글둥글 화분','others',8000,'blueming','pp100',1600,'2019-12-18 09:43:46','active'),(111,46722,'lp플레이어','digital',500000,'qkdrnvhrrur','pp100',200,'2019-12-18 09:43:53','active'),(112,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','pp100',200,'2019-12-18 09:44:04','active'),(113,399597,'즉석 카메라','digital',20000,'lws','pp100',100,'2019-12-18 09:44:12','active'),(114,748679,'인형!!!','clothes',10000,'minsuk','kk100',1000,'2019-12-18 09:45:29','active'),(115,831332,'프라모델','clothes',50000,'lws','kk100',1000,'2019-12-18 09:45:39','active'),(116,748679,'인형!!!','clothes',10000,'minsuk','hyunzi',8000,'2019-12-18 09:45:43','active'),(117,898992,'포그바 친필 사인 유니폼!!!','clothes',50000,'lws','kk100',1000,'2019-12-18 09:45:47','active'),(118,898992,'포그바 친필 사인 유니폼!!!','clothes',50000,'lws','hyunzi',7000,'2019-12-18 09:45:51','active'),(119,399597,'즉석 카메라','digital',20000,'lws','kk100',1000,'2019-12-18 09:45:57','active'),(120,46722,'lp플레이어','digital',500000,'qkdrnvhrrur','kk100',1000,'2019-12-18 09:46:04','active'),(121,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','kk100',1000,'2019-12-18 09:46:12','active'),(122,195016,'핸드폰','digital',1000000,'qkdrnvhrrur','kk100',1000,'2019-12-18 09:46:17','active'),(123,570763,'미니미니 스탠드','furniture',14000,'youyou','minsuk',10000,'2019-12-18 09:48:01','active'),(124,32246,'침대 옆 협탁','furniture',15000,'kk100','youyou',50000,'2019-12-18 09:48:02','active'),(125,252203,'코타츠!!!','furniture',100000,'minsuk','youyou',30000,'2019-12-18 09:48:10','active'),(126,134068,'오래된 시계','others',15000,'kim1021','minsuk',5000,'2019-12-18 09:48:24','active'),(127,626209,'폴로 스웨터/니트','clothes',14000,'test','minsuk',90000,'2019-12-18 09:48:51','active'),(128,681382,'크리스마스 트리','others',20000,'jes1009','minsuk',20000,'2019-12-18 09:49:23','active'),(129,46722,'lp플레이어','digital',500000,'qkdrnvhrrur','minsuk',80000,'2019-12-18 09:49:44','active'),(130,626209,'폴로 스웨터/니트','clothes',14000,'test','rimrim',60000,'2019-12-18 09:49:57','active'),(131,681382,'크리스마스 트리','others',20000,'jes1009','rimrim',20000,'2019-12-18 09:50:32','active'),(132,964934,'에뛰드 마스카라','makeup',3500,'hyunzi','rimrim',3500,'2019-12-18 09:51:00','active'),(133,730330,'나무 의자','furniture',21000,'kim1021','minsuk',20000,'2019-12-18 09:51:14','active'),(134,831332,'프라모델','clothes',50000,'lws','mma100',5200,'2019-12-18 09:51:17','active'),(135,46722,'lp플레이어','digital',500000,'qkdrnvhrrur','mma100',1000,'2019-12-18 09:51:38','active'),(136,964934,'에뛰드 마스카라','makeup',3500,'hyunzi','minsuk',10000,'2019-12-18 09:51:58','active'),(137,100027,'아이유 모던타임즈 CD','others',45000,'blueming','sun123',20000,'2019-12-18 09:54:20','active'),(138,964934,'에뛰드 마스카라','makeup',3500,'hyunzi','sun123',7000,'2019-12-18 09:54:29','active'),(139,100027,'아이유 모던타임즈 CD','others',45000,'blueming','youyou',5000,'2019-12-18 09:55:00','active'),(140,32246,'침대 옆 협탁','furniture',15000,'kk100','ujeong',45000,'2019-12-18 09:55:48','active'),(141,278473,'노란 소파','furniture',120000,'sun123','ujeong',55000,'2019-12-18 09:56:03','active'),(142,359206,'게임기!!!','digital',10000,'qkdrnvhrrur','ujeong',50000,'2019-12-18 09:56:14','active'),(143,860400,'둥글둥글 화분','others',8000,'blueming','ujeong',50000,'2019-12-18 09:56:24','active'),(144,100027,'아이유 모던타임즈 CD','others',45000,'blueming','ujeong',30000,'2019-12-18 09:56:40','active'),(145,730330,'나무 의자','furniture',21000,'kim1021','jes1009',1000,'2019-12-18 09:58:09','active'),(146,570763,'미니미니 스탠드','furniture',14000,'youyou','jes1009',1000,'2019-12-18 09:58:15','active'),(147,46722,'lp플레이어','digital',500000,'qkdrnvhrrur','jes1009',1000,'2019-12-18 09:58:21','active'),(148,425746,'맥 멜바 블러셔','makeup',18000,'ujeong','paper',5000,'2019-12-18 09:58:24','active'),(149,860400,'둥글둥글 화분','others',8000,'blueming','jes1009',1000,'2019-12-18 09:58:27','active'),(150,500618,'식탁','furniture',150000,'youyou','jes1009',1000,'2019-12-18 09:58:32','active'),(151,50004,'디올 향수 립스틱 세트','makeup',25000,'jes1009','paper',10000,'2019-12-18 09:58:34','active'),(152,359206,'게임기!!!','digital',10000,'qkdrnvhrrur','jes1009',1000,'2019-12-18 09:58:37','active'),(153,195016,'핸드폰','digital',1000000,'qkdrnvhrrur','jes1009',1000,'2019-12-18 09:58:42','active'),(154,144145,'텀블러','clothes',50000,'qkdrnvhrrur','paper',20000,'2019-12-18 09:58:43','active'),(155,964934,'에뛰드 마스카라','makeup',3500,'hyunzi','paper',20000,'2019-12-18 09:58:54','active'),(156,50004,'디올 향수 립스틱 세트','makeup',25000,'jes1009','kim1021',1000,'2019-12-18 09:59:02','active'),(157,570763,'미니미니 스탠드','furniture',14000,'youyou','kim1021',1000,'2019-12-18 09:59:16','active'),(158,425746,'맥 멜바 블러셔','makeup',18000,'ujeong','kim1021',1000,'2019-12-18 09:59:23','active'),(159,359206,'게임기!!!','digital',10000,'qkdrnvhrrur','kim1021',4000,'2019-12-18 09:59:27','active'),(160,100027,'아이유 모던타임즈 CD','others',45000,'blueming','kim1021',7000,'2019-12-18 09:59:33','active'),(161,167712,'조말론 디퓨져 라임앤바질','others',100,'sun123','pp100',1500,'2019-12-18 10:01:42','win'),(162,167712,'조말론 디퓨져 라임앤바질','others',100,'sun123','2',1500,'2019-12-18 10:01:49','lose'),(163,167712,'조말론 디퓨져 라임앤바질','others',100,'sun123','mma100',1500,'2019-12-18 10:02:00','lose'),(164,359206,'게임기!!!','digital',10000,'qkdrnvhrrur','mma100',1000,'2019-12-18 10:02:54','active'),(165,748679,'인형!!!','clothes',10000,'minsuk','mma100',1000,'2019-12-18 10:03:04','active'),(166,359206,'게임기!!!','digital',10000,'qkdrnvhrrur','mma100',4000,'2019-12-18 10:03:09','active'),(167,860400,'둥글둥글 화분','others',8000,'blueming','mma100',200,'2019-12-18 10:03:16','active'),(168,100027,'아이유 모던타임즈 CD','others',45000,'blueming','mma100',100,'2019-12-18 10:03:27','active'),(169,681382,'크리스마스 트리','others',20000,'jes1009','mma100',1000,'2019-12-18 10:03:32','active'),(170,898992,'포그바 친필 사인 유니폼!!!','clothes',50000,'lws','mma100',200,'2019-12-18 10:03:47','active'),(171,611577,'샤넬 향수!!','makeup',100000,'paper','mma100',1000,'2019-12-18 10:07:19','active'),(172,500618,'식탁','furniture',150000,'youyou','mma100',1000,'2019-12-18 10:07:50','active'),(173,24615,'탁상 스탠드','furniture',20000,'kim1021','2',6000,'2019-12-18 10:07:55','active'),(174,570763,'미니미니 스탠드','furniture',14000,'youyou','mma100',100,'2019-12-18 10:08:06','active'),(175,32246,'침대 옆 협탁','furniture',15000,'kk100','mma100',1000,'2019-12-18 10:08:14','active'),(176,195016,'핸드폰','digital',1000000,'qkdrnvhrrur','mma100',200,'2019-12-18 10:08:19','active'),(177,100027,'아이유 모던타임즈 CD','others',45000,'blueming','mma100',5200,'2019-12-18 10:08:24','active'),(178,831332,'프라모델','clothes',50000,'lws','mma100',200,'2019-12-18 10:08:39','active'),(179,679030,'팩','makeup',10000,'pp100','test2',5000,'2019-12-18 10:08:52','win'),(180,679030,'팩','makeup',10000,'pp100','mma100',5000,'2019-12-18 10:08:55','lose'),(181,679030,'팩','makeup',10000,'pp100','wowoo',5000,'2019-12-18 10:09:56','lose'),(182,681382,'크리스마스 트리','others',20000,'jes1009','mma100',200,'2019-12-18 10:10:26','active'),(183,319263,'오디오테크니카 헤드폰','digital',200000,'moon123','mma100',200,'2019-12-18 10:10:37','active'),(184,144145,'텀블러','clothes',50000,'qkdrnvhrrur','mma100',100,'2019-12-18 10:11:14','active'),(185,740266,'캐논 카메라','digital',35000,'test','2',40000,'2019-12-18 10:25:13','win'),(186,740266,'캐논 카메라','digital',35000,'test','blueming',30000,'2019-12-18 10:26:01','lose'),(187,592482,'눈처럼 하얀 카메라','digital',30000,'test2','test',45000,'2019-12-18 10:27:07','win'),(188,588887,'분홍빛 블러셔','makeup',4000,'youyou','rimrim',6500,'2019-12-18 10:29:52','lose'),(189,588887,'분홍빛 블러셔','makeup',4000,'youyou','test3',5000,'2019-12-18 10:30:12','win'),(190,887259,'검정색 마스카라','makeup',7000,'blueming','test',8000,'2019-12-18 10:31:26','win'),(191,887259,'검정색 마스카라','makeup',7000,'blueming','leeje',6000,'2019-12-18 10:31:36','lose'),(192,223241,'불불 스탠드','furniture',28000,'namnam','test',40000,'2019-12-18 10:35:29','lose'),(193,223241,'불불 스탠드','furniture',28000,'namnam','leeje',30000,'2019-12-18 10:35:41','win'),(194,807589,'미니 스탠드','furniture',26000,'test','2',19000,'2019-12-18 10:36:22','lose'),(195,807589,'미니 스탠드','furniture',26000,'test','test3',30000,'2019-12-18 10:36:34','win'),(196,164536,'수줍은 어피치 필통','others',8000,'test','2',30000,'2019-12-18 10:37:41','win'),(197,330548,'수줍은 어피치 필통','others',6000,'test','2',20000,'2019-12-18 10:58:40','lose'),(198,330548,'수줍은 어피치 필통','others',6000,'test','test2',15000,'2019-12-18 10:58:53','win');
/*!40000 ALTER TABLE `t1_deal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t1_goods`
--

DROP TABLE IF EXISTS `t1_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_goods` (
  `goo_id` int(11) NOT NULL,
  `goo_name` varchar(50) NOT NULL,
  `goo_type` varchar(50) NOT NULL,
  `goal_price` int(11) NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  `regist_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time_year` int(11) NOT NULL,
  `time_month` int(11) NOT NULL,
  `time_day` int(11) NOT NULL,
  `time_hour` int(11) NOT NULL,
  `time_minute` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `goo_img` varchar(40) DEFAULT NULL,
  `shipment` varchar(30) DEFAULT NULL,
  `goo_info` text,
  PRIMARY KEY (`goo_id`),
  UNIQUE KEY `goo_id` (`goo_id`),
  KEY `mem_id` (`mem_id`),
  CONSTRAINT `t1_goods_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `t1_member` (`mem_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_goods`
--

LOCK TABLES `t1_goods` WRITE;
/*!40000 ALTER TABLE `t1_goods` DISABLE KEYS */;
INSERT INTO `t1_goods` VALUES (24615,'탁상 스탠드','furniture',20000,'kim1021','2019-12-18 09:49:11',2019,12,25,18,30,'active','1576662551255.jpg',NULL,'1년 전에 구매해서 실제 사용은 얼마 안했어요. 인테리어 바꾸면서 판매합니다. '),(32246,'침대 옆 협탁','furniture',15000,'kk100','2019-12-18 09:47:27',2019,12,29,18,30,'active','1576662465200.jpg',NULL,'이사가기 전에 처분합니다.\r\n1년 전에 사서 약간 사용했어요. '),(36044,'에어팟2','digital',120000,'sun123','2019-12-14 18:19:52',2019,12,16,3,30,'finish','1576347687617.jpg','우체국:691-445395-44913','구매일시: 올해 2월\r\n사용기간: 10시간 이내 \r\n상태: A \r\n사용 흔적 거의 없구요. 실제 사용도 별로 안했어요.'),(36926,'립스틱 니케 세트','makeup',2000,'sun123','2019-12-11 07:01:11',2019,12,21,20,30,'active','1576191416746.jpg',NULL,'상세정보 세트로 사서 발색 한번 해보고 안쓰네요~ '),(46722,'lp플레이어','digital',500000,'qkdrnvhrrur','2019-12-17 05:09:44',2019,12,20,14,30,'active','1576559384985.png',NULL,'구매 일시 : 2018년도\r\n사용 기간 : 1년\r\n상태 : 특 A급'),(50004,'디올 향수 립스틱 세트','makeup',25000,'jes1009','2019-12-18 09:56:21',2019,12,31,18,30,'active','1576662981169.jpg',NULL,'선물받았는데 먼지만 생기고 있어서 팝니다. 사용 안하고 박스만 한번 풀어봤네요. '),(100027,'아이유 모던타임즈 CD','others',45000,'blueming','2019-12-18 09:53:33',2019,12,25,15,30,'active','1576662813770.jpg',NULL,'아이유 세상에서 제일 예쁘다 !!!!!!!!'),(102641,'수줍은 어피치 필통','others',8000,'leeje','2019-12-18 08:08:47',2019,12,18,17,30,'canceled','1576656527686.jpg',NULL,'어피치 귀여워'),(134068,'오래된 시계','others',15000,'kim1021','2019-12-18 09:37:38',2019,12,29,18,30,'active','1576661858987.jpg',NULL,'분위기만 오래되었지 산지 얼마 안됐어요. '),(144145,'텀블러','clothes',50000,'qkdrnvhrrur','2019-12-18 09:30:54',2019,12,20,18,30,'active','1576661454391.jpg',NULL,'구매일시:2018년\r\n사용기간:3개월\r\n뉴욕에서 공수해온 텀블러!!!'),(160870,'전공책','clothes',20000,'sun123','2019-12-16 11:43:04',2019,12,16,23,30,'canceled','1576496584111.jpg',NULL,'지긋지긋해'),(164536,'수줍은 어피치 필통','others',8000,'test','2019-12-18 10:37:27',2019,12,18,19,40,'finish','1576665447906.jpg',NULL,'어피치 정말 귀엽지 않나요?'),(167712,'조말론 디퓨져 라임앤바질','others',100,'sun123','2019-12-18 10:01:30',2019,12,18,19,7,'finish','1576663290223.jpg',NULL,'저는 별로인 향이라 판매합니다ㅠㅠ'),(181420,'맥 립스틱 멀잇오버','makeup',16000,'test','2019-12-13 05:25:28',2019,12,18,10,30,'canceled','1576214728634.jpg',NULL,'맥에서 유명한 MLBB 컬러 립스틱입니다. 한번 테스트 하느라 써보고 색이 안 맞아서 팔아요!'),(195016,'핸드폰','digital',1000000,'qkdrnvhrrur','2019-12-17 05:13:25',2019,12,20,14,30,'active','1576559605720.jpg',NULL,'구매 일시 : 2010년\r\n사용 기간 : 3년\r\n상태 : b급\r\n이젠 구하고 싶어도 못 구하는 2g폰!!!'),(223241,'불불 스탠드','furniture',28000,'namnam','2019-12-18 10:35:17',2019,12,18,19,39,'finish','1576665317677.jpg',NULL,'열공 스탠드에요. 응모 많이많이 해주세요 !!!!!!'),(252203,'코타츠!!!','furniture',100000,'minsuk','2019-12-18 09:46:16',2019,12,21,18,30,'active','1576662401892.jpg',NULL,'구매일시:2017년\r\n사용기간:1년\r\n집 보일러가 좋아서 팝니다.'),(278473,'노란 소파','furniture',120000,'sun123','2019-12-18 09:54:02',2019,12,29,18,30,'active','1576662842537.jpg',NULL,'산지 6개월밖에 안됨. 이사가는 집 벽지랑 너무 안어울려서 올립니다 ㅠㅠ '),(285996,'알로에 화분','others',15000,'sun123','2019-12-17 05:07:34',2019,12,17,14,30,'canceled','1576559254431.jpg',NULL,'2달 정도 키웠는데 저희 집 고양이가 자꾸 공격해서 보내줘야겠어요.\r\n상태 좋습니다. 벌래 하나 없구요 포장도 꼼꼼히 해서 보내드릴게요! '),(299812,'클래식한 통기타','others',30000,'blueming','2019-12-16 10:13:09',2019,12,21,16,30,'canceled','1576491189211.jpg',NULL,'새로운 통기타를 구매해서 그동안 사용했던 통기타를 판매합니다!!'),(302194,'꼼데가르송 가디건 베이지색','clothes',16000,'test','2019-12-16 10:07:49',2019,12,20,18,30,'canceled','1576490869263.jpg',NULL,'하트가 귀여운 꼼데가르송 가디건이에요. 사이즈가 작아져서 팔아요ㅠㅠ'),(319263,'오디오테크니카 헤드폰','digital',200000,'moon123','2019-12-12 22:16:24',2019,12,27,20,30,'active','1576188984746.jpg',NULL,'쿠션감도 좋고 다 좋은데 제 취향이 아니에요 '),(330548,'수줍은 어피치 필통','others',6000,'test','2019-12-18 10:58:31',2019,12,18,20,0,'finish','1576666711416.jpg',NULL,'수줍수줍 어피치'),(359206,'게임기!!!','digital',10000,'qkdrnvhrrur','2019-12-18 09:32:48',2019,12,20,23,30,'active','1576661568554.jfif',NULL,'구매일시:2014년\r\n사용기간:3년\r\n추억의 게임기!!! 잘 돌아 갑니다:)'),(360975,'귀여운','furniture',10000,'sun123','2019-12-09 19:24:54',2019,12,17,20,30,'canceled','1575920027531.jpg',NULL,'우리 집 식탁에 안맞아서 팔아요. 고양이가 잠깐 앉아서 고양이 털이 묻어있을 수도 있습니다. '),(399597,'즉석 카메라','digital',20000,'lws','2019-12-18 09:37:13',2019,12,23,10,30,'active','1576661833784.jpg',NULL,'구매일시:2017년\r\n사용기간:1년\r\n감성 폴라로이드!!!'),(425746,'맥 멜바 블러셔','makeup',18000,'ujeong','2019-12-18 09:55:30',2019,12,22,18,30,'active','1576662930887.jfif',NULL,'웜톤 쿨톤 모두에게 어울리는 블러셔입니다 ~~~'),(425960,'사진','clothes',5000,'qkdrnvhrrur','2019-12-14 17:32:40',2019,12,15,15,30,'canceled','1576344760040.jpg',NULL,'장식용이요'),(500618,'식탁','furniture',150000,'youyou','2019-12-18 09:54:41',2019,12,24,18,30,'active','1576662881903.jpg',NULL,'구매일시:2017\r\n사용기간:1년\r\n깨끗해요'),(510332,'수줍은 어피치 필통','others',8000,'test','2019-12-18 05:15:27',2019,12,18,14,30,'fail','1576646127714.jpg',NULL,'어피치 귀엽거든여'),(515570,'금테 동글이 안경','others',12000,'2','2019-12-18 05:39:28',2019,12,18,14,30,'canceled','1576647568949.jpg',NULL,'금빛 동글동글 동글이 안경입니다'),(525359,'흰색 의자','furniture',20000,'sun123','2019-12-08 12:00:28',2019,12,21,23,30,'canceled','1575806428892.jpg',NULL,NULL),(570763,'미니미니 스탠드','furniture',14000,'youyou','2019-12-18 09:47:39',2019,12,24,18,30,'active','1576662459792.jpg',NULL,'밤샘할 때 딱 좋은 스탠드입니다. 이거 구입하고 올 A+ 받으세요 !!!!'),(588887,'분홍빛 블러셔','makeup',4000,'youyou','2019-12-18 10:29:40',2019,12,18,19,32,'finish','1576664980070.jfif',NULL,'볼이 화사해지는 블러셔입니다 ~~~~~!'),(592482,'눈처럼 하얀 카메라','digital',30000,'test2','2019-12-18 10:26:50',2019,12,18,19,28,'finish','1576664810264.jpg',NULL,'2년 정도 사용했습니다. 그래도 새 것 같아요'),(611577,'샤넬 향수!!','makeup',100000,'paper','2019-12-18 09:56:59',2019,12,21,18,30,'active','1576663019477.jpg',NULL,'구매일시:1주일전\r\n새겁니다. 여자친구 선물 이었는데......'),(626209,'폴로 스웨터/니트','clothes',14000,'test','2019-12-18 07:25:29',2019,12,21,16,30,'active','1576653929371.jpg',NULL,'가을/겨울에 잘 어울리는 스웨터/니트입니다 !!!'),(648807,'롱패딩','clothes',100000,'qkdrnvhrrur','2019-12-16 06:39:50',2019,12,16,15,30,'fail','1576478390015.jpg',NULL,'옷 싸게 팔아요'),(664631,'노트북','digital',100000,'qkdrnvhrrur','2019-12-16 06:56:14',2019,12,29,14,30,'canceled','1576479374581.jpg',NULL,'가벼워요:)\r\n'),(679030,'팩','makeup',10000,'pp100','2019-12-18 10:08:45',2019,12,18,19,11,'finish','1576663725452.jpg',NULL,'구매일시:1주일전\r\n너무 많아서 팔아요~~'),(681382,'크리스마스 트리','others',20000,'jes1009','2019-12-18 09:34:44',2019,12,21,18,30,'active','1576661684611.jpg',NULL,'구매일시 : 작년 사용기간 : 작년 크리스마스 하루 있으면 분위기 나고 좋아요 당첨나자마자 바로 보내드릴게요 행복한 크리스마스~~^^**'),(710272,'아이폰 SE2','digital',30000,'test','2019-12-10 11:39:56',2019,12,16,3,30,'canceled','1575977996947.png','3212314241','로즈골드 예뻐요 ~~~'),(730330,'나무 의자','furniture',21000,'kim1021','2019-12-18 09:50:29',2019,12,29,18,30,'active','1576662629565.jpg',NULL,'약간 낡았는데 쓸만해요 '),(740266,'캐논 카메라','digital',35000,'test','2019-12-18 10:24:56',2019,12,18,19,27,'finish','1576664696724.png',NULL,'찰칵찰칵 예쁘게 찍혀요'),(748679,'인형!!!','clothes',10000,'minsuk','2019-12-18 09:44:37',2019,12,21,18,30,'active','1576662439532.jpg',NULL,'구매일시:2018년\r\n밤에 무서워서 팝니다.'),(807589,'미니 스탠드','furniture',26000,'test','2019-12-18 10:36:14',2019,12,18,19,39,'finish','1576665374635.jpg',NULL,'침대 옆에 두면 딱 어울리는 미니 스탠드예요'),(813681,'에어팟2','digital',120000,'sun123','2019-12-16 17:28:19',2019,12,17,2,30,'fail','1576517299516.jpg',NULL,'테스트'),(831332,'프라모델','clothes',50000,'lws','2019-12-18 09:34:28',2019,12,21,22,30,'active','1576661668228.jpg',NULL,'구매일시:2019년\r\n특A급!!! 눈물을 머금고 팝니다.'),(854071,'밝은 빛 스탠드','furniture',60000,'rimrim','2019-12-18 09:49:36',2019,12,26,20,30,'active','1576662576641.jpg',NULL,'밤은 짧고 꿈은 길죠'),(860400,'둥글둥글 화분','others',8000,'blueming','2019-12-17 05:20:40',2019,12,19,16,30,'active','1576560040430.jpg',NULL,'사용감 거의 없는 화분입니다. 이사하면서 놓을 곳이 없어서 판매해요 !!!'),(872194,'핸드폰','digital',1000000,'qkdrnvhrrur','2019-12-17 05:07:28',2019,12,20,14,30,'canceled','1576559248069.jpg',NULL,'구매일시 : 기억 안남\r\n상태 : 특A\r\n추억의 2G폰!!이제 구하고 싶하도 못 구합니다.'),(887259,'검정색 마스카라','makeup',7000,'blueming','2019-12-18 10:31:08',2019,12,18,19,33,'finish','1576665068168.jpg',NULL,'공연 하느라 사놓고 안 쓴 거예요. 사용감 거의 없습니다!!!'),(898992,'포그바 친필 사인 유니폼!!!','clothes',50000,'lws','2019-12-18 09:39:26',2019,12,21,12,30,'active','1576661966762.jpg',NULL,'구매일시:1달 전\r\n포그바한테 정나미 떨어져서 팝니다. 맨유 화이팅!!!'),(904383,'화장품','makeup',100,'qkdrnvhrrur','2019-12-16 06:45:00',2019,12,16,15,30,'canceled','1576478700543.jpg',NULL,'한 번도 안 썼어요'),(916601,'금테 동글이 안경','others',12000,'2','2019-12-18 05:47:40',2019,12,18,14,30,'canceled','1576648060139.jpg',NULL,'금빛 동글동글 동글이 안경입니다'),(922426,'수줍은 어피치 필통','others',8000,'test','2019-12-18 05:20:16',2019,12,18,14,30,'canceled','1576646416646.jpg','20191218','어피치 귀엽거든여'),(937698,'에어팟2 애플 블루투스 이어폰','digital',50000,'sun123','2019-12-09 16:09:54',2019,12,16,18,30,'finish','1575907794416.jpg',NULL,'사용감 약간 있구요 1주일 정도 쓰다가 에어팟 프로로 갈아타서 중고처리 합니다. 사진에는 없지만 박스 풀로 있어요.'),(946420,'회색 모자','clothes',5000,'sun123','2019-12-11 07:16:16',2019,12,21,18,30,'active','1576191511947.jpg',NULL,'아무 생각 없이 쓰기 조음 '),(953494,'아두이노','digital',200000,'qkdrnvhrrur','2019-12-15 17:18:44',2019,12,19,10,30,'canceled','1576430324057.jpg',NULL,'얼마 쓰지도 않았어요'),(964934,'에뛰드 마스카라','makeup',3500,'hyunzi','2019-12-18 09:45:25',2019,12,23,10,30,'active','1576662325425.jpg',NULL,'색이 생각보다 진해서 팔아요'),(981225,'수줍은 어피치 필통','others',8000,'test','2019-12-17 17:29:19',2019,12,18,2,30,'fail','1576603759263.jpg',NULL,'분홍색 어피치가 정말 귀여운 필통이에요');
/*!40000 ALTER TABLE `t1_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t1_member`
--

DROP TABLE IF EXISTS `t1_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_member` (
  `mem_name` varchar(20) NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  `mem_pass` varchar(30) NOT NULL,
  `mem_email` varchar(40) NOT NULL,
  `mem_phone` varchar(20) NOT NULL,
  `mem_bday` varchar(20) NOT NULL,
  `mem_addr1` text NOT NULL,
  `mem_addr2` text NOT NULL,
  `regist_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `coin` int(11) NOT NULL,
  `level` varchar(10) NOT NULL,
  `point` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`mem_id`),
  UNIQUE KEY `mem_id` (`mem_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_member`
--

LOCK TABLES `t1_member` WRITE;
/*!40000 ALTER TABLE `t1_member` DISABLE KEYS */;
INSERT INTO `t1_member` VALUES ('이우석','1','lws','lws@naver.com','01092837262','910629','부산 강서구 공항로 97-3 (대저2동)','303동 1702호','2019-12-05 07:45:43',8000,'gold',1000,'active'),('이다은','2','lde','leede0418@gmail.com','01056560202','970316','서울 종로구 경희궁길 7 (신문로2가)','104동 1801호','2019-12-06 06:35:24',10000,'gold',5000,'active'),('아이유','blueming','blueming','blueming@naver.com','01012110924','930516','서울 강남구 강남대로 630 (신사동)','607동 2702호','2019-12-11 12:25:23',35000,'gold',0,'active'),('이다은','daeun','daeun','daeun@gmail.com','01056332902','970418','서울 종로구 자하문로 68-3 (효자동)','409동 1805호','2019-12-17 06:35:36',8000,'silver',0,'active'),('이하은','haeun','haeun','haeun@ewha.ac.kr','01028522813','970319','대구 남구 대덕초등길 3 (대명동)','3442-2832','2019-12-18 09:38:19',0,'silver',0,'active'),('이정훈','hoonee','hoonee','hoonee@korea.ac.kr','01057828741','960415','서울 성북구 고려대로 6 (보문동1가)','2385-2849','2019-12-18 09:43:20',0,'silver',0,'active'),('이현정','hyunjeong','hyunjeong','hyunjeong@naver.com','01058348291','960508','제주특별자치도 제주시 한림읍 감낭길 4','49-3281','2019-12-18 09:35:17',0,'silver',0,'active'),('김현지','hyunzi','hyunzi','hyunzi@gmail.com','01057381492','970531','서울 성동구 왕십리로 27 (성수동1가)','209동 1802호','2019-12-18 09:20:04',30000,'silver',0,'active'),('최정원','jeong1','jeong1','jeong1@gc.gachon.ac.kr','01058384428','980106','대전 대덕구 남경마을로 5 (신탄진동)','608동 2012호','2019-12-18 09:33:18',0,'silver',0,'active'),('정은서','jes1009','jes1009','jes1009@gmail.ccom','01032335556','981009','전북 고창군 해리면 각동길 9-1','103동 809호','2019-12-18 09:31:36',0,'silver',0,'active'),('김유리','kim1021','kim1021','kimm200@gmail.ccom','01054534333','981021','서울 강남구 테헤란로1길 16 (역삼동)','2004호','2019-12-18 09:36:04',0,'silver',0,'active'),('김민규','kk100','kk100','kk100@gmail.comm','01046436345','881021','경기 군포시 삼성로 5 (부곡동)','103호','2019-12-18 09:45:00',0,'silver',0,'active'),('이정은','leeje','leeje','leeje@hanyang.ac.kr','01021712209','940516','서울 강남구 도산대로 402-2 (청담동)','103동 2103호','2019-12-14 11:02:23',15000,'gold',0,'active'),('이우석','lws','test','amicusadaras6@gmail.com','01020770883','950920','서울 강동구 풍산로 235 (강일동)','293-582','2019-12-12 11:26:49',40000,'silver',0,'active'),('이우석','lws9520','test','amicusadaras6@gmail.com','01020770883','950920','강원 강릉시 성산면 갈매간길 6','921-85','2019-12-12 11:24:32',11000,'silver',0,'active'),('김민석','minsuk','minsuk','minsuk@naver.com','01028849312','931028','서울 강동구 고덕로 19 (암사동)','505-102','2019-12-18 09:19:32',765000,'silver',0,'active'),('마승현','mma100','mma100','maa100@gmailc.om','01032335556','981009','충남 보령시 주공로 4 (명천동)','101호','2019-12-18 09:38:46',0,'silver',0,'active'),('313','moon123','313','mm@mmmm.com','01032313893','980727','대구 북구 팔달로 7 (노원동3가)','2층 201호','2019-12-12 22:13:29',1000,'gold',0,'active'),('남기영','namnam','namnam','namnam@isdj.ac.kr','01053884129','970518','강원 동해시 갯목길 6 (구미동)','39-3819','2019-12-18 09:39:36',0,'silver',0,'active'),('정종희','paper','paper','paper@seoultech.ac.kr','01025672948','971212','서울 노원구 공릉로 232 (공릉동)','302-1859','2019-12-18 09:26:19',45000,'silver',0,'active'),('강필규','pp100','pp100','ppp@gmail.comd','01032313893','981009','인천 서구 로봇랜드로 71 (원창동)','2009호','2019-12-18 09:41:23',400,'silver',0,'active'),('이우석','qkdrnvhrrur','test','amicusadaras6@gmail.com','01020770883','921130','경북 구미시 개화길 8 (도량동)','506동 1302호','2019-12-08 16:16:06',303289,'silver',0,'active'),('이유림','rimrim','rimrim','rimrim@isdj.ac.kr','01068385938','970528','서울 용산구 새창로12길 1-2 (도원동)','501-643','2019-12-18 09:41:29',50000,'silver',0,'active'),('sunday','sun123','123','sunsunday@hanmail.net','01028374291','991213','대전 대덕구 대전로 1005 (오정동)','86-589','2019-12-08 07:15:00',35000,'gold',0,'active'),('test','test','test','test@gmail.com','01012345678','970418','서울 강남구 광평로 63 (일원동)','402동 1905호','2019-12-10 11:28:58',6000,'gold',0,'active'),('test2','test2','test2','test2@gmail.com','01034342323','950628','서울 송파구 도곡로 434 (잠실동)','502-615','2019-12-11 05:51:36',30000,'silver',0,'stop'),('test3','test3','test3','test3@gmail.com','01092283719','030817','서울 용산구 녹사평대로 136 (이태원동)','33535 109호','2019-12-11 06:02:51',50000,'silver',0,'stop'),('이유정','ujeong','ujeong','ujeong@naver.com','01048433283','971124','충북 충주시 앙성면 가느게길 44','307동 1002호','2019-12-18 09:31:51',570000,'silver',0,'active'),('시각화','visualization','visual','visual@gc.gachon.ac.kr','01028429320','960618','서울 노원구 노원로 186-7 (하계동)','429-13','2019-12-18 09:24:59',0,'silver',0,'active'),('김현우','wowoo','wowoo','wowoo@hanmail.net','01017347218','920817','서울 강북구 방학로 384 (우이동)','948-3812','2019-12-18 09:21:46',45000,'silver',0,'active'),('윤상원','younnnn','younnnn','younnnn@gachon.ac.kr','01058342198','970219','서울 강동구 아리수로 46-4 (암사동)','109동 2019호','2019-12-18 09:40:27',0,'silver',0,'active'),('김유진','youyou','youyou','youyou@naver.com','01047293298','981127','서울 구로구 구로동로 3 (가리봉동)','34-139','2019-12-18 09:20:56',51000,'silver',0,'active');
/*!40000 ALTER TABLE `t1_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t1_message`
--

DROP TABLE IF EXISTS `t1_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_message` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `send_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `receiver` varchar(50) NOT NULL,
  `contents` varchar(100) NOT NULL,
  `if_read` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_message`
--

LOCK TABLES `t1_message` WRITE;
/*!40000 ALTER TABLE `t1_message` DISABLE KEYS */;
INSERT INTO `t1_message` VALUES (7,'2019-12-16 09:18:00','1','에어팟2 애플 블루투스 이어폰에 당첨되지 않으셨습니다.',1),(8,'2019-12-16 09:18:00','qkdrnvhrrur','에어팟2 애플 블루투스 이어폰에 당첨되셨습니다!',1),(9,'2019-12-16 09:18:00','test','에어팟2 애플 블루투스 이어폰에 당첨되지 않으셨습니다.',1),(10,'2019-12-17 06:48:00','blueming','수줍은 어피치 필통에 당첨되셨습니다!',1),(11,'2019-12-17 07:34:00','blueming','수줍은 어피치 필통에 당첨되셨습니다!',1),(12,'2019-12-18 05:23:00','2','수줍은 어피치 필통에 당첨되지 않으셨습니다.',1),(13,'2019-12-18 05:23:00','blueming','수줍은 어피치 필통에 당첨되셨습니다!',1),(14,'2019-12-18 08:12:00','leeje','수줍은 어피치 필통에 당첨되셨습니다!',1),(15,'2019-12-18 10:07:00','2','조말론 디퓨져 라임앤바질에 당첨되지 않으셨습니다.',1),(16,'2019-12-18 10:07:00','mma100','조말론 디퓨져 라임앤바질에 당첨되지 않으셨습니다.',1),(17,'2019-12-18 10:07:00','pp100','조말론 디퓨져 라임앤바질에 당첨되셨습니다!',1),(18,'2019-12-18 10:11:00','mma100','팩에 당첨되지 않으셨습니다.',1),(19,'2019-12-18 10:11:00','test2','팩에 당첨되셨습니다!',1),(20,'2019-12-18 10:11:00','wowoo','팩에 당첨되지 않으셨습니다.',1),(21,'2019-12-18 10:11:00','mma100','팩에 당첨되지 않으셨습니다.',1),(22,'2019-12-18 10:11:00','test2','팩에 당첨되셨습니다!',1),(23,'2019-12-18 10:11:00','wowoo','팩에 당첨되지 않으셨습니다.',1),(24,'2019-12-18 10:27:00','2','캐논 카메라에 당첨되셨습니다!',1),(25,'2019-12-18 10:27:00','blueming','캐논 카메라에 당첨되지 않으셨습니다.',1),(26,'2019-12-18 10:28:00','test','눈처럼 하얀 카메라에 당첨되셨습니다!',1),(27,'2019-12-18 10:32:00','rimrim','분홍빛 블러셔에 당첨되지 않으셨습니다.',1),(28,'2019-12-18 10:32:00','test3','분홍빛 블러셔에 당첨되셨습니다!',1),(29,'2019-12-18 10:33:00','leeje','검정색 마스카라에 당첨되지 않으셨습니다.',1),(30,'2019-12-18 10:33:00','test','검정색 마스카라에 당첨되셨습니다!',1),(31,'2019-12-18 10:39:00','2','미니 스탠드에 당첨되지 않으셨습니다.',1),(32,'2019-12-18 10:39:00','test3','미니 스탠드에 당첨되셨습니다!',1),(33,'2019-12-18 10:39:00','leeje','불불 스탠드에 당첨되셨습니다!',1),(34,'2019-12-18 10:39:00','test','불불 스탠드에 당첨되지 않으셨습니다.',1),(35,'2019-12-18 10:40:00','2','수줍은 어피치 필통에 당첨되셨습니다!',1),(36,'2019-12-18 11:00:00','2','수줍은 어피치 필통에 당첨되지 않으셨습니다.',1),(37,'2019-12-18 11:00:00','test2','수줍은 어피치 필통에 당첨되셨습니다!',1);
/*!40000 ALTER TABLE `t1_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t1_profit_coin`
--

DROP TABLE IF EXISTS `t1_profit_coin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_profit_coin` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(20) NOT NULL,
  `charg_coin` int(11) NOT NULL,
  `commission` int(11) NOT NULL,
  `charge_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`),
  KEY `mem_id` (`mem_id`),
  CONSTRAINT `t1_profit_coin_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `t1_member` (`mem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_profit_coin`
--

LOCK TABLES `t1_profit_coin` WRITE;
/*!40000 ALTER TABLE `t1_profit_coin` DISABLE KEYS */;
INSERT INTO `t1_profit_coin` VALUES (1,'sun123',5000,500,'2019-12-15 06:13:32'),(2,'sun123',200,10,'2019-12-15 07:19:07'),(3,'sun123',200,10,'2019-12-15 07:26:57'),(4,'sun123',700000,70000,'2019-12-01 15:00:00'),(5,'sun123',654000,65400,'2019-12-09 15:00:00'),(6,'sun123',731000,73100,'2019-12-20 15:00:00'),(7,'sun123',6555000,655500,'2019-11-20 15:00:00'),(8,'sun123',31000,3100,'2019-12-24 15:00:00'),(9,'2',33300,1665,'2019-12-16 10:14:58'),(10,'sun123',7000,350,'2019-12-16 12:31:16'),(11,'sun123',50000,2500,'2019-12-16 12:31:52'),(12,'blueming',6000,300,'2019-12-17 07:17:11'),(13,'blueming',60000,3000,'2019-12-18 05:16:06'),(14,'test',7000,350,'2019-12-18 07:08:45'),(15,'leeje',60000,3000,'2019-12-18 08:09:04'),(16,'blueming',4000,200,'2019-12-18 08:22:13'),(17,'mma100',7000,700,'2019-12-18 09:39:09'),(18,'pp100',17000,1700,'2019-12-18 09:41:53'),(19,'pp100',5200,520,'2019-12-18 09:43:18'),(20,'kk100',7000,700,'2019-12-18 09:45:19'),(21,'hyunzi',45000,4500,'2019-12-18 09:45:39'),(22,'minsuk',1000000,100000,'2019-12-18 09:47:50'),(23,'youyou',80000,8000,'2019-12-18 09:47:52'),(24,'youyou',56000,5600,'2019-12-18 09:48:21'),(25,'rimrim',100000,10000,'2019-12-18 09:49:44'),(26,'rimrim',40000,4000,'2019-12-18 09:50:46'),(27,'mma100',5200,520,'2019-12-18 09:51:10'),(28,'ujeong',800000,80000,'2019-12-18 09:55:39'),(29,'jes1009',7000,700,'2019-12-18 09:58:02'),(30,'paper',100000,10000,'2019-12-18 09:58:11'),(31,'kim1021',7000,700,'2019-12-18 09:59:07'),(32,'kim1021',7000,700,'2019-12-18 09:59:11'),(33,'mma100',7000,700,'2019-12-18 10:01:53'),(34,'2',2500,125,'2019-12-18 10:01:56'),(35,'mma100',4000,400,'2019-12-18 10:02:49'),(36,'mma100',7000,700,'2019-12-18 10:08:01'),(37,'mma100',5200,520,'2019-12-18 10:08:44'),(38,'wowoo',50000,5000,'2019-12-18 10:09:43'),(39,'2',30000,1500,'2019-12-18 10:25:08'),(40,'test',20000,1000,'2019-12-18 10:27:03'),(41,'test',30000,1500,'2019-12-18 10:31:22'),(42,'test',20000,1000,'2019-12-18 10:35:25'),(43,'test3',50000,5000,'2019-12-18 10:36:38'),(44,'2',60000,3000,'2019-12-18 10:37:37');
/*!40000 ALTER TABLE `t1_profit_coin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t1_profit_goods`
--

DROP TABLE IF EXISTS `t1_profit_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_profit_goods` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(20) NOT NULL,
  `goal_price` int(11) NOT NULL,
  `commission` int(11) NOT NULL,
  `regist_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`),
  KEY `mem_id` (`mem_id`),
  CONSTRAINT `t1_profit_goods_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `t1_member` (`mem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_profit_goods`
--

LOCK TABLES `t1_profit_goods` WRITE;
/*!40000 ALTER TABLE `t1_profit_goods` DISABLE KEYS */;
INSERT INTO `t1_profit_goods` VALUES (1,'sun123',15000,3000,'2019-12-15 08:12:31'),(2,'sun123',25000,3000,'2019-12-15 08:12:35'),(3,'sun123',70000,4000,'2019-12-15 08:12:42'),(4,'sun123',70000,2000,'2019-12-15 08:13:43'),(5,'sun123',70000,2000,'2019-12-15 08:13:47'),(6,'sun123',70000,2000,'2019-12-15 08:13:47'),(7,'sun123',70000,4000,'2019-11-11 15:00:00'),(8,'sun123',7000000,400000,'2019-11-11 15:00:00'),(9,'sun123',7000000,23000,'2019-12-04 15:00:00'),(10,'sun123',7000000,28000,'2019-12-11 15:00:00'),(11,'sun123',7000000,22100,'2019-12-18 15:00:00'),(12,'sun123',7000000,3800,'2019-12-01 15:00:00'),(13,'sun123',7000000,800,'2019-12-09 15:00:00'),(14,'sun123',7000000,3200,'2019-12-15 15:00:00'),(15,'sun123',120000,5200,'2019-12-16 17:30:00'),(16,'sun123',4000,3000,'2019-12-17 06:48:00'),(17,'sun123',4000,3000,'2019-12-17 07:34:00'),(18,'sun123',8000,4000,'2019-12-17 17:34:00'),(19,'sun123',8000,6000,'2019-12-18 05:19:00'),(20,'sun123',8000,3000,'2019-12-18 05:23:00'),(21,'sun123',8000,2600,'2019-12-18 08:12:00'),(22,'sun123',100,450,'2019-12-18 10:07:00'),(23,'sun123',10000,3000,'2019-12-18 10:11:00'),(24,'sun123',10000,3000,'2019-12-18 10:11:00'),(25,'sun123',35000,3000,'2019-12-18 10:27:00'),(26,'sun123',30000,3000,'2019-12-18 10:28:00'),(27,'sun123',4000,1150,'2019-12-18 10:32:00'),(28,'sun123',7000,3000,'2019-12-18 10:33:00'),(29,'sun123',26000,3000,'2019-12-18 10:39:00'),(30,'sun123',28000,7000,'2019-12-18 10:39:00'),(31,'sun123',8000,3000,'2019-12-18 10:40:00'),(32,'sun123',6000,3500,'2019-12-18 11:00:00');
/*!40000 ALTER TABLE `t1_profit_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t1_report`
--

DROP TABLE IF EXISTS `t1_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_report` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(15) NOT NULL,
  `mem_name` varchar(20) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `regist_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `goo_img` varchar(40) DEFAULT NULL,
  `seller_id` varchar(15) NOT NULL,
  `seller_name` varchar(20) NOT NULL,
  `goo_id` int(11) NOT NULL,
  PRIMARY KEY (`num`),
  KEY `mem_id` (`mem_id`),
  KEY `seller_id` (`seller_id`),
  KEY `goo_id` (`goo_id`),
  CONSTRAINT `t1_report_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `t1_member` (`mem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_report`
--

LOCK TABLES `t1_report` WRITE;
/*!40000 ALTER TABLE `t1_report` DISABLE KEYS */;
INSERT INTO `t1_report` VALUES (16,'qkdrnvhrrur','이우석','엉뚱한게 왔어요','사기 당했습니다--','2019-12-15 19:47:15','1576439235421.jpg','test','test',710272),(17,'qkdrnvhrrur','이우석','엉뚱한게 왔어요','이게 뭔가요......','2019-12-16 06:31:24','1576477884176.jpg','qkdrnvhrrur','이우석',425960),(18,'blueming','아이유','판매자가 연락을 거부합니다.','입금 했는데 일주일 째 감감 무소식입니다. 처리 부탁드립니다.ㅠㅠ','2019-12-18 05:29:35','1576646975221.jpg','test','test',922426),(19,'test','test','판매자가 연락을 거부합니다.','판매자 연락 거부','2019-12-18 08:04:06','1576656246168.jpg','qkdrnvhrrur','이우석',904383),(20,'leeje','이정은','판매자가 연락을 거부합니다.','판매자 연락 거부','2019-12-18 08:12:32','1576656752198.jpg','leeje','이정은',102641),(21,'test2','test2','엉뚱한게 왔어요','장난감이 왔습니다ㅡㅡ\r\n','2019-12-18 10:13:24','1576664003978.jpg','pp100','강필규',679030),(22,'2','이다은','상품이 잘못 왔어요.','저는 검정색 카메라에 응모했는데 하얀색 카메라가 왔습니다. 근데 판매자는 연락이 안 돼요.. ㅠㅠ','2019-12-18 10:28:02','1576664882487.jpg','test','test',740266),(23,'2','이다은','상품이 잘못 왔어요.','저는 검정색 카메라에 응모했는데 하얀색 카메라가 왔습니다. 근데 판매자는 연락이 안 돼요.. ㅠㅠ','2019-12-18 10:28:02','1576664882487.jpg','test','test',740266),(24,'test','test','이게 뭐죠?','제가 주문한 상품이랑 다른 게 왔는데 어이가 없네요. 확인 부탁드립니다.','2019-12-18 10:28:49','1576664929075.png','test2','test2',592482),(25,'test3','test3','블러셔가 아닌 마스카라가 배송 왔습니다.','판매자가 가짜 전화번호를 알려줬네요. 관리 부탁드립니다.','2019-12-18 10:32:43','1576665163724.jpg','youyou','김유진',588887),(26,'test3','test3','안경이 배달왔어요','저는 블러셔를 구매했는데.. 중고사이트 관리 좀 제대로 해주세요','2019-12-18 10:33:19','1576665199440.jpg','youyou','김유진',588887),(27,'test','test','검정색이 아니라 갈색이에요','판매자가 색깔을 잘못 적어뒀네요. 경고조치 부탁드립니다.','2019-12-18 10:34:16','1576665256272.jpg','blueming','아이유',887259),(28,'leeje','이정은','사진이랑 스탠드가 다르게 생겼어요.','분명 목이 긴 스탠드였는데 짧은 게 왔네요.','2019-12-18 10:39:47','1576665587261.jpg','namnam','남기영',223241),(29,'2','이다은','어피치가 아닌 라이언 필통이었어요','저는 어피치가 더 좋거든요. 물론 라이언도 귀엽지만.. 판매자 너무 하네요 정말.','2019-12-18 10:40:39','1576665639768.jpg','test','test',164536),(30,'test3','test3','미니 스탠드가 아니에요','저는 미니 스탠드가 필요해요. 판매자 왜 이러죠 정말??','2019-12-18 10:41:11','1576665671464.jpg','test','test',807589),(31,'test3','test3','이게 뭐죠......','벽돌이 왓어요','2019-12-18 10:42:36','1576665756052.jpg','test','test',807589),(32,'test3','test3','화장품이 아닌 안경이 왔어요..','어이 없어요 진짜 ㅠ 환불 부탁드립니다...','2019-12-18 10:43:04','1576665784787.jpg','youyou','김유진',588887),(33,'test3','test3','제발 환불 좀...','제 나이 30에 인형이 웬 말?','2019-12-18 10:43:48','1576665828540.jpg','youyou','김유진',588887),(34,'test','test','물건은 언제 오는 거죠......','판매자가 잠수 탔어요','2019-12-18 10:44:30','1576665870055.png','blueming','아이유',887259),(35,'test','test','안 돼요!!!','카메라가 겉만 멀쩡하고 고장나있어요','2019-12-18 10:44:56','1576665896114.jfif','test2','test2',592482),(36,'pp100','강필규','디퓨저 냄새가......','똥 냄새 나요','2019-12-18 10:48:01','1576666081146.jpg','sun123','sunday',167712),(37,'qkdrnvhrrur','이우석','짝퉁이에요~~~','이어폰 샤오미꺼에요','2019-12-18 10:49:29','1576666169583.jpg','sun123','sunday',937698),(38,'2','이다은','브랜드가......','캐논이 아니라 캐난이에요','2019-12-18 10:50:52','1576666252082.jpg','test','test',740266),(39,'2','이다은','엉뚱한게 왔어요','복숭아가 아니라 호박 어피치에요ㅠㅠ','2019-12-18 10:51:19','1576666279484.png','test','test',164536),(40,'leeje','이정은','스탠드에 불이 안 들어와요','환불 좀 해주세요~~~~~~~~~~~~~~~~~~~~~~~~~','2019-12-18 10:52:15','1576666335888.jpg','namnam','남기영',223241),(41,'pp100','강필규','환불 왜 안 해줘요!!!!','빨리 해줘요!!!!!!','2019-12-18 10:54:25','1576666465134.jpg','sun123','sunday',167712),(42,'test2','test2','팩 쓰고 얼굴에 트러블읻ㄷ','병원비로 돈을 더 썼어요','2019-12-18 10:55:12','1576666512221.jpg','pp100','강필규',679030),(43,'2','이다은','엉뚱한게 왔어요','어피치가 아니라 라이언인데요???','2019-12-18 10:56:03','1576666563583.jpg','test','test',164536),(44,'2','이다은','제발 환불 좀...','아예 작동도 안 돼요......','2019-12-18 10:56:43','1576666603166.jpg','test','test',740266),(45,'test3','test3','얼굴이 뒤집어 졌어요','아낀 돈 보다 피부과 돈을 더 많이 썼어요','2019-12-18 10:57:39','1576666659236.jpg','youyou','김유진',588887),(46,'test2','test2','당첨 됐는데 배송정보 입력이 몇 일 째 안 되고 있어요','제일 갖고 싶던 필통이었는데.. 확인 부탁드립니다....!!!','2019-12-18 11:01:14','1576666874497.jpg','test','test',330548);
/*!40000 ALTER TABLE `t1_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t1_search`
--

DROP TABLE IF EXISTS `t1_search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t1_search` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `str` varchar(40) DEFAULT NULL,
  `search_time` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t1_search`
--

LOCK TABLES `t1_search` WRITE;
/*!40000 ALTER TABLE `t1_search` DISABLE KEYS */;
INSERT INTO `t1_search` VALUES (1,'아이폰',21),(2,'아이폰',21),(3,'골드',21),(4,'아이폰',21),(5,'골드',21),(6,'아이폰 골드',21),(7,'아이폰',21),(8,'의자',21),(9,'흰색',21),(10,'흰색',21),(11,'휴대폰',21),(12,'흰색',21),(13,'휴대폰',21),(14,'립스틱',21),(15,'LG',21),(16,'SAMSUNG',21),(17,'샤넬',21),(18,'핸드폰',21),(19,'스마트폰',21),(20,'LG',21),(21,'G6',21),(22,'V20',21),(23,'스탠드',21),(24,'모니터',21),(26,'아이패드',21),(27,'아이패드',21),(28,'아이패드',21),(29,'아이패드',21),(30,'스페이스',21),(31,'골드',21),(32,'64GB',21),(33,'32GB',21),(34,'마우스',21),(35,'헤드셋',21),(37,'블루투스',21),(38,'이어폰',21),(39,'기타',21),(40,'바이올린',21),(41,'립스틱',18),(42,'틴트',18),(43,'펄',18),(44,'마스카라',18),(45,'네일',18),(46,'핸디',18),(47,'머플러',18),(48,'겨울',18),(49,'패딩',18),(50,'패딩',18),(51,'패딩',18),(52,'아이폰',18),(53,'스마트폰',18),(54,'골드',18),(55,'그레이',18),(56,'블랙',18),(57,'블랙',18),(58,'그레이',18),(59,'롱',18),(60,'아이폰',18),(61,'골드',18),(62,'롱',18),(63,'그레이',18),(64,'골드',18),(65,'그레이',18),(66,'블랙',18),(67,'블랙',18),(68,'그레이',18),(69,'롱',18),(70,'틴트',18),(71,'립스틱',18),(72,'네일아트',18),(73,'양말',18),(75,'향수',18),(77,'이어폰',18),(78,'블루투스',18),(79,'모니터',18),(80,'마우스',18),(81,'키보드',12),(83,'아이패드',12),(84,'아이패드',12),(85,'아이패드',12),(86,'스페이스',12),(87,'골드',12),(88,'64GB',12),(89,'이',12),(90,'이어',12),(91,'이어폰',12),(92,'블루투스',12),(93,'모니터',12),(94,'마우스',12),(95,'키보드',12),(97,'아이패드',12),(98,'아이패드',12),(99,'아이패드',12),(100,'스페이스',12),(101,'골드',12),(102,'64GB',12),(103,'아이패드',12),(104,'아이패드',12),(105,'아이패드',12),(106,'스페이스',12),(107,'골드',12),(108,'64GB',12),(109,'이어폰',12),(110,'블루투스',12),(111,'모니터',12),(112,'마우스',12),(113,'키보드',12),(115,'그레이',12),(116,'블랙',12),(117,'블랙',12),(118,'그레이',12),(119,'롱',12),(120,'그레이',12),(121,'블랙',12),(122,'블랙',12),(123,'그레이',12),(124,'롱',12),(125,'아이폰',12),(126,'골드',12),(127,'기타',12),(128,'그레이',12),(129,'블랙',12),(130,'블랙',12),(131,'그레이',12),(132,'롱',12),(133,'사각',12),(134,'사물함',12),(135,'이어폰',12),(136,'블루투스',12),(137,'모니터',12),(138,'마우스',12),(139,'키보드',12),(141,'그레이',23),(142,'블랙',23),(143,'블랙',23),(144,'그레이',23),(145,'롱',23),(146,'그레이',23),(147,'블랙',23),(148,'블랙',23),(149,'그레이',23),(150,'롱',23),(151,'아이폰',23),(152,'골드',23),(153,'향수',23),(154,'디퓨져',23),(155,'마우스',23),(156,'책',23),(157,'중고책',23),(158,'전공',23),(159,'선풍기',23),(160,'향수',23),(161,'사각',4),(162,'의자',4),(164,'모자',14),(165,'모자',14),(166,'모자',14),(167,'모자',14),(168,'모자',14),(169,'모자',14),(170,'모자',14),(171,'모자',14),(172,'모자',14),(173,'모자',14),(174,'모자',14),(175,'모자',14),(176,'모자',14),(177,'모자',14),(178,'둥',14),(179,'모자',20),(180,'의자',20),(181,'헤드폰',20),(182,'모자',20),(183,'모자',20),(184,'화분',14),(185,'화분',14),(186,'플레이어',14),(187,'입생로랑',14),(188,'기타',15),(189,'화분',16),(190,'화분',16),(191,'화분',16),(192,'화분',16),(193,'화분',16),(194,'화분',16),(195,'화분',16),(196,'화분',16),(197,'화분',16),(198,'화분',16),(199,'화분',16),(200,'화분',16),(203,'립스틱',17),(204,'화분',17),(205,'화분',17),(206,'',19),(207,'',19);
/*!40000 ALTER TABLE `t1_search` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-18 20:14:19
