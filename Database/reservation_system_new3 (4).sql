-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.2
-- Generation Time: Oct 14, 2024 at 01:12 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reservation_system_new3`
--

-- --------------------------------------------------------

--
-- Table structure for table `closingperiods`
--

CREATE TABLE `closingperiods` (
  `closing_period_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `court_id` int(11) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `closingperiods`
--

INSERT INTO `closingperiods` (`closing_period_id`, `venue_id`, `court_id`, `start_date`, `end_date`, `reason`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, '2024-11-01', '2024-11-02', 'Annual Maintenance', '2024-10-02 06:21:49', '2024-10-02 06:21:49'),
(2, 2, NULL, '2024-11-05', '2024-11-06', 'Facility Upgrade', '2024-10-02 06:21:49', '2024-10-02 06:21:49');

-- --------------------------------------------------------

--
-- Table structure for table `court`
--

CREATE TABLE `court` (
  `court_id` int(11) NOT NULL,
  `court_type_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `court_name` varchar(100) NOT NULL,
  `cost_per_hour` decimal(10,2) NOT NULL,
  `status` enum('available','booked','undermaintenance') DEFAULT 'available',
  `opening_hours` time NOT NULL,
  `closing_hours` time NOT NULL,
  `booking_time_limit` int(11) DEFAULT 60,
  `maintenance_status` enum('none','scheduled','completed') DEFAULT 'none',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `court`
--

INSERT INTO `court` (`court_id`, `court_type_id`, `venue_id`, `court_name`, `cost_per_hour`, `status`, `opening_hours`, `closing_hours`, `booking_time_limit`, `maintenance_status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Tennis Court 1', '50.00', 'available', '05:00:00', '20:00:00', 60, 'none', '2024-10-02 06:17:19', '2024-10-04 03:30:33'),
(2, 1, 1, 'Tennis Court 2', '50.00', 'available', '08:00:00', '20:00:00', 60, 'none', '2024-10-02 06:17:19', '2024-10-03 04:31:44'),
(3, 2, 1, 'Cricket Field', '80.00', 'available', '08:00:00', '23:00:00', 60, 'none', '2024-10-02 06:17:19', '2024-10-03 04:32:56'),
(4, 3, 2, 'Badminton Court 1', '40.00', 'available', '08:00:00', '20:00:00', 60, 'none', '2024-10-02 06:17:19', '2024-10-03 07:04:28'),
(11, 6, 6, 'pool1', '12.00', 'available', '08:00:00', '17:00:00', 0, 'none', '2024-10-02 11:28:20', '2024-10-03 04:33:00'),
(12, 7, 9, 'Day care 1', '12.00', 'available', '08:00:00', '20:00:00', 0, 'scheduled', '2024-10-02 11:37:36', '2024-10-02 11:37:36'),
(13, 1, 1, 'Tennis court 3', '60.00', 'available', '08:00:00', '20:00:00', 60, 'none', '2024-10-04 10:59:28', '2024-10-04 10:59:43'),
(15, 9, 13, 'javelin court 1', '12.00', 'available', '08:00:00', '22:00:00', 0, 'completed', '2024-10-08 09:31:45', '2024-10-08 09:31:45');

-- --------------------------------------------------------

--
-- Table structure for table `courttype`
--

CREATE TABLE `courttype` (
  `court_type_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courttype`
--

INSERT INTO `courttype` (`court_type_id`, `venue_id`, `type_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Tennis', 'Standard tennis court with hard surface', '2024-10-02 06:17:13', '2024-10-02 06:17:13'),
(2, 1, 'Cricket', 'Professional cricket ground', '2024-10-02 06:17:13', '2024-10-02 06:17:13'),
(3, 2, 'Badminton', 'Indoor badminton court', '2024-10-02 06:17:13', '2024-10-02 06:17:13'),
(6, 6, 'Pool', 'supiri pool', '2024-10-02 11:27:36', '2024-10-02 11:27:36'),
(7, 9, 'Day care', 'chuti baba', '2024-10-02 11:36:36', '2024-10-02 11:36:36'),
(9, 13, 'Javelin throw', 'javelin description', '2024-10-08 09:31:15', '2024-10-08 09:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `holiday_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `court_id` int(11) DEFAULT NULL,
  `holiday_date` date DEFAULT NULL,
  `holiday_description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `recurring_status` tinyint(1) DEFAULT 0,
  `recurring_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`recurring_json`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`holiday_id`, `venue_id`, `court_id`, `holiday_date`, `holiday_description`, `created_at`, `updated_at`, `recurring_status`, `recurring_json`) VALUES
(1, 1, NULL, '2024-12-25', 'Christmas Day - Closed', '2024-10-02 06:21:43', '2024-10-02 06:21:43', 0, NULL),
(2, 2, NULL, '2024-01-01', 'New Year\'s Day - Closed', '2024-10-02 06:21:43', '2024-10-02 06:21:43', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `membership`
--

CREATE TABLE `membership` (
  `membership_id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `membership_type` enum('basic','premium','vip') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `membership_status` enum('active','inactive','suspended') DEFAULT 'active',
  `discount_rate` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `membership`
--

INSERT INTO `membership` (`membership_id`, `tenant_id`, `user_id`, `membership_type`, `start_date`, `end_date`, `membership_status`, `discount_rate`) VALUES
(1, 1, 1, 'premium', '2024-01-01', '2025-01-01', 'active', '10.00'),
(2, 2, 2, 'basic', '2024-05-01', '2025-05-01', 'active', '5.00'),
(3, 1, 1, 'premium', '2024-01-01', '2025-01-01', 'active', '10.00'),
(4, 2, 2, 'basic', '2024-05-01', '2025-05-01', 'active', '5.00');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('credit_card','debit_card','paypal') NOT NULL,
  `payment_status` enum('successful','failed','refunded') NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `reservation_id`, `user_id`, `amount`, `payment_method`, `payment_status`, `transaction_date`) VALUES
(1, 1, 1, '50.00', 'credit_card', 'successful', '2024-10-02 06:21:26'),
(2, 2, 2, '80.00', 'paypal', '', '2024-10-02 06:21:26');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `reservation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `court_id` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `date` date NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `payment_status` enum('pending','completed','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`reservation_id`, `user_id`, `court_id`, `start_time`, `end_time`, `date`, `status`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '10:00:00', '11:00:00', '2024-10-05', 'confirmed', 'completed', '2024-10-02 06:20:19', '2024-10-02 06:21:17'),
(2, 2, 3, '15:00:00', '17:00:00', '2024-10-06', 'pending', 'pending', '2024-10-02 06:20:19', '2024-10-02 06:21:19');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `tenant_id`, `user_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 1, 5, 'Great facilities and friendly staff.', '2024-10-02 06:21:31'),
(2, 2, 2, 4, 'Good place, but needs more badminton courts.', '2024-10-02 06:21:31');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `court_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` enum('available','booked','cancelled') DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `court_id`, `date`, `start_time`, `end_time`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-10-05', '10:00:00', '11:00:00', 'booked', '2024-10-02 06:21:39', '2024-10-02 06:21:39'),
(2, 2, '2024-10-06', '15:00:00', '17:00:00', 'available', '2024-10-02 06:21:39', '2024-10-02 06:21:39');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `staff_role` enum('manager','assistant') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `tenant_id`, `user_id`, `staff_role`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'manager', '2024-10-02 06:21:54', '2024-10-02 06:21:54'),
(2, 2, 2, 'assistant', '2024-10-02 06:21:54', '2024-10-02 06:21:54');

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `tenant_id` int(11) NOT NULL,
  `tenant_name` varchar(150) NOT NULL,
  `contact_person` varchar(150) DEFAULT NULL,
  `contact_email` varchar(150) NOT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `subscription_plan` enum('basic','premium') DEFAULT 'basic',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`tenant_id`, `tenant_name`, `contact_person`, `contact_email`, `contact_phone`, `subscription_plan`, `created_at`, `updated_at`) VALUES
(1, 'Sports Arena', 'John Doe', 'john@sportsarena.com', '123-456-7890', 'premium', '2024-10-02 06:17:01', '2024-10-02 06:17:01'),
(2, 'City Sports Club', 'Jane Smith', 'jane@citysports.com', '098-765-4321', 'basic', '2024-10-02 06:17:01', '2024-10-02 06:17:01'),
(3, 'Maharagama Sports club', 'kamal', 'kamal@gmail.com', '0777777703', 'basic', '2024-10-08 08:42:35', '2024-10-08 09:28:27'),
(11, 'Form tenant', 'tenant buruwa', 'tenant@gmail.com', '0777777777', 'basic', '2024-10-08 04:59:20', '2024-10-08 04:59:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `user_type` enum('client','admin','basicuser') NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `membership_status` enum('active','inactive','suspended') DEFAULT 'active',
  `role` enum('user','manager') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `tenant_id`, `first_name`, `last_name`, `email`, `phone_number`, `user_type`, `password`, `profile_photo`, `address`, `membership_status`, `role`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Theekshana', 'Fernando', 'theekshana.jny@gmail.com', '555-123-4567', 'admin', '$2b$10$lLRIlrbUmgO9DfBsViWrBOpxPt6PsH17xEtsTeXyl.WZs7pU7N0Q.', NULL, '123 Elm St', 'active', 'user', '2024-10-02 06:17:25', '2024-10-08 06:35:09'),
(2, 2, 'Bob', 'Williams', 'bob@example.com', '555-987-6543', 'client', '$2b$10$lLRIlrbUmgO9DfBsViWrBOpxPt6PsH17xEtsTeXyl.WZs7pU7N0Q.', NULL, '456 Oak St', 'active', 'user', '2024-10-02 06:17:25', '2024-10-08 06:00:32'),
(6, NULL, 'basic user 1 name 1', 'basic user 2 name 2', 'basicuser@gmail.com', '0777777777', 'basicuser', '$2b$10$lLRIlrbUmgO9DfBsViWrBOpxPt6PsH17xEtsTeXyl.WZs7pU7N0Q.', NULL, 'basic user address', 'active', 'user', '2024-10-08 06:53:16', '2024-10-08 09:18:12'),
(7, 3, 'kamal', 'perera', 'kamal@gmail.com', '0777777756', 'client', '$2b$10$lLRIlrbUmgO9DfBsViWrBOpxPt6PsH17xEtsTeXyl.WZs7pU7N0Q.', NULL, 'moratuwa', 'active', 'user', '2024-10-08 09:29:50', '2024-10-08 09:29:50');

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `venue_id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `venue_name` varchar(150) NOT NULL,
  `venue_address` text NOT NULL,
  `venue_description` text DEFAULT NULL,
  `contact_info` varchar(100) DEFAULT NULL,
  `opening_hours` time NOT NULL,
  `closing_hours` time NOT NULL,
  `status` enum('open','closed','under maintenance') DEFAULT 'open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `venue`
--

INSERT INTO `venue` (`venue_id`, `tenant_id`, `venue_name`, `venue_address`, `venue_description`, `contact_info`, `opening_hours`, `closing_hours`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Main Stadium', '123 Main St', 'Home of the Sports Arena', 'contact@sportsarena.com', '08:00:00', '22:00:00', 'open', '2024-10-02 06:17:07', '2024-10-02 06:33:03'),
(2, 2, 'City Sports Complex', '456 Elm St', 'A multi-sport facility', 'info@citysports.com', '09:00:00', '21:00:00', 'open', '2024-10-02 06:17:07', '2024-10-02 06:17:07'),
(6, 2, 'Colombo', 'Colombo 2', 'Head quarters', '0777593701', '11:11:00', '11:11:00', 'open', '2024-10-02 07:35:35', '2024-10-02 07:35:35'),
(9, 2, 'Pettah', 'pettah 123-A', 'pettah prince street', '07545874646', '09:00:00', '02:00:00', 'open', '2024-10-02 11:33:04', '2024-10-02 11:33:04'),
(10, 2, 'Trincomaliii', 'trinco 123-A', 'trinco high gardens', '0777593701', '07:00:00', '22:00:00', 'open', '2024-10-02 11:39:30', '2024-10-03 07:04:40'),
(13, 3, 'Kamal Venue 1', 'kamal venue 1 address', 'kamal venue 1 description`', '077777777', '08:00:00', '22:00:00', 'open', '2024-10-08 09:30:42', '2024-10-08 09:30:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `closingperiods`
--
ALTER TABLE `closingperiods`
  ADD PRIMARY KEY (`closing_period_id`),
  ADD KEY `venue_id` (`venue_id`),
  ADD KEY `court_id` (`court_id`);

--
-- Indexes for table `court`
--
ALTER TABLE `court`
  ADD PRIMARY KEY (`court_id`),
  ADD KEY `court_type_id` (`court_type_id`),
  ADD KEY `venue_id` (`venue_id`);

--
-- Indexes for table `courttype`
--
ALTER TABLE `courttype`
  ADD PRIMARY KEY (`court_type_id`),
  ADD KEY `venue_id` (`venue_id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`holiday_id`),
  ADD UNIQUE KEY `holiday_date` (`holiday_date`),
  ADD KEY `venue_id` (`venue_id`),
  ADD KEY `court_id` (`court_id`);

--
-- Indexes for table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`membership_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tenant_id` (`tenant_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `reservation_id` (`reservation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `court_id` (`court_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `tenant_id` (`tenant_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `court_id` (`court_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `tenant_id` (`tenant_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`tenant_id`),
  ADD UNIQUE KEY `contact_email` (`contact_email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `tenant_id` (`tenant_id`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`venue_id`),
  ADD KEY `tenant_id` (`tenant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `closingperiods`
--
ALTER TABLE `closingperiods`
  MODIFY `closing_period_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `court`
--
ALTER TABLE `court`
  MODIFY `court_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `courttype`
--
ALTER TABLE `courttype`
  MODIFY `court_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `holiday_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `membership`
--
ALTER TABLE `membership`
  MODIFY `membership_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tenant`
--
ALTER TABLE `tenant`
  MODIFY `tenant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `venue_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `closingperiods`
--
ALTER TABLE `closingperiods`
  ADD CONSTRAINT `closingperiods_ibfk_1` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `closingperiods_ibfk_2` FOREIGN KEY (`court_id`) REFERENCES `court` (`court_id`) ON DELETE CASCADE;

--
-- Constraints for table `court`
--
ALTER TABLE `court`
  ADD CONSTRAINT `court_ibfk_1` FOREIGN KEY (`court_type_id`) REFERENCES `courttype` (`court_type_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `court_ibfk_2` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE CASCADE;

--
-- Constraints for table `courttype`
--
ALTER TABLE `courttype`
  ADD CONSTRAINT `courttype_ibfk_1` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE CASCADE;

--
-- Constraints for table `holidays`
--
ALTER TABLE `holidays`
  ADD CONSTRAINT `holidays_ibfk_1` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `holidays_ibfk_2` FOREIGN KEY (`court_id`) REFERENCES `court` (`court_id`) ON DELETE CASCADE;

--
-- Constraints for table `membership`
--
ALTER TABLE `membership`
  ADD CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `membership_ibfk_2` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`court_id`) REFERENCES `court` (`court_id`) ON DELETE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`court_id`) REFERENCES `court` (`court_id`) ON DELETE CASCADE;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE CASCADE;

--
-- Constraints for table `venue`
--
ALTER TABLE `venue`
  ADD CONSTRAINT `venue_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
