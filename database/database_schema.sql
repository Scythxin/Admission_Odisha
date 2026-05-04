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
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15) UNIQUE,
    password VARCHAR(255),
    city VARCHAR(100),   
    is_verified TINYINT DEFAULT 0,
    last_login DATETIME,
    login_count INT DEFAULT 0,
    created_at DATETIME,
    created_by INT,
    updated_at DATETIME,
    updated_by INT,
    is_status TINYINT DEFAULT 1
);

-- 8. OTP Verification Table
CREATE TABLE otp_verification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact VARCHAR(100),
    otp VARCHAR(6),
    expires_at DATETIME,
    is_used TINYINT DEFAULT 0,
    created_at DATETIME,
    created_by INT,
    updated_at DATETIME,
    updated_by INT,
    is_status TINYINT DEFAULT 1
);

-- 9. User Login Table
CREATE TABLE user_login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    login_time DATETIME,
    logout_time DATETIME,
    ip_address VARCHAR(50),
    device VARCHAR(50),
    browser VARCHAR(50),
    os VARCHAR(50),
    token TEXT,
    created_at DATETIME,
    created_by INT,
    updated_at DATETIME,
    updated_by INT,
    is_status TINYINT DEFAULT 1
);

-- 10. User Activity
CREATE TABLE user_activity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  field_id INT,
  specialization_id INT,
  course_id INT,
  activity_type VARCHAR(50),
  created_at DATETIME
);
