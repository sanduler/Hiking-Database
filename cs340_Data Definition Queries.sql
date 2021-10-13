-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Mar 02, 2020 at 08:14 PM
-- Server version: 10.4.11-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_sanduler`
--

-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------

SET foreign_key_checks = 0;
--
-- Table structure for table `Hikes`
--
DROP TABLE IF EXISTS `Hikes`;
CREATE TABLE `Hikes` (
  `hikeID` int(11) NOT NULL AUTO_INCREMENT,
  `hikeName` varchar(255) NOT NULL,
  `distance` double DEFAULT NULL,
  `elevation` double DEFAULT NULL,
  `difficulty` double DEFAULT NULL,
  `averageRating` char(5) DEFAULT '0',
  PRIMARY KEY (`hikeID`)
) ENGINE=InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Hikes`
--

INSERT INTO `Hikes` (`hikeID`, `hikeName`, `distance`, `elevation`, `difficulty`, `averageRating`) VALUES
(1, 'Angel''s Rest', 4.8, 1475, 6, '4.6'),
(2, 'Triple Falls', 3.2, 610, 4, '4.0'),
(3, 'Munra Point', 6.0, 2270, 9, '4.4');

-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- Table structure for table `Locations`
--

DROP TABLE IF EXISTS `Locations`;
CREATE TABLE `Locations` (
  `locationID` int(11) NOT NULL AUTO_INCREMENT,
  `hikeID` int(11) NOT NULL,
  `state` varchar(127) NOT NULL,
  `city` varchar(127) NOT NULL,
  `zipCode` varchar(6) NOT NULL,
  PRIMARY KEY (`locationID`),
  KEY `hikeID` (`hikeID`),
  CONSTRAINT `hikeID (fk key)` FOREIGN KEY (`hikeID`) REFERENCES `Hikes` (`hikeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (`locationID`, `hikeID`, `state`, `city`, `zipCode`) VALUES
(1, 1, 'OREGON', 'Bridal Veil', '97010'),
(2, 2, 'OREGON', 'Cascade Locks', '97014'),
(3, 3, 'OREGON', 'Cascade Locks', '97014');

-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- Table structure for table `People`
--

DROP TABLE IF EXISTS `People`;
CREATE TABLE `People` (
  `peopleID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`peopleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `People`
--

INSERT INTO `People` (`peopleID`, `username`, `firstName`, `lastName`, `password`) VALUES
(1, 'james111', 'Mark', 'Jameston', 'qwertyui'),
(2, 'jont111', 'Mike', 'Hemsworth', 'tester222'),
(3, 'toto5432', 'James', 'Hume', 'timeismoney');

-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- Table structure for table `Ratings`
--

DROP TABLE IF EXISTS `Ratings`;
CREATE TABLE `Ratings` (
  `ratingID` int(11) NOT NULL AUTO_INCREMENT,
  `hikeID` int(11) NOT NULL,
  `peopleID` int(11) NOT NULL,
  `ratingScore` int(11) NOT NULL,
  `ratingTime` date NOT NULL,
  PRIMARY KEY (`ratingID`),
  KEY `hikeID (foreign key)` (`hikeID`),
  KEY `peopleID (foreign key)` (`peopleID`),
  CONSTRAINT `hikeID (foreign key)` FOREIGN KEY (`hikeID`) REFERENCES `Hikes` (`hikeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `peopleID (foreign key)` FOREIGN KEY (`peopleID`) REFERENCES `People` (`PeopleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Ratings`
--

INSERT INTO `Ratings` (`ratingID`, `hikeID`, `peopleID`, `ratingScore`, `ratingTime`) VALUES
(1, 1, 1, 4, '2020-02-12'),
(2, 2, 2, 2, '2020-02-05'),
(3, 3, 1, 5, '2011-06-01');

-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- Table structure for table `Hikes_People`
--

DROP TABLE IF EXISTS `Hikes_People`;
CREATE TABLE `Hikes_People` (
  `hikeID` int(11) NOT NULL,
  `peopleID` int(11) NOT NULL,
  PRIMARY KEY (`hikeID`, `peopleID`),
  CONSTRAINT `hikes_people_fk_1` FOREIGN KEY (`hikeID`) REFERENCES `Hikes` (`hikeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hikes_people_fk_2` FOREIGN KEY (`peopleID`) REFERENCES `People` (`peopleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Hikes_People`
--

INSERT INTO `Hikes_People` (`hikeID`, `peopleID`) VALUES
(1, 3),
(2, 2),
(3, 1);

-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------
-- --------------------------------------------------------

SET foreign_key_checks = 1;


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;