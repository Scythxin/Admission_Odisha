CREATE DATABASE IF NOT EXISTS admission_odisha;
USE admission_odisha;

-- 1. Fields Table
CREATE TABLE fields (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  short_desc TEXT,
  icon VARCHAR(255),
  created_at DATETIME,
  created_by INT,
  updated_at DATETIME,
  updated_by INT,
  is_status TINYINT DEFAULT 1
);

-- 2. Specializations Table
CREATE TABLE specializations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  field_id INT,
  name VARCHAR(150),
  short_desc TEXT,
  image VARCHAR(255),
  created_at DATETIME,
  created_by INT,
  updated_at DATETIME,
  updated_by INT,
  is_status TINYINT DEFAULT 1
);

-- 3. Specialization Details
CREATE TABLE specialization_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  specialization_id INT,
  intro TEXT,
  eligibility TEXT,
  created_at DATETIME,
  created_by INT,
  updated_at DATETIME,
  updated_by INT,
  is_status TINYINT DEFAULT 1
);

-- 4. Courses Table
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  specialization_id INT,
  name VARCHAR(150),
  duration VARCHAR(50),
  degree_level VARCHAR(50),
  created_at DATETIME,
  created_by INT,
  updated_at DATETIME,
  updated_by INT,
  is_status TINYINT DEFAULT 1
);

-- 5. Colleges Table
CREATE TABLE colleges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  location VARCHAR(150),
  rating FLOAT,
  image VARCHAR(255),
  created_at DATETIME,
  created_by INT,
  updated_at DATETIME,
  updated_by INT,
  is_status TINYINT DEFAULT 1
);

-- 6. College Courses Mapping
CREATE TABLE college_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_id INT,
  course_id INT,
  created_at DATETIME,
  created_by INT,
  updated_at DATETIME,
  updated_by INT,
  is_status TINYINT DEFAULT 1
);

-- 7. Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15),
  password VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME,
  updated_by INT,
  is_status TINYINT DEFAULT 1
);

-- 8. User Activity
CREATE TABLE user_activity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  field_id INT,
  specialization_id INT,
  course_id INT,
  activity_type VARCHAR(50),
  created_at DATETIME
);
