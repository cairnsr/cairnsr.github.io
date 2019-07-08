-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 13, 2019 at 09:43 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_cairnsr`
--

-- --------------------------------------------------------

--
-- Table structure for table `alliance`
--

DROP TABLE IF EXISTS `alliance`;
CREATE TABLE `alliance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL UNIQUE,
  `credits` varchar(32) DEFAULT NULL,
  `government` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `alliance`
--

INSERT INTO `alliance` VALUES
(1, 'Republic', 'Republic Credits', 'Republic'),
(2, 'Galactic Empire', 'Imperial Credits', 'Empire');

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `race` int(11) DEFAULT NULL,
  `homeworld` int(11) DEFAULT NULL,
  `association` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT UC_Characters UNIQUE (`fname`, `lname`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` VALUES
(1, 'Luke', 'Skywalker', 1, 1, 1),
(2, 'Chewbacca', '', 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `character_movie`
--

DROP TABLE IF EXISTS `character_movie`;
CREATE TABLE `character_movie` (
  `character_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  CONSTRAINT UC_char_movie UNIQUE (`character_id`, `movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `character_movie`
--

INSERT INTO `character_movie` VALUES
(1, 2),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL UNIQUE,
  `year` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` VALUES
(1, 'The Phantom Menace', 1999),
(2, 'A New Hope', 1977);

-- --------------------------------------------------------

--
-- Table structure for table `planets`
--

DROP TABLE IF EXISTS `planets`;
CREATE TABLE `planets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL UNIQUE,
  `diameter` int(11) DEFAULT NULL,
  `population` int(11) DEFAULT NULL,
  `climate` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `planets`
--

INSERT INTO `planets` VALUES
(1, 'Tatooine', NULL, NULL, NULL),
(2, 'Kashyyyk', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `species`
--

DROP TABLE IF EXISTS `species`;
CREATE TABLE `species` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL UNIQUE,
  `lifespan` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `classification` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `species`
--

INSERT INTO `species` (`id`, `name`, `lifespan`, `height`, `classification`) VALUES
(1, 'Human', 100, 6, NULL),
(2, 'Wookie', NULL, NULL, NULL);

--
-- Constraints for table `characters`
--
ALTER TABLE `characters`
  ADD FOREIGN KEY (`race`) REFERENCES `species`(`id`),
  ADD FOREIGN KEY (`association`) REFERENCES `alliance`(`id`), 
  ADD FOREIGN KEY (`homeworld`) REFERENCES `planets`(`id`);

--
-- Constraints for table `character_movie`
--

ALTER TABLE `character_movie`
  ADD FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`),
  ADD FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
