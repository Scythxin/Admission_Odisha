-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2026 at 07:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Database: `admission_odisha`
--

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE `colleges` (
    `id` int(11) NOT NULL,
    `name` varchar(150) DEFAULT NULL,
    `location` varchar(150) DEFAULT NULL,
    `rating` float DEFAULT NULL,
    `image` varchar(255) DEFAULT NULL,
    `banner_image` varchar(255) DEFAULT NULL,
    `description` text DEFAULT NULL,
    `type` varchar(100) DEFAULT NULL,
    `established_year` int(11) DEFAULT NULL,
    `approved_by` varchar(255) DEFAULT NULL,
    `campus_size` varchar(100) DEFAULT NULL,
    `website` varchar(255) DEFAULT NULL,
    `address` text DEFAULT NULL,
    `rankings` text DEFAULT NULL,
    `courses` json DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `colleges`
--

INSERT INTO
    `colleges` (
        `id`,
        `name`,
        `location`,
        `rating`,
        `image`,
        `banner_image`,
        `description`,
        `type`,
        `established_year`,
        `approved_by`,
        `campus_size`,
        `website`,
        `address`,
        `rankings`,
        `courses`,
        `created_at`,
        `is_status`
    )
VALUES (
        1,
        'Odisha University of Technology and Research',
        'Bhubaneswar',
        4.5,
        'uploads/banners/outr_banner.png',
        'uploads/banners/outr_banner.png',
        'OUTR (formerly CET Bhubaneswar) is a premier technical university in Odisha focused on innovation and technology.',
        'State University',
        1981,
        'UGC, AICTE',
        '100 Acres',
        'www.outr.ac.in',
        'Ghatikia, Bhubaneswar, Odisha',
        'Premier Technical University',
        '[{"name": "B.Tech", "duration": "4 Years"}, {"name": "M.Sc", "duration": "2 Years"}, {"name": "M.Tech", "duration": "2 Years"}, {"name": "E-Master", "duration": "1-2 Years"}, {"name": "Ph.D", "duration": "3 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        2,
        'Kalinga Institute of Medical Sciences',
        'Bhubaneswar',
        4.8,
        'uploads/banners/kims_banner.jpeg',
        'uploads/banners/kims_banner.jpeg',
        'KIMS provides high-quality medical education and healthcare services with state-of-the-art facilities.',
        'Deemed University',
        2007,
        'NMC, UGC',
        '400 Acres',
        'www.kims.kiit.ac.in',
        'Patia, Bhubaneswar, Odisha',
        'Top Medical College in Odisha',
        '[{"name": "MBBS", "duration": "5.5 Years"}, {"name": "PG (Medical)", "duration": "3 Years"}, {"name": "MD", "duration": "3 Years"}, {"name": "MS", "duration": "3 Years"}, {"name": "Allied Medical Courses", "duration": "2-3 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        3,
        'National Institute of Technology',
        'Rourkela',
        4.7,
        'uploads/colleges/nit.jpg',
        'uploads/banners/nitr_banner.jpeg',
        'National Institute of Technology Rourkela is a premier technical institute in India. It was established as Regional Engineering College Rourkela in 1961.',
        'Institute of National Importance',
        1961,
        'Ministry of Education, NIRF Ranked',
        '650 Acres',
        'www.nitrkl.ac.in',
        'Sector 1, Rourkela, Sundargarh, Odisha - 769008',
        'Ranked 16th in NIRF Engineering 2023',
        '[{"name": "B.Tech", "duration": "4 Years"}, {"name": "B.Tech & M.Tech Dual Degree", "duration": "5 Years"}, {"name": "M.Tech", "duration": "2 Years"}, {"name": "MBA", "duration": "2 Years"}, {"name": "M.Sc", "duration": "2 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        4,
        'KIIT University',
        'Bhubaneswar',
        4.6,
        'uploads/banners/kiit_banner.jpeg',
        'uploads/banners/kiit_banner.jpeg',
        'KIIT University, Bhubaneswar (Kalinga Institute of Industrial Technology) is a deemed to be university established in 1992. It is recognized as an Institution of Eminence by the Government of India. KIIT is known for its academic excellence, world-class infrastructure, global exposure and excellent placement record.',
        'Deemed University',
        1992,
        'UGC, AICTE, NAAC A++',
        '100+ Acres',
        'www.kiit.ac.in',
        'KIIT University, Patia, Bhubaneswar, Khorda, Odisha - 751024',
        'Among Top 20 Universities in India (NIRF 2024)',
        '[{"name": "B.Tech", "duration": "4 Years"}, {"name": "B.A", "duration": "3 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        5,
        'ITER University',
        'Bhubaneswar',
        4.4,
        'uploads/colleges/soa.jpg',
        'uploads/banners/iter_banner.jpeg',
        'The Institute of Technical Education and Research (ITER) is the flagship faculty of Engineering and Technology of Siksha ''O'' Anusandhan (SOA) Deemed-to-be University. It is recognized as a premier engineering institution in Eastern India.',
        'Deemed University',
        1996,
        'UGC, AICTE, NAAC A++',
        '127 Acres',
        'www.soa.ac.in',
        'Khandagiri, Bhubaneswar, Odisha - 751030',
        'Among Top 15 Universities in India (NIRF)',
        '[{"name": "B.Tech", "duration": "4 Years"}, {"name": "BCA", "duration": "3 Years"}, {"name": "M.Sc", "duration": "2 Years"}, {"name": "MCA", "duration": "2 Years"}, {"name": "M.Tech", "duration": "2 Years"}, {"name": "Ph.D", "duration": "3 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        6,
        'VSSUT Burla',
        'Sambalpur',
        4.3,
        'uploads/colleges/vssut.jpg',
        'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop',
        'Veer Surendra Sai University of Technology (VSSUT) is a premier government engineering university. It was established in 1956 as University College of Engineering (UCE) Burla.',
        'State University',
        1956,
        'UGC, AICTE',
        '184 Acres',
        'www.vssut.ac.in',
        'Burla, Sambalpur, Odisha - 768018',
        'Premier Government Technical University in Odisha',
        '[{"name": "B.Tech", "duration": "4 Years"}, {"name": "M.Tech", "duration": "2 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        7,
        'CET Bhubaneswar',
        'Bhubaneswar',
        4.1,
        NULL,
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=400&fit=crop',
        'College of Engineering and Technology, Bhubaneswar is now OUTR. It is a premier government engineering college.',
        'Government',
        1981,
        'UGC, AICTE',
        '100 Acres',
        'www.cet.edu.in',
        'Ghatikia, Bhubaneswar, Odisha',
        'Leading Government Engineering College',
        '[{"name": "B.Tech", "duration": "4 Years"}, {"name": "B.Arch", "duration": "5 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        8,
        'Centurion University',
        'Bhubaneswar',
        4,
        NULL,
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop',
        'Centurion University is a multi-sector, private state university from Odisha. It focus on skill-based education.',
        'Private University',
        2010,
        'UGC, NAAC A',
        '100+ Acres',
        'www.cutm.ac.in',
        'Jatni, Bhubaneswar, Odisha',
        'Skill-based Education Pioneer',
        '[{"name": "B.Sc", "duration": "3 Years"}, {"name": "B.Tech", "duration": "4 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        9,
        'Ravenshaw University',
        'Cuttack',
        4.2,
        NULL,
        'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop',
        'Ravenshaw University is one of the oldest and most prestigious educational institutions in India, located in Cuttack.',
        'State University',
        1868,
        'UGC, NAAC A',
        '87 Acres',
        'www.ravenshawuniversity.ac.in',
        'College Square, Cuttack, Odisha',
        'Historic Educational Institution',
        '[{"name": "B.A", "duration": "3 Years"}, {"name": "B.Com", "duration": "3 Years"}, {"name": "B.Sc", "duration": "3 Years"}]',
        '2026-05-03 22:56:50',
        1
    ),
    (
        10,
        'IIT Bhubaneswar',
        'Bhubaneswar',
        4.9,
        NULL,
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=400&fit=crop',
        'Indian Institute of Technology Bhubaneswar is a public technical university established by the government in 2008.',
        'Institute of National Importance',
        2008,
        'Ministry of Education',
        '936 Acres',
        'www.iitbbs.ac.in',
        'Argul, Bhubaneswar, Odisha',
        'Top Ranked Engineering Institute',
        '[{"name": "B.Tech", "duration": "4 Years"}, {"name": "M.Tech", "duration": "2 Years"}, {"name": "Ph.D", "duration": "3 Years"}]',
        '2026-05-03 22:56:50',
        1
    );

-- --------------------------------------------------------

--
-- Table structure for table `college_courses`
--

CREATE TABLE `college_courses` (
    `id` int(11) NOT NULL,
    `college_id` int(11) DEFAULT NULL,
    `course_id` int(11) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `college_courses`
--

INSERT INTO
    `college_courses` (
        `id`,
        `college_id`,
        `course_id`,
        `created_at`,
        `created_by`,
        `updated_at`,
        `updated_by`,
        `is_status`
    )
VALUES (
        1,
        4,
        1,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        2,
        5,
        1,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        3,
        10,
        1,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        4,
        4,
        2,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        5,
        5,
        2,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        6,
        10,
        2,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        7,
        4,
        4,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        8,
        5,
        4,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        9,
        10,
        4,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        10,
        4,
        6,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        11,
        5,
        6,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        12,
        10,
        6,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        13,
        4,
        10,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        14,
        5,
        10,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        15,
        10,
        10,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        16,
        1,
        2,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        17,
        6,
        2,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        18,
        7,
        2,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        19,
        1,
        3,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        20,
        6,
        3,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        21,
        7,
        3,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        22,
        1,
        4,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        23,
        6,
        4,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        24,
        7,
        4,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        25,
        1,
        5,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        26,
        6,
        5,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        27,
        7,
        5,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        28,
        1,
        7,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        29,
        6,
        7,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        30,
        7,
        7,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        31,
        8,
        12,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        32,
        9,
        12,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        33,
        8,
        14,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        34,
        9,
        14,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        35,
        8,
        17,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        36,
        9,
        17,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        37,
        8,
        20,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        38,
        9,
        20,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        39,
        8,
        21,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        40,
        9,
        21,
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    );

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
    `id` int(11) NOT NULL,
    `specialization_id` int(11) DEFAULT NULL,
    `name` varchar(150) DEFAULT NULL,
    `duration` varchar(50) DEFAULT NULL,
    `degree_level` varchar(50) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO
    `courses` (
        `specialization_id`,
        `name`,
        `duration`,
        `degree_level`,
        `created_at`,
        `is_status`
    )
VALUES
    -- Aeronautical Engineering (id 1)
    (
        1,
        'B.Tech in Aeronautical Engineering',
        '4 Years',
        'Undergraduate',
        NOW(),
        1
    ),
    (
        1,
        'B.E. in Aeronautical Engineering',
        '4 Years',
        'Undergraduate',
        NOW(),
        1
    ),
    (
        1,
        'M.Tech in Aeronautical Engineering',
        '2 Years',
        'Postgraduate',
        NOW(),
        1
    ),
    (
        1,
        'M.Tech in Avionics',
        '2 Years',
        'Postgraduate',
        NOW(),
        1
    ),
    (
        1,
        'M.E. in Aeronautical Engineering',
        '2 Years',
        'Postgraduate',
        NOW(),
        1
    ),
    (
        1,
        'M.E. in Avionics',
        '2 Years',
        'Postgraduate',
        NOW(),
        1
    ),

-- Aerospace Engineering (id 2)
(
    2,
    'B.Tech Degree',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    2,
    'Dual Degree (Bachelor + Master)',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    2,
    'M.Tech Degree with Specialization',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    2,
    'Ph.D Programs',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Architecture (id 3)
(
    3,
    'B.Arch.',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    3,
    'M.Arch.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    3,
    'Ph.D Programmes',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Artificial Intelligence and Machine Learning (id 4)
(
    4,
    'Machine Learning (Intermediate Level)',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    4,
    'Advanced Certification in AI & ML',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    4,
    'B.Tech Computer Science & Engineering with specialization in AI & Machine Learning',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    4,
    'B.Tech CS or IT/ECE/ME/IN',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    4,
    'M.Sc. degree in CS/IT',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Astronomy and Astrophysics (id 5)
(
    5,
    'M.Sc./M.Phil',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    5,
    'PhD (Physics)',
    'Varies',
    'Doctoral',
    NOW(),
    1
),
(
    5,
    'M.Sc. Astronomy',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    5,
    'M.Sc. Astrophysics',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    5,
    'Integrated M.Tech-Ph.D (Tech.) in Astronomical Instrumentation',
    '5 Years',
    'Integrated',
    NOW(),
    1
),
(
    5,
    'Ph.D Astrophysics/Astronomy',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Automobile Engineering (id 6)
(
    6,
    'B.Tech in Automobile Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    6,
    'Dual Courses',
    'Varies',
    'Integrated',
    NOW(),
    1
),
(
    6,
    'M.Tech in Automobile Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Bio Medical Engineering (id 7)
(
    7,
    'B.Sc. in Bio medical Science',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    7,
    'B.Tech in Biomedical Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    7,
    'Dual Degree Programmes',
    '5 Years',
    'Integrated',
    NOW(),
    1
),
(
    7,
    'Ph.D programme in Bio medical science',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Bio Technology Engineering (id 8)
(
    8,
    'B.Tech in Biotechnology',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    8,
    'M.Tech in Biotechnology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Ceramics Engineering (id 9)
(
    9,
    'B.Tech',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    9,
    'M.Tech',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Chemical Engineering (id 10)
(
    10,
    'B.Tech',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    10,
    'M.Tech',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Civil Engineering (id 11)
(
    11,
    'B.Tech',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    11,
    'M.Tech',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    11,
    'Dual Degree',
    '5 Years',
    'Integrated',
    NOW(),
    1
),
(
    11,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Computer Science Engineering (id 12)
(
    12,
    'B.Tech Computer Science and Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    12,
    'B.Tech Computer Science and Information Technology',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    12,
    'B.Tech Computer Software Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),

-- Electrical And Electronics Engineering (id 13)
(
    13,
    'B.Tech',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    13,
    'M.Tech',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Electronics And Communication Engineering (id 14)
(
    14,
    'Diploma in Electronics and Communication Engineering',
    '3 Years',
    'Diploma',
    NOW(),
    1
),
(
    14,
    'Bachelor of Engineering in Electronics & Communication Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    14,
    'Master of Engineering in Electronics & Communication Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Industrial Engineering (id 15)
(
    15,
    'B.Tech',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    15,
    'M.Tech',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Information Communications And Entertainment (id 16)
(
    16,
    'B.A Mass Communication',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    16,
    'B.A. Journalism',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),

-- Instrumentation Engineering (id 17)
(
    17,
    'B.E./B.Tech',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    17,
    'M.E./M.Tech',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    17,
    'M.Phil',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),
(
    17,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Manufacturing Science & Engineering (id 18)
( 18, 'B.E./B.Tech', '4 Years', 'Undergraduate', NOW(), 1 ),

-- Marine Engineering (id 19)
(
    19,
    'Diploma in Marine Engineering',
    '3 Years',
    'Diploma',
    NOW(),
    1
),
(
    19,
    'Bachelor of Engineering in Marine Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    19,
    'Bachelor of Technology in Marine Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    19,
    'Bachelor of Technology in Naval architecture & Ocean Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    19,
    'Master of Technology in Air Armament',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    19,
    'Master of Engineering in Marine Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    19,
    'Master of Technology in Marine Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    19,
    'Master of Technology in Ocean Engineering and Naval Architecture',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Mechanical Engineering (id 20)
(
    20,
    'Certificate in Mechanic of four Wheeler',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    20,
    'Diploma in Mechatronics',
    '3 Years',
    'Diploma',
    NOW(),
    1
),
(
    20,
    'Diploma in Mechanical Engineering',
    '3 Years',
    'Diploma',
    NOW(),
    1
),
(
    20,
    'Bachelor of Engineering in Mechanical Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    20,
    'Bachelor of Technology in Mechanical & Automation Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    20,
    'Bachelor of Technology in Mechanical Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    20,
    'Bachelor of Technology in Mechatronics',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    20,
    'Master of Engineering in Mechanical Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    20,
    'Master of Engineering in Tool Design',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    20,
    'Master of Technology in Mechanical Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    20,
    'Doctor of Philosophy in Mechanical Engineering',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Medical Electronics Engineering (id 21)
(
    21,
    'Bachelor of Engineering in Medical Electronics',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    21,
    'Bachelor of Technology in Medical Electronics',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    21,
    'Bachelor of Engineering in Medical Electronics Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),

-- Metallurgy (id 22)
(
    22,
    'Bachelor of Technology (B.Tech.) in Metallurgy and Materials Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    22,
    'Master of Technology (M.Tech.) in Material Science and Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    22,
    'B.E./B.Tech. or equivalent in Metallurgical/Materials/Metallurgy and Materials/Mechanical/Production/Ceramics Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),

-- Meteorology (id 23)
(
    23,
    'B.Tech/B.Sc.',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    23,
    'M.Tech/M.Sc.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    23,
    'Ph.D.',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Mining Engineering (id 24)
(
    24,
    'BE Mining Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    24,
    'B.Tech Mining Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    24,
    'Diploma in Mining and Mine Surveying Engineering',
    '3 Years',
    'Diploma',
    NOW(),
    1
),
(
    24,
    'ME Mining Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    24,
    'M.Tech Mining Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    24,
    'PG Research Programme on Materials Resource Engineering',
    'Varies',
    'Postgraduate',
    NOW(),
    1
),
(
    24,
    'Ph.D Mining Engineering',
    'Varies',
    'Doctoral',
    NOW(),
    1
),
(
    24,
    'Postgraduate Diploma in Mineral Engineering',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Naval Architecture Engineering (id 25)
( 25, 'BE course', '4 Years', 'Undergraduate', NOW(), 1 ),

-- Physical Sciences (id 26)
(
    26,
    'B.Sc/M.Sc',
    '3-5 Years',
    'Undergraduate/Postgraduate',
    NOW(),
    1
),
(
    26,
    'B.Tech /M.Tech Biological Engineering',
    '4-6 Years',
    'Undergraduate/Postgraduate',
    NOW(),
    1
),

-- Polymer Engineering (id 27)
(
    27,
    'B.E. Polymer Science and Chemical Technology',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    27,
    'B.E. Polymer Technology',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    27,
    'B.Tech Polymer Science and Technology',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    27,
    'M.E. Polymer Technology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    27,
    'M.Tech Polymer Science and Technology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    27,
    'Ph.D Polymer Science and Technology',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Robotics (id 28)
(
    28,
    'Bachelor of Technology',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    28,
    'Bachelor of Engineering (in mechanical/electrical/instrumentation/computer engineering)',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    28,
    'M.Tech in Robotics',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    28,
    'M.Tech in Artificial Intelligence',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    28,
    'M.Tech in Robotics Engineering',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    28,
    'M.Tech in Automation and Robotics',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    28,
    'Diploma in Robotics',
    '3 Years',
    'Diploma',
    NOW(),
    1
),

-- Textile Engineering (id 29)
(
    29,
    '3 year Diploma course in Textile Engineering/ Textile Chemical Processing Technology (DCTPT)/ Textile Colour and Design (DTCD)',
    '3 Years',
    'Diploma',
    NOW(),
    1
),
(
    29,
    'B.E./ B.Tech in Textile Engg./ Textile chemistry / Textile Technology / Textile plant Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    29,
    'M.Tech in Textile',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    29,
    'Post Graduate Diploma in Textile Chemical Processing (PGDTCP)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Agricultural Science (id 30)
(
    30,
    'Diploma in Agriculture',
    '2-3 Years',
    'Diploma',
    NOW(),
    1
),
(
    30,
    'Diploma in Horticulture',
    '2-3 Years',
    'Diploma',
    NOW(),
    1
),
(
    30,
    'Bachelor of Science (Honours) in Agriculture',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    30,
    'Bachelor of Fisheries Science (B.F.Sc.)',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    30,
    'B.Sc. Food Technology',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    30,
    'B.Sc. Horticulture',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    30,
    'B.Tech Biotechnology',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    30,
    'B.Tech. Agriculture Engineering',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    30,
    'Master of Science in Agriculture',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    30,
    'MBA Agri-business',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    30,
    'M.Sc. Agricultural Biotechnology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    30,
    'Master of Science in Agriculture',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    30,
    'Doctor of Philosophy in Agriculture',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Biological Science (id 31)
(
    31,
    'Bachelor in Biological Science',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    31,
    'Master in Biological Science',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    31,
    'PhD in Biological Science',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Biotechnology (id 32)
(
    32,
    'B.Sc. in Biotechnology',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    32,
    'M.Sc. in Biotechnology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    32,
    'M.Sc. (Agriculture) Biotechnology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    32,
    'M.Sc. Animal Biotechnology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    32,
    'M.Tech Biotechnology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Computer Applications (id 33)
(
    33,
    'Diploma in Computer Application',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    33,
    'Bachelor in Computer Application',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    33,
    'Master in Computer Application',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Computer Science (id 34)
(
    34,
    'A level - Advanced diploma (equal to Bachelor degree)',
    'Varies',
    'Diploma',
    NOW(),
    1
),
(
    34,
    'B level (equal to MCA degree)',
    'Varies',
    'Diploma',
    NOW(),
    1
),
(
    34,
    'C level (equal to M.Tech)',
    'Varies',
    'Diploma',
    NOW(),
    1
),
(
    34,
    'B.E./B.Tech (Comp Science, Info Science, Info Tech)',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    34,
    'B.Sc (CS, IT, IS)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    34,
    'BCA',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    34,
    'ME/M.Tech',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    34,
    'MCA',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    34,
    'M.Sc (CS, IT)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    34,
    'PGDIIT, PGDCA',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    34,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Cyber Security (id 35)
(
    35,
    'B.Tech in Cyber Security',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    35,
    'B.Tech in Computer Science or IT + M.Tech in Information Security or Cyber Security',
    '5-6 Years',
    'Integrated',
    NOW(),
    1
),

-- Earth Sciences/Geography (id 36)
(
    36,
    'BA with Geography as a subject',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    36,
    'BA Honors (Geography)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    36,
    'Integrated M.Tech (Geophysical Technology)',
    '5 Years',
    'Integrated',
    NOW(),
    1
),
(
    36,
    'Integrated M.Tech (Geological Technology)',
    '5 Years',
    'Integrated',
    NOW(),
    1
),
(
    36,
    'M.Tech Earth Sciences',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    36,
    'M.Sc (Applied Geology)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    36,
    'M.Phil Geology',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),
(
    36,
    'M.Phil Geoinformatics',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),
(
    36,
    'Ph.D Geology',
    'Varies',
    'Doctoral',
    NOW(),
    1
),
(
    36,
    'MA Geography',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    36,
    'M.Sc Geography',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    36,
    'M.Sc, M.Phil & Ph.D (various)',
    'Varies',
    'Multiple',
    NOW(),
    1
),
(
    36,
    'M.Sc Geology (Five Year Integrated)',
    '5 Years',
    'Integrated',
    NOW(),
    1
),
(
    36,
    'M.Sc Geology (Two Year CBCS)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    36,
    'PG Diploma in Petroleum Geoscience',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    36,
    'PG Diploma in Remote Sensing and GIS',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Environmental Sciences (id 37)
(
    37,
    'Bachelor’s Degree',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    37,
    'Master’s Degree',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    37,
    'Ph.D (Environmental Science)',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Fisheries (id 38)
(
    38,
    'Bachelor of Fisheries Science (B.F.Sc.)',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    38,
    'B.Sc. Fisheries',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    38,
    'M.F.Sc.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Floriculture/Horticulture (id 39)
(
    39,
    'Diploma in Horticulture',
    '2-3 Years',
    'Diploma',
    NOW(),
    1
),
(
    39,
    'B.Sc. in Horticulture',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    39,
    'M.Sc. in Horticulture',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    39,
    'Ph.D in Horticulture',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Food Technology (id 40)
(
    40,
    'Diploma Course',
    '2-3 Years',
    'Diploma',
    NOW(),
    1
),
(
    40,
    'Bachelor in Science',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    40,
    'Master in Science',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Forestry (id 41)
(
    41,
    'B.Sc. Forestry / Wildlife',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    41,
    'M.Sc. Forestry / Wildlife / Forest Economics',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    41,
    'M.Sc. Wood Science and Technology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    41,
    'Post Graduate Diploma in Forest Management (PGDFM)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Oceanography (id 42)
(
    42,
    'M.Sc. Oceanography and Coastal Area Studies',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    42,
    'M.Sc. Oceanography',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    42,
    'M.Phil. Chemical Oceanography',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),
(
    42,
    'M.Tech Ocean Technology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    42,
    'M.Sc. Marine Biology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Statistical Sciences (id 43)
(
    43,
    'Diploma in Applied Maths',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    43,
    'Diploma in Maths with computer programming',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    43,
    'Bachelor of Statistics (Hons)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    43,
    'Bachelor of Mathematics (Hons)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    43,
    'Bachelor’s in Statistical Methods',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    43,
    'Bachelor’s in Applied Mathematics & Statistics',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    43,
    'Masters in Statistics',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    43,
    'Masters in Mathematics',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    43,
    'M.Tech in Quality & Reliability and operations research',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    43,
    'Masters of Science (MS) in Quantitative Economics',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    43,
    'P.G. Dip in Applied Maths (Industrial maths)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    43,
    'M.Phil (Mathematics)',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),
(
    43,
    'Ph.D in Mathematics',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Veterinary Sciences (id 44)
(
    44,
    'Bachelor of Veterinary Science & Animal Husbandry',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    44,
    'Bachelor of Veterinary Science',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    44,
    'Master of Veterinary Science',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Wildlife Biology (id 45)
(
    45,
    'B.Sc. in Wild Life Biology',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    45,
    'M.Sc. in Wild Life Biology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Zoology (id 46)
(
    46,
    'B.Sc. in Zoology',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    46,
    'M.Sc. in Zoology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    46,
    'M.Phil. in Zoology',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),
(
    46,
    'Ph.D. in Zoology',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Ayurveda (BAMS) (id 47)
(
    47,
    'Certificate course in Ayurvedic Cosmetics',
    '1 Year',
    'Certificate',
    NOW(),
    1
),
(
    47,
    'Diploma in Ayurvedic Pharmacy (D.Pharma)',
    '2 Years',
    'Diploma',
    NOW(),
    1
),
(
    47,
    'Bachelor of Ayurvedic Medicine & Surgery (B.A.M.S.)',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    47,
    'Bachelor in Ayurvedic Pharmacy (B.Pharma)',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    47,
    'Master in Ayurvedic Pharmacy (M.Pharma)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    47,
    'Master of Science in Medicinal Plants (M.Sc.)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    47,
    'Masters in Ayurveda (MD)',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    47,
    'PG Diploma in Ayurvedic Drug Standardisation',
    '2 Years',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Dentistry (BDS) (id 48)
(
    48,
    'Bachelor of Dental Surgery (BDS)',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    48,
    'Master in Dental Surgery (MDS)',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Homeopathy (id 49)
(
    49,
    'Bachelor of Homeopathic Medicine and Surgery (BHMS)',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    49,
    'MD (Hom.)',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Naturopathy (id 50)
(
    50,
    'Foundation Course in Yoga Science for Wellness (FCYSCW)',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    50,
    'Diploma in Yoga Science (D.Y.Sc.) for Graduates',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    50,
    'B.Sc. (Yoga Science) for 10+2 Science (Biology)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    50,
    'Bachelor of Naturopathy & Yogic Sciences (BNYS)',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    50,
    'M.D. Yoga & Naturopathy',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Pharmacy (id 51)
(
    51,
    'Diploma in Pharmacy',
    '2 Years',
    'Diploma',
    NOW(),
    1
),
(
    51,
    'Bachelor’s in Pharmacy',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    51,
    'Master’s in Pharmacy',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    51,
    'M.Tech (Pharm.)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    51,
    'MBA (Pharm.)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    51,
    'MS (Pharm.)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    51,
    'Ph.D. in Pharmacy',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Siddha (id 52)
(
    52,
    'Bachelor of Siddha Medicine & Sciences (BSMS)',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    52,
    'MD - Siddha Medicine',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Unani (id 53)
(
    53,
    'Bachelor of Unani Medicine and Surgery (BUMS)',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    53,
    'Kamil-e-Tob-o-Jarahat',
    'Varies',
    'Undergraduate',
    NOW(),
    1
),
(
    53,
    'Mahir-e-Tibb',
    'Varies',
    'Postgraduate',
    NOW(),
    1
),
(
    53,
    'MD/MS (Unani)',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Anthropology (id 54)
(
    54,
    'B.A./B.Sc.',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    54,
    'M.A./M.Sc.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    54,
    'M.Phil.',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),
(
    54,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Archaeology (id 55)
(
    55,
    'Bachelors of Arts in Ancient Indian Culture',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    55,
    'Bachelors of Arts in Ancient Indian History and Archaeology',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    55,
    'Bachelors of Arts Archaeology and Museology',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    55,
    'Master of Arts in Archaeology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    55,
    'Master of Arts in Museology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Art Restoration (id 56)
(
    56,
    'Bachelor’s degree in art history, studio art, anthropology, archaeology',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    56,
    'M.A. in art history, studio art, anthropology, archaeology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    56,
    'PhD in Art Conservation',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Curation (id 57)
(
    57,
    'M.A.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    57,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Educational/Vocational School Counsellor (id 58)
(
    58,
    'Advanced Diploma in Child Guidance and Counselling',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    58,
    'Diploma Course in Guidance and Counselling',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    58,
    'Certificate Course in Counselling and Guidance',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    58,
    'BA/MA in psychology, child development or social work',
    '3-5 Years',
    'Undergraduate/Postgraduate',
    NOW(),
    1
),

-- Monuments And Sculpture Restoration (id 59)
(
    59,
    'Bachelor’s Degree (archaeology, ancient history, world history, studio art, fine art, art history)',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    59,
    'M.A. in Conservation, Preservation and Heritage Management',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    59,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Museology (id 60)
(
    60,
    'PG Diploma in Museology',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    60,
    'MA in Museology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Physiotherapy (id 61)
(
    61,
    'Bachelor of Physiotherapy (BPT)',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    61,
    'Master of Physiotherapy (MPT)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    61,
    'Post Graduate Certificate Course in Sports Physiotherapy (PGCSP)',
    'Varies',
    'Certificate',
    NOW(),
    1
),

-- Rehabilitation Psychology (id 62)
(
    62,
    'Post Graduate Diploma in Rehabilitation Psychology',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    62,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Rehabilitation Therapy (id 63)
(
    63,
    'Certificate in Rehabilitation Counselling',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    63,
    'Diploma in Special Education (Hearing Impaired)',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    63,
    'Diploma in Special Education (Visually Handicapped)',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    63,
    'Diploma in Special Education (Mental Retardation)',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    63,
    'Bachelor of Science (Hons.) Physical Therapy',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    63,
    'Bachelor in Mental Retardation',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    63,
    'Bachelor of Education (Hearing Impaired)',
    '2 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    63,
    'Bachelor of Education (Visually Handicapped)',
    '2 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    63,
    'Bachelor of Special Education (Hearing Impairment)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    63,
    'Master of Rehabilitation Therapy',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    63,
    'Master of Occupational Therapy',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    63,
    'Master of Science in Rehabilitation with Persons of Multiple Disabilities',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Social Work (id 64)
(
    64,
    'Bachelor of Social Work (BSW)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    64,
    'BA - Bachelor’s in Social Work',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    64,
    'Master of Social Work (MSW)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Special Educator (id 65)
(
    65,
    'Diploma in Special Education',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    65,
    'B.Ed. (Special Education)',
    '2 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    65,
    'M.Ed. (Special Education)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    65,
    'M.Phil. (Special Education)',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),

-- Speech Language And Hearing (id 66)
(
    66,
    'Diploma in Hearing, Language & Speech',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    66,
    'Bachelor of Audiology & Speech Language Pathology',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    66,
    'Master of Audiology & Speech Language Pathology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    66,
    'Post Graduate Certificate Course in Auditory Verbal Therapy',
    'Varies',
    'Certificate',
    NOW(),
    1
),

-- Law (id 67)
(
    67,
    'Integrated course - BA LLB / BSc LLB / BPSC LLB',
    '5 Years',
    'Integrated',
    NOW(),
    1
),
(
    67,
    'Bachelor of Law (LLB)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    67,
    'Bachelor of General Laws (BGL)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    67,
    'Masters of Laws (LLM)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    67,
    'Master of Comparative Laws (MCL)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    67,
    'Doctor in Law (LLD)',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Advertising (id 68)
(
    68,
    'Diploma / PG Diploma in Advertising & Photography',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    68,
    'Diploma / PG Diploma in Advertising',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    68,
    'PG Diploma in Marketing Communications Management',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    68,
    'PG Diploma in Advertising & Marketing Communication',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    68,
    'Integrated BA in Advertising, Sales Promotion & Sales Management',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    68,
    'MBA - Advertising, Public Relations, Sales Marketing',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Journalism (id 69)
(
    69,
    'B.J. (Bachelor of Journalism)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    69,
    'B.J.M.C. (Bachelor of Journalism and Mass Communication)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    69,
    'B.A - J.M.C. (Bachelor of Arts in Journalism and Mass Communication)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    69,
    'B.C.J. (Bachelor of Communication and Journalism)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    69,
    'B.M.M. (Bachelor of Mass Media)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    69,
    'B.J (Hons) (Bachelor of Journalism (Honours))',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    69,
    'B.A - Mass Communication (Bachelor of Arts in Mass Communication)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),

-- Mass Communication (id 70)
(
    70,
    'B.A. (Mass Communication)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    70,
    'B.B.A (Mass Media Management)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    70,
    'PG Diploma (Mass Communication & Journalism)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    70,
    'M.A. (Communication and Journalism)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    70,
    'M.A. (Mass Communication & Journalism)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    70,
    'M.A. (Mass Communication)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    70,
    'M.B.A. (Mass Media Management)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    70,
    'Ph.D in Mass',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Public Relations (id 71)
(
    71,
    'MA (Advertising and Public Relations)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    71,
    'PG Diploma in Advertising and Public Relations',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    71,
    'MBA (Advertising and Public Relations)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Art Direction (id 72)
(
    72,
    'B.Sc. (Cinema) + Diploma in Direction',
    'Varies',
    'Integrated',
    NOW(),
    1
),
(
    72,
    'Post Graduate Diploma in Art Direction and Production Design',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Choreography (id 73)
(
    73,
    'B.A in art and dance',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    73,
    'B.A. in Dance',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    73,
    'B.P.A. in Dance - Kathak',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    73,
    'M.A. in Dance',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Direction (Film/Drama) (id 74)
(
    74,
    'PG Diploma in Film, Television and Digital Video Production',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    74,
    'One Year Post Graduate Diploma in Feature Film Screenplay Writing',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    74,
    'Postgraduate Programme in Cinema (Direction & Screenplay Writing) - 3 year full time',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    74,
    'Three Year Post Graduate Diploma in Direction & Screenplay Writing',
    '3 Years',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    74,
    'Post Graduate Diploma in Art Direction and Production Design',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    74,
    'One Year Post Graduate Certificate Course in TV Direction',
    '1 Year',
    'Certificate',
    NOW(),
    1
),
(
    74,
    'Three-year full-time Diploma Courses in Dramatic Arts',
    '3 Years',
    'Diploma',
    NOW(),
    1
),

-- Film/Drama Production (id 75)
(
    75,
    'PG Diploma in Film, Television and Digital Video Production',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    75,
    'One Year Post Graduate Diploma in Feature Film Screenplay Writing',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    75,
    'Postgraduate Programme in Cinema (specialization in Direction & Screenplay Writing)',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    75,
    'Three Year Post Graduate Diploma in Direction & Screenplay Writing',
    '3 Years',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    75,
    'Post Graduate Diploma in Art Direction and Production Design',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    75,
    'One Year Post Graduate Certificate Course in TV Direction',
    '1 Year',
    'Certificate',
    NOW(),
    1
),
(
    75,
    'Three-year full-time Diploma Courses in Dramatic Arts',
    '3 Years',
    'Diploma',
    NOW(),
    1
),

-- Fine Arts (id 76)
(
    76,
    'Diploma in Fine Arts',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    76,
    'Bachelor in Fine Arts',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    76,
    'Master of Fine Arts',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    76,
    'PhD in Fine Arts',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Performing Arts (id 77)
(
    77,
    'Certificate in Performing Arts',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    77,
    'BFA (Bachelor of Fine Arts)',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    77,
    'BVA (Bachelor of Visual Arts)',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    77,
    'B.Cr.A (Bachelor of Creative Arts)',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    77,
    'B.P.A. (Performing Arts)',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    77,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Vocal and Instrumental Music (id 78)
(
    78,
    'BA Honours in Hindustani Music - Vocal/Instrumental (Sitar/Sarod/Guitar/Violin/Santoor)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    78,
    'BA Honours in Karnataka Music Vocal/Instrumental (Veena/Violin)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    78,
    'BA Honours in Percussion Music (Tabla/Pakhawaj)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    78,
    'MA (Music)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    78,
    'MPhil/PhD (Music)',
    'Varies',
    'Postgraduate/Doctoral',
    NOW(),
    1
),

-- Animation (id 79)
(
    79,
    'Certificate courses',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    79,
    'Diploma courses',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    79,
    'Bachelor’s Degree courses',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),

-- Cinematography (id 80)
(
    80,
    'Diploma in Cinematography',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    80,
    'Diploma in Film Making',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    80,
    'Bachelor of Film and Television Production',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    80,
    'PG Diploma in Film, Television and Digital Video Production',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    80,
    'Post Graduate Certificate Course in Electronic Cinematography (TV)',
    '1 Year',
    'Certificate',
    NOW(),
    1
),

-- Communication Design (id 81)
(
    81,
    'No specific courses listed in PDF; specialization exists in list but no details',
    'Varies',
    'Varies',
    NOW(),
    1
),

-- Design (id 82)
(
    82,
    'B.Des.',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    82,
    'M.Des.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    82,
    'MA (Interior Design)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Graphic Designing (id 83)
(
    83,
    'Graduate Diploma Programme in Graphic Design',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    83,
    'BA Animation and Graphic Design',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    83,
    'Advanced Diploma in Graphic Design and Web Design',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    83,
    'Diploma in Graphic Designing',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),

-- Photography (id 84)
(
    84,
    'Bachelor of Fine Arts Specialization',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    84,
    'Course in Visual Communication',
    'Varies',
    'Certificate/Diploma',
    NOW(),
    1
),
(
    84,
    'MFA',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Actuarial Sciences (id 85)
(
    85,
    'PG Diploma in Actuarial sciences (PGDAS)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    85,
    'International Post Graduate Diploma in Life Insurance (IPGDLI)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    85,
    'International Post Graduate Diploma in General Insurance (IPGDGI)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    85,
    'International Post Graduate Diploma in Risk Management (IPGDRM)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    85,
    'Actuarial exams by IAI (Core Technical, Core Application, Specialist Technical, Specialist Application)',
    'Varies',
    'Professional',
    NOW(),
    1
),

-- Bank Management (id 86)
(
    86,
    'Bachelor in Finance & Investment',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    86,
    'B.Com/M.Com or BBA/MBA (Finance)',
    '3-5 Years',
    'Undergraduate/Postgraduate',
    NOW(),
    1
),
(
    86,
    'Financial Accounting',
    'Varies',
    'Certificate/Diploma',
    NOW(),
    1
),
(
    86,
    'Financial Management',
    'Varies',
    'Certificate/Diploma',
    NOW(),
    1
),
(
    86,
    'International Corporate Finance Management',
    'Varies',
    'Certificate/Diploma',
    NOW(),
    1
),
(
    86,
    'Accounting Portfolio Management',
    'Varies',
    'Certificate/Diploma',
    NOW(),
    1
),
(
    86,
    'Risk Management',
    'Varies',
    'Certificate/Diploma',
    NOW(),
    1
),

-- Business Administration (id 87)
(
    87,
    'Bachelor of Business Administration (BBA)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    87,
    'Bachelor of Business Management (BBM)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    87,
    'Bachelor of Business Studies (BBS)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    87,
    'MBA',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    87,
    'PGDM (Post Graduate Diploma in Management/Business administration)',
    '2 Years',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    87,
    'Post Graduate Diploma in Business Administration (PGDBA)',
    '1-2 Years',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    87,
    'Diploma in Business Administration (DBA)',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    87,
    'Advance Diploma in Business Administration (ADBA)',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    87,
    'Advance Diploma in International Hotel and Business Administration',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),

-- Business Management (id 88)
(
    88,
    'BBA/MBA in Sales/Marketing/HR/Finance',
    '3-5 Years',
    'Undergraduate/Postgraduate',
    NOW(),
    1
),
(
    88,
    'BA (Economics)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    88,
    'B.Com/M.Com',
    '3-5 Years',
    'Undergraduate/Postgraduate',
    NOW(),
    1
),

-- Costs and Works Accounts (id 89)
(
    89,
    'Foundation Course',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    89,
    'Intermediate Course (Part I)',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    89,
    'Intermediate Course (Part II)',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    89,
    'Final Course (Part III)',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    89,
    'Final Course (Part IV)',
    'Varies',
    'Professional',
    NOW(),
    1
),

-- Chartered Accountancy (id 90)
(
    90,
    'CA - Foundation Course',
    '10 months',
    'Professional',
    NOW(),
    1
),
(
    90,
    'CA - Intermediate Course',
    'Varies',
    'Professional',
    NOW(),
    1
),

-- Chartered Financial Analysis (id 91)
(
    91,
    'Regular CFA Program',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    91,
    'Accelerated CFA Program',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    91,
    'CPA Program (Certified Public Accountant)',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    91,
    'C-RIM Program (Certified Risk & Insurance Manager)',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    91,
    'CTM Program (Certified Treasury Manager)',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    91,
    'CIB Program (Certified Investment Banker)',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    91,
    'CPM Program (Certified Portfolio Manager)',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    91,
    'Global Strategic Management (GSM) Program',
    'Varies',
    'Professional',
    NOW(),
    1
),

-- Event Management (id 92)
(
    92,
    'Certificate Course in Event Management (CEM)',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    92,
    'Diploma in Event Management (DEM)',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    92,
    'Graduate in Management/Event Management',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    92,
    'Post-Graduate Diploma in Event Management (PGDEM)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Hospital Management (id 93)
(
    93,
    'Bachelor of Hospital Management (BHA)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    93,
    'Master of Hospital Management (MHA)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    93,
    'M.Phil. - Hospital & Health Management systems',
    '1 Year',
    'Postgraduate',
    NOW(),
    1
),
(
    93,
    'Ph.D. programme in Health Services Management',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Hotel Management (id 94)
(
    94,
    'Diploma in Food & Beverages',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    94,
    'Diploma in Front Office',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    94,
    'Diploma in House Keeping',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    94,
    'Diploma in Dietetics and Nutrition',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    94,
    'Diploma Front Office and Tourism Management',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    94,
    'Diploma in Teaching of hotel Management',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    94,
    'Diploma in Hotel Management & Catering Technology',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    94,
    'Diploma in Culinary Arts and Kitchen Administration (Chef Training)',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    94,
    'Bachelor in Hotel Management',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    94,
    'BSc in Hospitality and Hotel Administration',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    94,
    'BSc Hotel Management',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    94,
    'MSc in Hospitality Administration',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    94,
    'PG Diploma in Accommodation Operations & Management',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Human Resource Management (id 95)
(
    95,
    'Certificate Courses in Human Resource Management',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    95,
    'Bachelor of Business Administration in Human Resource Management',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    95,
    'Master of Business Administration in Human Resource Management',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    95,
    'Master of Human Resource Development',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    95,
    'Master of Business Administration in Personnel Administration',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    95,
    'Post Graduate Program in Human Resource Management',
    '1-2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    95,
    'Diploma Courses in Human Resource Management',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    95,
    'Executive Diploma Programme in Human Resource Management',
    '1 Year',
    'Diploma',
    NOW(),
    1
),

-- Insurance (id 96)
(
    96,
    'Certificate course on Compliance, Governance and Risk Management in Insurance',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    96,
    'Executive Diploma in Insurance Management',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    96,
    'B.Com/M.Com/MBA',
    '3-5 Years',
    'Undergraduate/Postgraduate',
    NOW(),
    1
),
(
    96,
    'Post Graduate Certificate in Health Insurance',
    '1 Year',
    'Certificate',
    NOW(),
    1
),
(
    96,
    'Post graduate diploma in insurance marketing',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Logistics & Supply Chain Management (id 97)
(
    97,
    'Certificate course in logistics Management',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    97,
    'Diploma in Cargo and Courier Management',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    97,
    'Diploma in logistics Management',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    97,
    'PG Diploma in logistics and supply chain management',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Management (id 98)
(
    98,
    'BBA/MBA',
    '3-5 Years',
    'Undergraduate/Postgraduate',
    NOW(),
    1
),
(
    98,
    'Master of Marketing Research (MMR)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    98,
    'Post graduate diploma or degree after finishing graduation',
    '1-2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    98,
    'M.Tech, M.Sc and Graduate diploma',
    'Varies',
    'Multiple',
    NOW(),
    1
),
(
    98,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Bachelor of Arts (id 99)
(
    99,
    'B.A.',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    99,
    'M.A.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    99,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Diploma in Elementary Education (D.El.Ed.) / Bachelor of Education (B.Ed.) (id 100)
(
    100,
    'D.El.Ed./D.Ed.',
    '2 Years',
    'Diploma',
    NOW(),
    1
),
(
    100,
    'B.Ed.',
    '2 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    100,
    'B.Ed. (Special - Visual Impairment)',
    '2 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    100,
    'B.Ed. (Special - Hearing Impairment)',
    '2 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    100,
    'B.Ed. (Special - Mental Retardation)',
    '2 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    100,
    'M.Ed.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    100,
    'M.Ed. (Special - Visual Impairment)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    100,
    'M.Ed. (Special - Hearing Impairment)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    100,
    'M.Ed. (Special - Mental Retardation)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    100,
    'M.Ed. (Part Time)',
    '2-3 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    100,
    'Ph.D. (Education)',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Corporate Intelligence (id 101)
(
    101,
    'CIP-I and Master of CI (CIP-II Module Courses)',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    101,
    'CIP-I Level Certification (CI 101, CI 301, CI 302, CI 303, CI 304)',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    101,
    'Master of CI CIP-II Level Certification (CI 401, CI 402, CI 403)',
    'Varies',
    'Certificate',
    NOW(),
    1
),

-- Detective (id 102)
(
    102,
    'Forensic Detective',
    'Varies',
    'Certificate/Diploma',
    NOW(),
    1
),
(
    102,
    'Private Investigator / Detective',
    'Varies',
    'Certificate/Diploma',
    NOW(),
    1
),

-- Food Science and Nutrition (id 103)
(
    103,
    'B.Sc. - Food Science and Nutrition',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    103,
    'M.Sc. - Food Science and Nutrition',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    103,
    'Ph.D',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Foreign Languages (id 104)
(
    104,
    'Certificate / Diploma / Advance Diploma Courses (Japanese, Italian, German, Russian, Chinese, Portuguese, Spanish, Persian, Arabic, French)',
    '2 months - 1 year',
    'Certificate/Diploma',
    NOW(),
    1
),
(
    104,
    'Bachelor’s Degree & PG Diploma Courses',
    '2-3 Years',
    'Undergraduate/Diploma',
    NOW(),
    1
),
(
    104,
    'Masters degree (MPhil, MA, Ph.D, etc.)',
    '1-2 Years',
    'Postgraduate/Doctoral',
    NOW(),
    1
),
(
    104,
    '5 year Integrated Masters course',
    '5 Years',
    'Integrated',
    NOW(),
    1
),
(
    104,
    'Summer courses',
    '21 months (summer sessions)',
    'Certificate',
    NOW(),
    1
),

-- Home Science (id 105)
(
    105,
    'B.Sc. in Home Science',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    105,
    'M.Sc. Home Science',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    105,
    'Ph.D. in Food and Nutrition',
    'Varies',
    'Doctoral',
    NOW(),
    1
),
(
    105,
    'Ph.D. in HECM',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Interior Designing (id 106)
(
    106,
    'Diploma in Interior Design',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    106,
    'Bachelor of Design (B.Des) Interior Design',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    106,
    'Bachelor of Science (B.Sc) Interior Design',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    106,
    'Bachelor of Interior Design (BID)',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    106,
    'Master of Science (M.Sc) Interior Design',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    106,
    'Master of Science (M.Sc) Interior Design & Resource Management',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Liberal Studies (id 107)
(
    107,
    'BA/BSC Liberal Arts',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    107,
    'MA Liberal Studies',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    107,
    'Doctor in Liberal Studies',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Library Sciences (id 108)
(
    108,
    'Certificate Course in Library Science',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    108,
    'Diploma in Library Science',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    108,
    'Bachelor of Lib & Info Science (BLISc)',
    '1 Year',
    'Undergraduate',
    NOW(),
    1
),
(
    108,
    'Bachelor of Library science (BLSc)',
    '1-2 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    108,
    'Masters in Lib & Info Science (MLISc)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    108,
    'Masters in Library science (MLSc)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Montessori Teaching (id 109)
(
    109,
    'Indian Montessori Training Course (IMTC)',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    109,
    'The Online Montessori Training Course (OMTC)',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    109,
    'Nursery Teacher Training (N.T.T.)',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    109,
    'Nursery Primary Teacher Training (N.P.T.T.)',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    109,
    'Primary Teacher Training (P.T.T.)',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),

-- Nutrition and Dietetics (id 110)
(
    110,
    'Diploma in Dietetics and Public Health Nutrition (DDPHN)',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    110,
    'BSc (Food & Nutrition)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    110,
    'MSc (Food & Nutrition)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    110,
    'MSc (Food & Fermentation Technology)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    110,
    'MSc - Home Science (Specialization in food science & nutrition)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    110,
    'PG Diploma in Food & Nutrition',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Physical Education (id 111)
(
    111,
    'B.Sc. (P.E., H.E. & S.)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    111,
    'B.P. Ed.',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    111,
    'M.P. Ed.',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    111,
    'Ph.D.',
    'Varies',
    'Doctoral',
    NOW(),
    1
),

-- Sports And Sports Management (id 112)
(
    112,
    'Diploma in Sports Medicine',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    112,
    'Diploma in Sports Coaching',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    112,
    'Diploma in Sports Management',
    '1-2 Years',
    'Diploma',
    NOW(),
    1
),
(
    112,
    'BBA (Sports Management)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    112,
    'BA (Sports Management)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    112,
    'BPD (Bachelor in Physical Education)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    112,
    'Bachelor of Business Administration (BBA) in Sports Management',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    112,
    'M.Sc in Sports Coaching',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    112,
    'M.Phil/Ph.D in Physical Education',
    'Varies',
    'Postgraduate/Doctoral',
    NOW(),
    1
),
(
    112,
    'Post-Graduate Diploma in Sports Management - 1 year Full Time',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    112,
    'P.G. Diploma in Sports Science Fitness & Nutrition',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Tourism & Travels (id 113)
(
    113,
    'Basic course in Travel Management (3 months / 6 months)',
    '3-6 months',
    'Certificate',
    NOW(),
    1
),
(
    113,
    'Diploma in Tourism Management',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    113,
    'Diploma in International Airlines & Travel Management (IATA)',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    113,
    'Masters in Tourism Administration',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    113,
    'Post Graduate Diploma in Tourism & Travel',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),

-- Allopathy (id 114)
(
    114,
    'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
    '5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    114,
    'MCH/DM/DNB',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    114,
    'Master of Surgery (MS)',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    114,
    'Doctor of Medicine (MD)',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Defense & Strategic Studies (id 115)
(
    115,
    'National Cadet Corps (N.C.C) certification For Special Entry',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    115,
    'B.A./B.A. (Defence and Strategic Studies)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    115,
    'B.Architecture/ Degree in Law/B.Tech/B.E/B.Sc/ B.Com/B.Sc.(IT)',
    '3-5 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    115,
    'M.A./MBA/M.Tech/MCA',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    115,
    'M.A./M.A. in Defence Studies & Strategic Studies',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Company Secretary (id 116)
(
    116,
    'CS Executive Programme',
    'Varies',
    'Professional',
    NOW(),
    1
),
(
    116,
    'CS Professional Programme',
    'Varies',
    'Professional',
    NOW(),
    1
),

-- Blockchain Technology (id 117)
(
    117,
    'B.Tech (CSE- Block Chain)',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    117,
    'Advanced Certification Program (Blockchain and Distributed Ledger Technologies)',
    'Varies',
    'Certificate',
    NOW(),
    1
),
(
    117,
    'PG Certificate Blockchain Technology',
    '1 Year',
    'Postgraduate Certificate',
    NOW(),
    1
),
(
    117,
    'Online Course - Blockchain Architecture Design and Use Cases',
    'Varies',
    'Certificate',
    NOW(),
    1
),

-- Digital Marketing (id 118)
(
    118,
    'Digital Marketing Training Programme (weekend classes, 3 months)',
    '3 months',
    'Certificate',
    NOW(),
    1
),
(
    118,
    'Certificate Course in Digital & Social Media Marketing (Open Learning, 06 months)',
    '6 months',
    'Certificate',
    NOW(),
    1
),
(
    118,
    'Diploma in Digital Marketing & Media Management',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    118,
    'Executive Programme on Digital & Social Media Marketing Strategy (EPDSMMS)',
    'Varies',
    'Executive Program',
    NOW(),
    1
),
(
    118,
    'Executive Development Programme in Digital Marketing',
    'Varies',
    'Executive Program',
    NOW(),
    1
),
(
    118,
    'Master of Management Studies in Digital Marketing',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    118,
    'MMS - Digital Business Management',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Civil Services (id 119)
(
    119,
    'Civil Services Examination (Preliminary, Main, Interview)',
    'Varies',
    'Competitive Exam',
    NOW(),
    1
),

-- Radiology (id 120)
(
    120,
    'B.Sc. (Hons) in Medical Technology In Radiography',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    120,
    'B.Sc. Imaging Technology',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    120,
    'B.Sc. Radiotherapy Technology',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    120,
    'B.Sc. (Medical Technology) Radiography',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    120,
    'M.Sc. (Medical Imaging Technology) Radiology',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    120,
    'B.Sc. Allied Health Science Courses',
    '3-4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    120,
    'Bachelor of Paramedical Technology (Radiographic Technician)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    120,
    'Bachelor of Paramedical Technology (Radiotherapy Technician)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    120,
    'Two years Advance Diploma in Medical Imaging Technology (ADMIT)',
    '2 Years',
    'Diploma',
    NOW(),
    1
),
(
    120,
    'Two years Advance Diploma in Radiotherapy Technology (ADRT)',
    '2 Years',
    'Diploma',
    NOW(),
    1
),
(
    120,
    'One year PG Diploma in Fusion Imaging Technology (PGDFIT)',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    120,
    'D.M.R.D. (Radio diagnosis)',
    '2 Years',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    120,
    'M.Sc. Radiography',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    120,
    'M.D in Radio diagnosis',
    '3 Years',
    'Postgraduate',
    NOW(),
    1
),

-- Disaster Management (id 121)
(
    121,
    'Diploma in Disaster Management (Self-financed, Evening)',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    121,
    'B.A. (Subsidiary) Disaster Management',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    121,
    'Master of Arts/Master of Sciences (MA/M.Sc.) (Disaster Management)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    121,
    'P.G. Diploma in Disaster Management',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    121,
    'M.B.A. (Disaster Management)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    121,
    'M.Sc. (Disaster Management and Climate Sustainability Studies)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    121,
    'Post Graduate Diploma in Disaster Preparedness and Rehabilitation',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    121,
    'Post Graduate Diploma in Disaster and Livelihood Recovery',
    '1 Year',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    121,
    'MA/PhD in Disaster Studies',
    'Varies',
    'Postgraduate/Doctoral',
    NOW(),
    1
),

-- Telecom Management (id 122)
(
    122,
    'B.Tech (Electronics & Telecommunication)',
    '4 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    122,
    'B.B.A. (E.M. & T.M.)',
    '3 Years',
    'Undergraduate',
    NOW(),
    1
),
(
    122,
    'M.Tech (Telecom Technology and Management)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    122,
    'M.B.A. (E.M. & T.M.)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    122,
    'MBA (IT & Telecom)',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    122,
    'M.B.A. Telecom Management',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    122,
    'ERP Module Training Programs',
    'Varies',
    'Certificate',
    NOW(),
    1
),

-- Entrepreneurship (id 123)
(
    123,
    'Diploma in Entrepreneurship and Skill Development (DESD)',
    '1 Year',
    'Diploma',
    NOW(),
    1
),
(
    123,
    'Executive Professional Development Program In Entrepreneurship',
    'Varies',
    'Executive Program',
    NOW(),
    1
),
(
    123,
    'Management Programme for Entrepreneurs and Family Businesses (MPEFB)',
    'Varies',
    'Executive Program',
    NOW(),
    1
),
(
    123,
    'Management Programme for Women Entrepreneurs (MPWE)',
    'Varies',
    'Executive Program',
    NOW(),
    1
),
(
    123,
    'Master of Business Administration',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
),
(
    123,
    'Post Graduate Diploma in Management (with Entrepreneurship as a subject)',
    '2 Years',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    123,
    'Post Graduate Diploma in Entrepreneurship',
    '1-2 Years',
    'Postgraduate Diploma',
    NOW(),
    1
),
(
    123,
    'Post Graduate Programme in Management - Business Entrepreneurship',
    '2 Years',
    'Postgraduate',
    NOW(),
    1
);

--
-- Table structure for table `fields`
--

CREATE TABLE `fields` (
    `id` int(11) NOT NULL,
    `name` varchar(100) DEFAULT NULL,
    `short_desc` text DEFAULT NULL,
    `icon` varchar(255) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `fields`
--

INSERT INTO
    `fields` (
        `id`,
        `name`,
        `short_desc`,
        `icon`,
        `created_at`,
        `created_by`,
        `updated_at`,
        `updated_by`,
        `is_status`
    )
VALUES (
        1,
        'Engineering & Technology',
        'B.Tech, M.Tech, Diploma programs',
        'fa-cogs',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        2,
        'Medical & Health',
        'MBBS, BDS, Nursing, Pharmacy',
        'fa-heartbeat',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        3,
        'Commerce & Management',
        'BBA, MBA, CA, Finance',
        'fa-briefcase',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        4,
        'Arts & Humanities',
        'BA, Literature, Philosophy, History',
        'fa-palette',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        5,
        'Science',
        'B.Sc, M.Sc, Research & Labs',
        'fa-flask',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        6,
        'Law',
        'LLB, LLM, Integrated Law Programs',
        'fa-balance-scale',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        7,
        'Design',
        'B.Des, Fashion, Interior, Product Design',
        'fa-pencil-alt',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        8,
        'Hospitality',
        'Hotel Management, Tourism, Events',
        'fa-concierge-bell',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        9,
        'IT & Computer',
        'BCA, MCA, Cybersecurity, Cloud',
        'fa-desktop',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        10,
        'Education',
        'B.Ed, M.Ed, D.El.Ed, Teaching',
        'fa-graduation-cap',
        '2026-05-03 22:56:50',
        NULL,
        NULL,
        NULL,
        1
    );

-- --------------------------------------------------------

--
-- Table structure for table `specializations`
--

CREATE TABLE `specializations` (
    `id` int(11) NOT NULL,
    `field_id` int(11) DEFAULT NULL,
    `name` varchar(150) DEFAULT NULL,
    `short_desc` text DEFAULT NULL,
    `image` varchar(255) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `specializations`
--
INSERT INTO
    `specializations` (
        `id`,
        `field_id`,
        `name`,
        `short_desc`,
        `image`,
        `created_at`,
        `created_by`,
        `updated_at`,
        `updated_by`,
        `is_status`
    )
VALUES (
        1,
        1,
        'Aeronautical Engineering',
        'Designing, manufacturing, testing and maintenance of aircraft.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        2,
        1,
        'Aerospace Engineering',
        'Research, design, development, construction, testing of aircraft and spacecraft.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        3,
        1,
        'Architecture',
        'Planning, designing, safety, affordability, and supervision of construction works.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        4,
        9,
        'Artificial Intelligence and Machine Learning',
        'Developing intelligent computer machines that can perform tasks with human intelligence.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        5,
        5,
        'Astronomy And Astrophysics',
        'Study of physical, chemical and dynamic properties of celestial objects.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        6,
        1,
        'Automobile Engineering',
        'Design, develop, fabricate, and test vehicles or vehicle components.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        7,
        2,
        'Bio Medical Engineering',
        'Application of engineering in medical sector – prostheses, diagnostic devices, drugs.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        8,
        2,
        'Bio Technology Engineering',
        'Combining technology with biology for research and development.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        9,
        1,
        'Ceramics Engineering',
        'Creating objects from inorganic, non-metallic materials.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        10,
        1,
        'Chemical Engineering',
        'Design and maintenance of chemical plants and development of chemical processes.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        11,
        1,
        'Civil Engineering',
        'Planning, designing and executing structural works – roads, bridges, buildings, dams.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        12,
        1,
        'Computer Science Engineering',
        'Computer science and electronics engineering – design and testing of computer components.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        13,
        1,
        'Electrical And Electronics Engineering',
        'Technology from GPS to electrical power generators – design, development, testing.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        14,
        1,
        'Electronics And Communication Engineering',
        'Electronic devices and software interfaces – TV, radio, computers, telecommunications.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        15,
        1,
        'Industrial Engineering',
        'Operations research, systems engineering, ergonomics, quality engineering.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        16,
        3,
        'Information Communications And Entertainment',
        'ICE – broadcasting, TV, radio, FM, journalism, mass communication.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        17,
        1,
        'Instrumentation Engineering',
        'Principles and procedures of computing instruments used in automated systems.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        18,
        1,
        'Manufacturing Science & Engineering',
        'Production of goods using labor, machines, tools, chemical/biological processing.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        19,
        1,
        'Marine Engineering',
        'Nautical architecture and science – research in oceans, coastal or inland waters.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        20,
        1,
        'Mechanical Engineering',
        'Application of mechanics and energy to design machines and devices.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        21,
        2,
        'Medical Electronics Engineering',
        'Combined study of biology with engineering – artificial organs, prostheses, MRI.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        22,
        1,
        'Metallurgy',
        'Physical and chemical behaviour of metallic elements and their alloys.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        23,
        5,
        'Meteorology',
        'Atmospheric studies to know and predict weather and climate.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        24,
        1,
        'Mining Engineering',
        'Extract and process minerals – ore analysis, mine safety, drilling, blasting.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        25,
        1,
        'Naval Architecture Engineering',
        'Design, construction or maintenance of marine vessels – ships, tankers, containers.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        26,
        5,
        'Physical Sciences',
        'Study of physics and chemistry of nature, overlapping life sciences.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        27,
        1,
        'Polymer Engineering',
        'Materials (plastics, rubbers) – construction, packing, automobiles, aircraft.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        28,
        1,
        'Robotics',
        'Interdisciplinary – mechanical, electrical, instrumentation, computer engineering.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        29,
        1,
        'Textile Engineering',
        'Scientific and engineering principles for fibres, textiles, apparel processes.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        30,
        5,
        'Agricultural Science',
        'Production of food and other goods – plants, living organisms, farm management.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        31,
        5,
        'Biological Science',
        'Study of life and living organisms – life cycles, adaptations, environment.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        32,
        2,
        'Biotechnology',
        'Utilising biology, chemistry, physics, engineering, IT to develop tools for living cells.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        33,
        9,
        'Computer Applications',
        'Expand and apply technological knowledge – diploma, bachelor, master.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        34,
        9,
        'Computer Science',
        'Computer programming, networking, design, implementation of information systems.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        35,
        9,
        'Cyber Security',
        'Study of possible cyber threats – hacking, identity threats, phishing, virus.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        36,
        5,
        'Earth Sciences/Geography',
        'Geology, natural resources management, climatic conditions, cartography, GIS.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        37,
        5,
        'Environmental Sciences',
        'Interactions of physical, chemical, biological elements of environment.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        38,
        5,
        'Fisheries',
        'Life, habits, breeding of fish – catching, processing, marketing, conservation.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        39,
        5,
        'Floriculture / Horticulture',
        'Art, science, technology of growing plants – fruits, vegetables, flowers, medicinal plants.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        40,
        5,
        'Food Technology',
        'Food science – manufacturing safe, wholesome, nutritious food products.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        41,
        5,
        'Forestry',
        'Sustainably managing and preserving forested resources.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        42,
        5,
        'Oceanography',
        'Physical and biological aspects of the ocean – ecosystem, waves, plate tectonics.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        43,
        5,
        'Statistical Sciences',
        'Study data, drawing conclusions – financial markets, healthcare, engineering, insurance.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        44,
        2,
        'Veterinary Sciences',
        'Treatment of domestic pets to farmyard animals – anatomy, epidemiology, pharmacology.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        45,
        5,
        'Wildlife Biology',
        'Field work, observing animals in natural habitats, lab work.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        46,
        5,
        'Zoology',
        'Analysis of animals and their interactions with ecosystems.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        47,
        2,
        'Ayurveda (BAMS)',
        'Ancient system – natural plants, herbs, minerals, body massage, meditation.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        48,
        2,
        'Dentistry (BDS)',
        'Teeth, gums, oral cavity – includes cosmetic dental procedures.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        49,
        2,
        'Homeopathy',
        'Healing using diluted natural substances, assessing all symptoms.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        50,
        2,
        'Naturopathy',
        'Science of healing through nature – balancing water, air, earth, fire, aether.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        51,
        2,
        'Pharmacy',
        'Study of drugs – use, composition, effects, development, quality standards.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        52,
        2,
        'Siddha',
        'Oldest Indian system – balancing five elements of body.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        53,
        2,
        'Unani',
        'Greek system – humoral theory, plants, minerals, animal products.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        54,
        4,
        'Anthropology',
        'Study of humans, past and present – cultural and biological conditions.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        55,
        4,
        'Archaeology',
        'Reconstruct extinct cultures from artefacts – ancient and recent human past.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        56,
        4,
        'Art Restoration',
        'Inspection, documentation, treatment, precautionary care of art objects.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        57,
        4,
        'Curation',
        'Manager of cultural heritage institution – gallery, museum, library, archives.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        58,
        4,
        'Educational/Vocational School Counsellor',
        'Counselling individuals, group educational and vocational guidance.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        59,
        4,
        'Monuments And Sculpture Restoration',
        'Clean, repair, restore damaged artworks, monuments, sculptures.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        60,
        4,
        'Museology',
        'Study of purposes and organisation of museums – preservation, restoration.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        61,
        2,
        'Physiotherapy',
        'Allied health care – prevent and treat disabilities, restore physical mobility.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        62,
        4,
        'Rehabilitation Psychology',
        'Psychological principles for healing patients with disability due to injury/illness.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        63,
        2,
        'Rehabilitation Therapy',
        'Recover from functional limitations after injury, illness, or addiction.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        64,
        4,
        'Social Work',
        'Prevent and alleviate social problems – injustice, unemployment, destitution.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        65,
        4,
        'Special Educator',
        'Interventions for individuals with special needs – self-sufficiency and success.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        66,
        2,
        'Speech Language And Hearing',
        'Anatomy, physiology, pathology of hearing and speech, rehabilitation.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        67,
        6,
        'Law',
        'Rules, conduct, procedures for instituting and maintaining a disciplined society.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        68,
        3,
        'Advertising',
        'Creating demand, marketing, establishing contact between manufacturers and consumers.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        69,
        3,
        'Journalism',
        'Preparation of written, visual, audio material for public media – factual events.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        70,
        3,
        'Mass Communication',
        'Relay information through mass media to large segments of population.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        71,
        3,
        'Public Relations',
        'Corporate communication and image building, promoting organisation goals.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        72,
        7,
        'Art Direction',
        'Creation and management of visual style and images in media and entertainment.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        73,
        7,
        'Choreography',
        'Artistic expression through creation of dance, designing routines.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        74,
        7,
        'Direction (Film/Drama)',
        'Creative aspects of production – shaping artistic and dramatic facets.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        75,
        7,
        'Film/Drama Production',
        'Joint activity of making movies, TV shows – camera, lighting, editing, sound.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        76,
        7,
        'Fine Arts',
        'Creative disciplines – sculpture, painting, drawing, paper, metal, clay.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        77,
        7,
        'Performing Arts',
        'Artistic expression through acting or music performed live – ballet, puppetry, mime.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        78,
        7,
        'Vocal and Instrumental Music',
        'Theoretical understanding of music, history, composition, voice instruction.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        79,
        7,
        'Animation',
        'Images and objects embedded to appear as moving pictures.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        80,
        7,
        'Cinematography',
        'Fundamental tools of cinematography, shooting, digital cameras.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        81,
        7,
        'Communication Design',
        'Devising strategies for brand building, increasing sales, market research.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        82,
        7,
        'Design',
        'Product design, textile, ceramic, interior, fashion, jewellery, graphics.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        83,
        7,
        'Graphic Designing',
        'Visual illustration combining thoughts and messages – pictures, texts, symbols.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        84,
        7,
        'Photography',
        'Art of storytelling through still photographs – press, commercial, wildlife, fashion.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        85,
        3,
        'Actuarial Sciences',
        'Mathematical and statistical methods to weigh risk in insurance and finance.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        86,
        3,
        'Bank Management',
        'Investment banking, corporate finance, personal, retail, rural banking.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        87,
        3,
        'Business Administration',
        'Administration of business – efficient organisation of people and resources.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        88,
        3,
        'Business Management',
        'Planning, coordination, control of business – value-creating organization.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        89,
        3,
        'Costs and Works Accounts',
        'Structuring business policy, forecasting projects based on financial performance.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        90,
        3,
        'Chartered Accountancy',
        'Formulation of financial policies & investment plans, business plans.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        91,
        3,
        'Chartered Financial Analysis',
        'Corporate finance, investment management, financial services.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        92,
        8,
        'Event Management',
        'Marketing, costs, budgets, advertisements for events – seminars, shows, weddings.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        93,
        2,
        'Hospital Management',
        'Purchase of equipment, HR, promotion of health services, budget allocation.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        94,
        8,
        'Hotel Management',
        'House-keeping, food & beverage, front office, catering, culinary arts.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        95,
        3,
        'Human Resource Management',
        'Selection, training, assessment, rewards of employees, labour law compliance.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        96,
        3,
        'Insurance',
        'Compensation or reimbursement of loss of life or assets – life and general insurance.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        97,
        3,
        'Logistics & Supply Chain Management',
        'Purchase, transport, warehousing, packaging, distribution, inventory management.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        98,
        3,
        'Management',
        'Marketing research, HR, finance, advertising, operations research.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        99,
        4,
        'Bachelor of Arts',
        'Three year degree – languages, political science, history, economics, geography, sociology.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        100,
        10,
        'Diploma in Elementary Education (D.El.Ed.) / Bachelor of Education (B.Ed.)',
        'Training for primary/upper primary teachers and secondary/senior secondary teachers.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        101,
        3,
        'Corporate Intelligence',
        'Assesses business information to avoid risks, venture into new markets.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        102,
        4,
        'Detective',
        'Investigate missing persons, causes of fire, stolen property, surveillance.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        103,
        5,
        'Food Science and Nutrition',
        'Biological and chemical composition of food, preservation, nutrition.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        104,
        4,
        'Foreign Languages',
        'Japanese, Italian, German, Russian, Chinese, French – short and long duration courses.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        105,
        4,
        'Home Science',
        'Artistic values and scientific methods in home management – resource management, nutrition.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        106,
        7,
        'Interior Designing',
        'Designing interior furniture, furnishings, colour combinations, space research.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        107,
        4,
        'Liberal Studies',
        'Multidisciplinary study – humanities, sciences, social sciences, arts.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        108,
        4,
        'Library Sciences',
        'Managing, maintaining, preserving records and information, classification.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        109,
        10,
        'Montessori Teaching',
        'Teaching in nursery, playschool, pre-school, kindergarten – early childhood education.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        110,
        5,
        'Nutrition and Dietetics',
        'Promotion of good health habits, healthy food selection, counselling.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        111,
        4,
        'Physical Education',
        'Interdisciplinary – physical knowledge of sports, exercises, training and management.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        112,
        8,
        'Sports And Sports Management',
        'Physical activity, games, competition, management structure, rules, ethics.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        113,
        8,
        'Tourism & Travels',
        'Physical, economic, social, cultural aspects of tourism, destinations.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        114,
        2,
        'Allopathy',
        'Modern medicine – drugs, surgery, radiology, internal medicine, paediatrics, oncology.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        115,
        4,
        'Defense & Strategic Studies',
        'Military, defence studies – national security, geopolitics, conflict management.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        116,
        3,
        'Company Secretary',
        'Key managerial personnel – compliance, arbitration, corporate law advisory.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        117,
        9,
        'Blockchain Technology',
        'Open source digital ledger – reliable, secure, chronological information sharing.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        118,
        3,
        'Digital Marketing',
        'Sales and marketing through digital means – internet, mobile, display advertising.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        119,
        4,
        'Civil Services',
        'Executive branch – implementation of government policies, administrative machinery.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        120,
        2,
        'Radiology',
        'Diagnostic and interventional radiology – X-Ray, CT, MRI, PET-CT.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        121,
        4,
        'Disaster Management',
        'Understanding disasters, crisis management, damage control, rehabilitation.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        122,
        3,
        'Telecom Management',
        'Telecom technologies – telephony, television, internet, network management.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    ),
    (
        123,
        3,
        'Entrepreneurship',
        'Starting and managing business – identifying opportunities, investment, expansion.',
        NULL,
        NOW(),
        NULL,
        NOW(),
        NULL,
        1
    );

--
-- Table structure for table `specialization_details`
--

CREATE TABLE `specialization_details` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `specialization_id` int(11) DEFAULT NULL,
    `intro` text DEFAULT NULL,
    `eligibility` text DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `specialization_details`
--

INSERT INTO
    `specialization_details` (
        `specialization_id`,
        `intro`,
        `eligibility`,
        `created_at`
    )
VALUES (
        1,
        'A course in Aeronautical Engineering includes the designing, manufacturing, testing and maintenance of aircraft in commercial aviation and defence sectors and involves the study of advanced level Physics and Mathematics.',
        'Undergraduate Level: 10+2 examination with Physics, Mathematics, Chemistry.\nPost Graduate Level: Undergraduate degree in Aeronautical / Aerospace Engineering or related, or passed both Sections A and B of AMAeSI (AeSI- Aeronautical Society of India).\nDoctoral Level: Must have completed post-graduation in Aeronautical / Aerospace Engineering, must have a valid GATE score.',
        NOW()
    ),
    (
        2,
        'Aerospace engineering is the branch of engineering which deals with the research, design, development, construction, testing, of aircraft and spacecraft. It is divided into two major and overlapping branches: aeronautical engineering related with aircrafts in the earth’s atmosphere, and astronautical engineering that deals with spacecrafts that operate outside the earth’s atmosphere.',
        'Undergraduate Level: 10+2 with Physics, Chemistry and Mathematics or equivalent. The IITs consider score of JEE and other institutions have their own separate entrance exams.\nPost Graduate Level: Undergraduate degree in Aeronautical/ Aerospace or related Engineering, or passed both Sections.\nDoctoral Level: Must have completed Post-graduation in Aeronautical / Aerospace Engineering, must have a valid GATE score.',
        NOW()
    ),
    (
        3,
        'Architecture is the science that deals with planning, designing, safety, affordability, and supervision of construction works for houses, office buildings, skyscrapers, landscapes, or entire cities.',
        '10+2 level with Science Stream. The IITs consider score of JEE and other institutions have their own separate entrance exams.',
        NOW()
    ),
    (
        4,
        'Artificial Intelligence belongs to a field of science and engineering in which studies and research aim to develop intelligent computer machines that can perform tasks with human intelligence. It includes speech recognition, visual perception, logic and decision, multi-language translation and more. Digital bits of data is interpreted and turned into significant experiences and outcomes with aid / assistance of robotics, automation and sophisticated computer software and programs.',
        '10+2 Science. After B.Tech, valid GATE scores is required for M.Tech. CS/AI/IT, IC Technology and Bioinformatics.',
        NOW()
    ),
    (
        5,
        'Astronomy is a combination of physics, chemistry and mathematical principles/rules. Astrophysics can be called its offshoot. It deals with detailed study of the physical, chemical and dynamic properties of celestial objects. It also deals with the phenomena over and above Earth’s atmosphere. There is associated study of calculations of orbits, gravitational forces, satellites, meteors, galaxies, comets, stars, planetary objects, planets, satellites etc. In Astrophysics, we explore and ensure properties/nature of the astronomical objects with the help of laws of physics and chemistry. There is also the field of Cosmology which studies the origin and evolution of the universe.',
        '10+2 with PCM. Entrance Tests (PhD from IUCAA): 1. IUCAA-NCRA Admission Test (INAT) 2. Joint Entrance Screening Test (JEST) 3. CSIR-UGC NET for JRF (Physics).',
        NOW()
    ),
    (
        6,
        'The study of automotive engineering is to design, develop, fabricate, and test vehicles or vehicle components from the concept stage to production stage by incorporating various elements of engineering such as mechanical, electrical, electronic, software and safety engineering.',
        '10+2 with Science for B.Tech / B.E courses. Percentage of marks in Science subjects as specified is required to qualify engineering competitive exam.',
        NOW()
    ),
    (
        7,
        'Biomedical engineering is the study of engineering as applied in the medical sector such as manufacturing prostheses, medical equipment, diagnostic devices and drugs. Professionals in this field are known as a biomedical engineers. The biomedical engineers utilize the engineering methods and theories to enhance health care. Orthopaedic and rehabilitation engineering, molecular, cellular and tissue engineering are also a part of this discipline.',
        '(10+2) examination with biology, maths and chemistry. For IITs, It is mandatory to qualify in the Joint Entrance Examinations (J.E.E). The duration for the course is 4 years.',
        NOW()
    ),
    (
        8,
        'Biotechnology engineering is a branch of engineering where technology is combined with biology for research and development. Biotechnology involves wide range of subjects such as engineering, genetics, biochemistry, microbiology and chemistry. There are various applications of biotechnology in fields such as animal husbandry, growth of vaccines and medicines, agriculture, pollution control, energy production and conservation, healing of prolonged disease and ecological conservation.',
        '(10+2) examination with biology, maths and chemistry. For IITs, It is mandatory to qualify in the Joint Entrance Examinations (J.E.E). The duration for the course is 4 years.',
        NOW()
    ),
    (
        9,
        'Ceramic engineering is the science and technology of creating objects from inorganic, non-metallic materials. As ceramics are heat resistant, they are used in a wide range of industries, including mining, aerospace, medicine, refinery, food and chemical industries, packaging science, electronics, industrial and transmission electricity, and guided light wave transmission.',
        '(10+2) examination with biology, maths and chemistry. For IITs, It is mandatory to qualify in the Joint Entrance Examinations (J.E.E). The duration for the course is 4 years.',
        NOW()
    ),
    (
        10,
        'Chemical Engineering is the design and maintenance of chemical plants and the development of chemical processes for converting raw materials or chemicals into valuable forms including those used to remove chemicals from waste materials, to enable largescale manufacture. It combines knowledge of Chemistry and Engineering for the production of chemicals and related by-products.',
        '10+2 pass with physics, chemistry and mathematics from recognized Board of examination. Most of the colleges offer admission on the basis of score obtained in national/state level entrance test.',
        NOW()
    ),
    (
        11,
        'Civil Engineering involves planning, designing and executing structural works. The course deals with a wide variety of engineering tasks including designing, supervision and construction activities of public works like roads, bridges, tunnels, buildings, airports, dams, water works, sewage systems, ports etc. and offers a multitude of challenging career opportunities. A civil engineer is responsible for planning and designing a project, constructing the project to the required scale, and maintenance of the product.',
        '10+2 with Physics, Chemistry, and Mathematics as core subjects.',
        NOW()
    ),
    (
        12,
        'Computer Science Engineering involves both computer science and electronics engineering. It includes testing and designing of computer components. There are two types of computer engineers. Computer software engineers and computer hardware engineers.',
        '(10+2) with biology, maths and chemistry. For IITs, It is mandatory to qualify in the Joint Entrance Examinations (J.E.E). The duration for this course is 4 years.',
        NOW()
    ),
    (
        13,
        'Electrical and electronics engineering is about use of technology ranging from global positioning systems to electrical power generators. These engineers are responsible for designing, developing, testing as well supervising the production of electrical and electronic equipment and machinery. Specialization in Electrical and electronics engineering include areas like power generation, transmission and distribution; communications; manufacture of electrical equipment etc. or one particular specialty within these area; e.g. industrial robot control systems or aviation electronics.',
        'Pass in Higher Secondary (10+2) or its equivalent (Physics, Chemistry and Mathematics).',
        NOW()
    ),
    (
        14,
        'Electronics and Communication Engineering deal with electronic devices and software interfaces. It helps to increase productivity in various industries such as oil, energy, agriculture, and telecommunication media including television, radio and computers. The course is also applied to many other important sectors such as steel, petroleum and chemical industries; healthcare industry; and transportation industry.',
        '(10+2) examination with biology, maths and chemistry. For IITs, It is mandatory to qualify in the Joint Entrance Examinations (J.E.E). The duration for the course is 4 years.',
        NOW()
    ),
    (
        15,
        'Even though the term industrial engineering is originally applied to manufacturing, it has extended its service to fields like operations research, systems engineering, ergonomics and quality engineering. Industrial engineering is also known as Operations management, Production Engineering, Manufacturing Engineering or Manufacturing Systems Engineering. In healthcare, Industrial Engineers are more commonly known as Management Engineers or Health Systems Engineers.',
        '10+2 with Physics, Chemistry, and Mathematics as core subjects.',
        NOW()
    ),
    (
        16,
        'This is the age of Information- Communication- Entertainment (ICE) and massive expansion in broadcasting with the introduction of more television channels, direct broadcast satellites, T.V./Computer link ups, cable T.V. and rapid growth in both All India Radio and other broadcasting services particularly FM.',
        '10+2 for undergraduate courses (B.A. Mass Communication, B.A. Journalism). For post-graduate diploma, graduation required.',
        NOW()
    ),
    (
        17,
        'Instrumentation engineering is a branch of electrical and electronics engineering that deals with the study of engineering principles and procedures of computing instruments used in designing and assembling automated systems.',
        '10+2 with Physics, Chemistry, and Mathematics as core subjects. Students must go through entrance exams such as JEE (Main) & JEE (Advance) for admissions to B. Tech. courses.',
        NOW()
    ),
    (
        18,
        'Manufacturing Science and Engineering is the production of goods for use or sale using labour and machines, tools, chemical and biological processing, or formulation. Applied to industrial production, raw materials are transformed into finished goods on a large scale to be used for manufacturing other, more complex products, such as aircrafts, household appliances or automobiles.',
        '10+2 or equivalent. The candidate must have a valid Joint Entrance Examination score.',
        NOW()
    ),
    (
        19,
        'Marine engineering deals with the nautical architecture and science and basically is meant for research conducted in oceans, coastal or inland waters connected to the sea. Marine engineers have the entire responsibility of the ship’s technical management.',
        '(10+2) with biology, maths and chemistry. For IITs, it is mandatory to qualify in the Joint Entrance Examinations (J.E.E). The duration of this course is 4 years.',
        NOW()
    ),
    (
        20,
        'Mechanical engineering deals with application of the principles of mechanics and energy to design machines and devices right from automobiles, trucks, airplanes to trains tractors, fax machines or even power plants. Robotic inspection systems, Cryogenic technology, Laser material processing are also some new emerging areas of study.',
        '(10+2) with biology, maths and chemistry. For IITs, It is mandatory to qualify in the Joint Entrance Examinations. The duration of the course is 4 years.',
        NOW()
    ),
    (
        21,
        'Medical Electronics engineering relates to the combined study of biology with engineering principles for developing artificial organs, prostheses (artificial devices that replace missing body parts), magnetic resonance imaging (MRI) and other health management systems. The course also offers specialisation in biomechanics, rehabilitation and orthopaedic engineering.',
        '(10+2) examination with biology, maths and chemistry. For IITs, it is mandatory to qualify in the Joint Entrance Examinations. The duration of the course is 4 years.',
        NOW()
    ),
    (
        22,
        'Metallurgy is a field of materials science and of materials engineering that deals with the physical and chemical behaviour of metallic elements and their mixtures called alloys.',
        '10+2 in Science with Physics, Chemistry and Maths.',
        NOW()
    ),
    (
        23,
        'Meteorology deals in atmospheric studies to know and predict weather and climate. It is the examination of the atmospheric and climate conditions affecting the earth and its population.',
        '12th with physics and chemistry.',
        NOW()
    ),
    (
        24,
        'Mining engineering, also referred as mineral engineering, deals with the study of the techniques to extract and process minerals from their natural surroundings. A mining engineer has to study ore reserve analysis, operations and planning, mine health and safety, drilling, blasting, ventilation and related topics.',
        '(10+2) with biology, maths and chemistry. For IITs, it is mandatory to qualify in the Joint Entrance Examinations (JEE). The duration of the course is 4 years.',
        NOW()
    ),
    (
        25,
        'The course in Naval Architecture primarily relates to the design, construction or maintenance of all types of marine vessels such as ships, boats, oil and gas tankers, containers, passenger ships, ferries etc.',
        '(10+2) or equivalent examination with physics, Chemistry, Mathematics and English as separate subjects.',
        NOW()
    ),
    (
        26,
        'Physical science is the study of physics and chemistry of nature. It overlaps life sciences in a way to include ecology and the evidence of historical facts of evolution.',
        '10+2 or its equivalent with Mathematics, Physics, Chemistry. For IITs, it is Mandatory to qualify in the Joint Entrance Examinations (J.E.E).',
        NOW()
    ),
    (
        27,
        'The course in Polymer (plastics and rubbers) technology deals with materials and the application which ranges from construction, packing, decorative items to automobiles, aircrafts etc.',
        '10+2 with biology, maths and chemistry. For IITs, It is mandatory to qualify in the Joint Entrance Examinations (J.E.E). The duration of this course is 4 years.',
        NOW()
    ),
    (
        28,
        'Robotics is an inter-disciplinary course and students of mechanical engineering, electrical engineering, instrumentation engineering or computer engineering can join this field. The Robotics and artificial intelligence are interlaced and there is option at the Master’s level.',
        '10+2 or equivalent education in Science stream.',
        NOW()
    ),
    (
        29,
        'Textile engineering courses deal with the application of scientific and engineering principles to the design and control of all aspects of fibres, textiles, and apparel processes, products, and machinery.',
        '10th / 12th for Diploma in Textile Engineering. 10+2 with PCM for B.E./B.Tech. B.E./B.Tech for M.Tech/Post Graduate Diploma in Textile.',
        NOW()
    ),
    (
        30,
        'Agricultural Science is the study of production of food and other goods i.e. plants and living organisms in a systematic and controlled manner. This field incorporates management of farms, horticulture and agri-business activities. It also gives insights of agrarian scenario of the country and its agriculture industry that manufacture agricultural machinery and equipment and is involved in procurement and processing of agri-products. It also studies banking activities for financing and developing farms, research and development for the purpose of improving capacity and quality of farm products and so on.',
        '10+2 or equivalent having passed with Physics, Chemistry, Biology/Math or Agriculture stream.',
        NOW()
    ),
    (
        31,
        'Biological Science studies life and living organisms, their life cycles, adaptations and environment. There are various fields of study under the biological sciences including biochemistry, microbiology and evolutionary biology.',
        '10+2 with Physics, Chemistry and Biology as compulsory subjects.',
        NOW()
    ),
    (
        32,
        'Biotechnology is utilizing the sciences of biology, chemistry, physics, engineering and information technology to develop tools and products to apply to living cells/organisms. Genetic engineering is the study of knowledge obtained from genetics to alter the reproduction and hereditary processes of organisms. It deals in cloning, in-vitro fertilization, species hybridization or direct manipulation of the genetic material itself by the recombinant DNA technique.',
        'For B.Sc.: Pass in 10+2 with PCM/Biology. For M.Sc.: Bachelor’s degree under 10+2+3 in Physical, Biological, Agricultural, Veterinary, Fishery Sciences, Pharmacy, Engineering, Technology or Medicine. For M.Tech Biotechnology: B.Tech degree in related fields or Master’s in Botany, Zoology, Biochemistry, etc.',
        NOW()
    ),
    (
        33,
        'The Computer Applications course is designed to provide the student with the opportunity to expand and apply technological knowledge.',
        '10+2 or equivalent.',
        NOW()
    ),
    (
        34,
        'Computer science is one of the known courses among engineering aspirants which aims on the basic elements of computer programming and networking. This course includes knowledge of design, implementation and management of information system of both hardware and software. It deals principally with the theory of computation and design of computational systems.',
        '10+2 with PCM and followed by Entrance Test.',
        NOW()
    ),
    (
        35,
        'Cyber Security deals with study of possible cyber threats and harms - technical, financial or personal. The course equips the professional to deal with many types of cybercrimes such as copyright breach, hacking, illegal mass-surveillance, computer virus, virtual pestering, identity threats, phishing etc. The interest in technology, innovative ideas, problem solving prowess, logic & concept are expected from students who wish to join this new and challenging field.',
        '10+2 Science Stream.',
        NOW()
    ),
    (
        36,
        'Earth Sciences deals with study and research in various fields and concepts of Geology, examination and utilization of natural resources their management, sustenance and conservation. Earth Sciences/Geography studies climatic/weather conditions of different regions with periodic developments, their effects, natural resources like water, minerals survey, earth and ocean characteristics and its science, air, rain, clouds and rivers aspects, monitoring of geographical environments, forests and weather forecast.',
        '10+2 or equivalent.',
        NOW()
    ),
    (
        37,
        'Environmental science is the area of study that deals with the interactions of the physical, chemical, and biological elements of the environment and impact of these upon the living beings and the environment. Generally, environmental science is considered to be only natural science whereas it includes the study of social science and humanities also. Therefore, it is an interdisciplinary course.',
        '10+2 examination or equivalent with Physics, Chemistry and Biology.',
        NOW()
    ),
    (
        38,
        'Fisheries is a multidisciplinary course that includes the biological study of life, habits and breeding of various species of fish. It involves catching, processing, marketing and conservation of fish.',
        'Not specified in the PDF. Typically 10+2 with Biological Science.',
        NOW()
    ),
    (
        39,
        'Horticulture/Floriculture is one of the parts of agriculture that study the art, science, technology, and process of growing plants. It involves fruits, vegetables, nuts, seeds, herbs, sprouts, mushrooms, algae, flowers, the cultivation of medicinal plants, seaweeds and non-food crops such as grass and ornamental trees and plants.',
        '10+2 with physics, chemistry and maths/biology/agriculture.',
        NOW()
    ),
    (
        40,
        'Food Technology is the study of food science in manufacturing safe, wholesome and nutritious food products. Training in Food technology gives adequate knowledge regarding the quality analysis of raw materials, packaging standards and methodology.',
        '10+2 education completed in the Science stream from a recognized educational Board. Chemistry, Mathematics, Physics, Biology/Home Science as the main subjects at the 10+2 level.',
        NOW()
    ),
    (
        41,
        'Forestry is the study of sustainably managing and preserving forested resources for the benefit of humans. It studies ecology, environmental and resource protection, such as wood, water, wastelands, endangered species, clean air, biodiversity and ecosystems in forests.',
        '10+2 with Physics, Chemistry, Maths/Biology.',
        NOW()
    ),
    (
        42,
        'The course in Oceanography deals with the physical and biological aspects of the ocean and covers the study of ecosystem, geological and geophysical aspects of oceans; ocean waves currents, plate tectonics etc.',
        '10+2 with Physics, Chemistry, Maths/Biology and followed by B.Tech. or B.Sc. in Zoology/Botany/Chemistry/Fishery Science/Earth Science/Physics/Agriculture/Microbiology/Applied Sciences or equivalent.',
        NOW()
    ),
    (
        43,
        'Statistics is the study data and navigating common problems for drawing correct conclusions. This course is related to fields such as financial markets, sports, engineering, healthcare, marketing & sales, election campaigns, space, natural disasters, population studies, accidents, insurance, and deaths. Statistics deals with interpretation and aggregation of large complex data into simpler data. It develops from the field of probability in mathematics.',
        '10+2 pass with Maths & English.',
        NOW()
    ),
    (
        44,
        'Veterinary Science is a subject related to the treatment of different animals from domestic pets to farmyard animals. The course content mixes a group of topics like anatomy, animal behaviour, animal husbandry, cell biology, nutrition, physiology, genetics, epidemiology, pharmacology, infectious diseases, pathology and parasitology.',
        '10+2 with biology, chemistry and physics and to qualify the entrance test conducted by Veterinary Council of India.',
        NOW()
    ),
    (
        45,
        'Wildlife Biology involves field work, observing animals in their natural habitats in addition to working in labs and in diverse environments.',
        '10+2 with Physics, Chemistry and Biology.',
        NOW()
    ),
    (
        46,
        'A course in Zoology analyses animals and their interactions with ecosystems. It includes the classification and study of physical characteristics, diets, behaviours of animals’ species.',
        '10+2 with Physics, Chemistry and Biology.',
        NOW()
    ),
    (
        47,
        'Ayurveda, an ancient system of medicine evolved approximately around 600 BC in India and has many followers across the world today. Ayurveda makes use of natural - plants, herbs and minerals to produce medicines. Also included in course of Ayurveda are body massage, meditation and basic dietary plans which according to many practitioners have no side effects as it is based on non-invasive treatment practices. Ayurveda has been recognized by World Health Organization.',
        '10+2 with Physics, Chemistry & Biology.',
        NOW()
    ),
    (
        48,
        'Dentistry deals with teeth, gums, hard and soft tissues of the oral cavity. Today, dentistry is not restricted to treating just tooth decays but also includes cosmetic dental procedures to improve a person’s appearance. The introduction of new fields like periodontal, oral pathology and orthodontics are also part of the BDS course.',
        '10+2 with PCB. A student needs to appear in NEET to get admission in Bachelor in Dental Surgery Course.',
        NOW()
    ),
    (
        49,
        'Homeopathy is practiced worldwide for healing, curation and therapeutic purposes. It is an all-inclusive practice of treatment wherein a patient is treated while assessing all aspects of symptoms and health problems for restoration of overall health. In this unique therapeutic system of treatment, certain natural substances are diluted and used in various forms for treatment. The courses are designed to give insight about Homeopathy medicine, its foundation, analysis, evaluation, surgery etc. and encompass both clinical and pre-clinical subjects with proper emphasis on theoretical as well as hands on practical sessions.',
        'For BHMS - 10+2 or equivalent exam with Physics, Chemistry and Biology. For MD (Hom.) - B.H.M.S.',
        NOW()
    ),
    (
        50,
        'Naturopathy is a science of healing through nature and relies upon the study and balancing the five basic elements of nature known as Water, Air, Earth, Fire and Aether. Yoga is combined with Naturopathy to add value to both these systems. Courses are available in both Naturopathy as well as in combination of both Naturopathy & Yoga.',
        'Entry level - 10th. 10+2 or equivalent with Science stream.',
        NOW()
    ),
    (
        51,
        'Pharmacy is the study of drugs which includes instructions on use, selection, composition, effects and side effects of drugs. It also includes development of new drugs, ascertaining of quality standards, dispensing of drugs and improvement of existing drugs.',
        '10+2 with science.',
        NOW()
    ),
    (
        52,
        'Siddha is one of oldest Indian systems of medicine which has its roots in south India and is popular worldwide. Therapeutic in nature, the system works on the belief that human body is made of five basic elements namely, earth, water, fire, air and sky and the treatment deals with balancing these elements for healthy and disease free life. The Central Council of Indian Medicine controls the education of Siddha system in the country.',
        '10+2 with Physics, Chemistry and Biology/Botany.',
        NOW()
    ),
    (
        53,
        'Unani means Greece where the Unani System of Medicine originated. BOKHRATH (Hippocrates) founded it in 460 BC approximately and is called as Father of Unani Medicine. Unani medicine works on the basis of ‘humoral theory’ (relating to four bodily fluids) where each humour denotes a precise disposition in a human being. In Unani medicine, the plants, minerals and animal products are used for healing purposes and for restoration of a person’s original humoral constituents. Unani System is one of internationally accepted treatments of medicine in present day also.',
        'For BUMS – 10+2 or equivalent certification with Science. After BUMS/Graduation, AIAPGET can apply for admission to MD/MS (Unani).',
        NOW()
    ),
    (
        54,
        'Anthropology is the study of humans, past and present in their cultural and biological conditions. This combination sets anthropology apart from other humanities and natural sciences. In simple terms, anthropology deals with determining what humans are, how they evolved, and how they differ from one another.',
        '10+2 with Physics, Chemistry, Biology and/or Mathematics as main subjects.',
        NOW()
    ),
    (
        55,
        'The course is a subfield of anthropology. It exposes students to reconstruct extinct cultures from the artefacts as it studies the ancient and recent human past through material remains.',
        '10+2 with History.',
        NOW()
    ),
    (
        56,
        'Art restoration is a specialized course which involves inspection, documentation, treatment and precautionary care of the art objects.',
        'Pass 12th class in any stream.',
        NOW()
    ),
    (
        57,
        'A curator is a manager or overseer of a cultural heritage institution such as gallery, museum, library, or archives in charge of content and institution’s collections and involved with the interpretation of heritage material.',
        '10+2 and Bachelor’s degree in art, history, archaeology, museum studies or a related field.',
        NOW()
    ),
    (
        58,
        'The course deals in techniques of counselling individuals and providing group educational and vocational guidance services, crisis intervention for students, how to resolve behavioural, academic, and other problems.',
        'Graduate/Master’s degree (Social Work/Psychology/Child Development/Community Resource Management/Development Communication Extension/Nursing/Special Education/M.Ed./B.Ed. with experience of teaching/working with children. Proficiency in English required.',
        NOW()
    ),
    (
        59,
        'Restoration (cultural heritage), is the process through which trained professionals clean, repair and restore a damaged artwork. These types of art work could include paintings to sculptures to even manuscripts. These ancient artefacts, monuments and paintings are maintained and are given a new life by art conservators and art restoration or by Monuments and Sculpture restoration experts.',
        '10+2 with History.',
        NOW()
    ),
    (
        60,
        'Museology is the branch of knowledge concerned with the study of the purposes and organisation of museums with emphasis on development of museums and in evolving fresh methods and techniques to improve their working. It covers activities such as preservation, restoration and excavation of ancient monuments and the art material.',
        '10+2.',
        NOW()
    ),
    (
        61,
        'Physical therapy (or physiotherapy), is an allied health care profession used to prevent and treat many disabilities and diseases. Physiotherapists deal with the remediation of impairments and disabilities to restore physical mobility and help in maintaining quality of life. The therapists use the techniques of examination, evaluation, diagnosis and physical intervention.',
        '10+2 passed or equivalent examination with physics, chemistry, biology. Selection through entrance examination (Common Entrance Test for BPT).',
        NOW()
    ),
    (
        62,
        'Rehabilitation psychology course is related to psychological principles for healing of patients who have disability due to injury or illness. The focus of this course is to address behavioural and mental health issues related to the injury or chronic condition that leads to disability and promote behaviour for positive adaptation to disability.',
        'Bachelor’s Degree in Psychology or should have studied psychology as one of the subjects from a recognized University.',
        NOW()
    ),
    (
        63,
        'Rehabilitation Therapy is a method which enables a person to recover from functional limitations after an injury, an illness or addiction. Rehabilitation assists people to restore their mental, emotional, physical, social and vocational wellbeing. Mental illness is also recovered with the assistance of rehabilitation. Physical and occupational therapy are also included in rehabilitation therapy.',
        '10+2 with science subjects. Selection usually on basis of entrance examinations conducted by the institute/university. Duration of bachelor’s degree course is 3-4 years.',
        NOW()
    ),
    (
        64,
        'Social work course is the study to prevent and alleviate the social problems in the society like social injustice, unemployment, destitution, etc. which has damaging effects and providing support to individuals through removal of barriers amongst the individuals, groups & communities.',
        'For BA Course: 10+2. For PG course: Graduate in any stream preferably with sociology & psychology as options during graduation. All India level test conducted by Universities followed by interview.',
        NOW()
    ),
    (
        65,
        'Special education is the method of interventions designed to help individuals with special needs to help them achieve a higher level of personal self-sufficiency and success. This involves individually planned and systematically monitored teaching procedures, equipment and materials.',
        'Pass 10+2 from any subject for diploma courses. Bachelor Degree in any discipline for higher courses.',
        NOW()
    ),
    (
        66,
        'A paramedical and rehabilitation course, it involves studying the anatomy, physiology, pathology (diseases or disorders), of hearing and speech and rehabilitation. Speech Language is the science of verbal and symbolic expression of thoughts.',
        '10+2 pass or its equivalent with Physics, Chemistry, Biology & Mathematics.',
        NOW()
    ),
    (
        67,
        'Law is the study of rules, conduct or procedures for instituting and maintaining a disciplined society. This may be established by customs, agreements or authority and enforced through a set of institutions.',
        'Pass 10+2 with any subject for integrated course of 05 years. Bachelor’s Degree for LLB in three years.',
        NOW()
    ),
    (
        68,
        'Advertising chiefly targets at creating demand, encourages marketing, and establishes a direct contact between manufacturers and consumers. The entire purpose of advertising is to apprise and influence public to purchase products and services. Advertising is done through TV, Internet, Newspapers, magazines, outdoor Publicity.',
        'For certificate courses: 10+2. For graduate degree in mass communication: 10+2. For post graduate diploma courses: graduation.',
        NOW()
    ),
    (
        69,
        'Journalism includes preparation of written, visual, or audio material envisioned for dissemination through public media with reference to factual, ongoing events of public concern. It deals with broadcast world such as TV and Radio, Web journalism, Print Journalism etc. There are also courses in particular areas of journalism like sports, television, photo, press law etc.',
        'For Post graduate degree courses: BA in journalism. There is also PG diploma in journalism after graduation.',
        NOW()
    ),
    (
        70,
        'Mass communication is the course related to how individuals and entities relay information through mass media to large segments of the population at the same time. It usually relates to newspaper, magazine, book publishing, as well as radio, television and film, as these mediums are used for disseminating information, news and advertising. Mass communication course in a collective term has a series of streams like news-reading, reporting, columnist, Anchoring, radio jockey, public-relations, advertising, production, acting, web journalism, social media etc.',
        'The selection process includes interviews, group discussion, and written tests. 10+2 for undergraduate course.',
        NOW()
    ),
    (
        71,
        'Public relations is related to corporate communication and image building. The field is involved in promoting the organization goals and sustain a good reputation in public through communication. It helps to build relationships with stakeholders through various sources for news/information dissemination.',
        'Graduation in any discipline from recognized University.',
        NOW()
    ),
    (
        72,
        'Art Direction includes work such as creation and management of visual style and images in magazines, newspapers, and product packaging, movies and television productions. Artworks, illustrations or layouts are created for various purposes and used in advertising, newspaper and magazines, theatre, motion picture and video games industries.',
        'B.Sc. (Cinema) + Diploma in Direction, or Post Graduate Diploma in Art Direction and Production Design.',
        NOW()
    ),
    (
        73,
        'Choreography is an artistic opportunity to express one’s personality through the creation of dance. The course includes designing and direction of routines used in dances and performances. The course gives an opportunity to create, edit, and practice with professionalism and provide entertainment for audiences.',
        '12th or equivalent exam in any stream.',
        NOW()
    ),
    (
        74,
        'Direction deals with creative aspects of production such as creating, shaping and controlling artistic and dramatic facets of a film/drama, visualization of script or screenplay, selection of setting/ locations and special costume effects. It comprises guidance for technical crew/actors in creation and development of a concept or visualization.',
        'Bachelor’s Degree in any discipline.',
        NOW()
    ),
    (
        75,
        'Film/Drama production is a joint activity of making movies, television shows, and sometimes commercials. The work includes camera, lighting, editing, sound and set design. This field deals in identifying design styles for sets, locations, graphics, props, lighting, camera angles and costumes, while working closely with the director and producer.',
        'One can get a degree (Bachelor’s or Master’s), or pursue diploma courses, the duration of which may vary between 3 months and 1 year.',
        NOW()
    ),
    (
        76,
        'Fine Arts is the study of creative disciplines like sculpture, painting, and drawing. This course includes variety of mediums- paper, metal, clay, photographic film.',
        'Pass 10+2 with any subject.',
        NOW()
    ),
    (
        77,
        'Performing Arts is a form of artistic expression through Acting or Music performances done live for audiences, some of these include ballet, puppetry, mime.',
        'It is better to visit the web sites for academic requirements as these vary. Some institutions base admission on auditions also.',
        NOW()
    ),
    (
        78,
        'Music is an integral part of Films, Art and Theatre. The study of music includes theoretical understanding of Music and its history, interpretation of music, composition, voice instructions and much more.',
        '10+2 Examination with Music as one of the subjects. B.A. with Music/B.A. (Hons.) in Music for PG Course.',
        NOW()
    ),
    (
        79,
        'Animation is an exciting medium consisting of images and objects embedded to appear as moving pictures. As per traditional animation, images are drawn or painted manually on transparent celluloid sheets to be photographed and displayed on film. The fundamentals of visual communication, Iconography, Image processing tools, Computer painting, Storyboarding techniques, creating artwork are all included in animation.',
        '10th passed or equivalent for Certificate Courses. 10+2 or equivalent examination for Diploma & Degree course.',
        NOW()
    ),
    (
        80,
        'Students pursuing these courses are able to learn about the fundamental tools of cinematography, basic level shooting and are able to work on various digital cameras. The cinematography is a perfect blend of creative integration with the direction which enables development of unique process of film making.',
        'After 10th/12th: Diploma in Cinematography, Diploma in Film Making, Bachelor of Film and Television Production. After Graduation: PG Diploma in Film, Television and Digital Video Production, Post Graduate Certificate Course in Electronic Cinematography (TV).',
        NOW()
    ),
    (
        81,
        'Communication design is a mixed combination between design and information. The course relates to devising strategies for brand building, increasing sales and presence by attracting audience. Market research and problem-solving are also part of the learning process.',
        'Not specified in the PDF. Typically 10+2.',
        NOW()
    ),
    (
        82,
        'The field of Design courses is vast and includes product design, textile design, ceramic, interior design, fashion design, fashion retailing, gem and jewellery design. These may also include graphics design, animation, film design and video programming, footwear design, accessories, furniture design.',
        'After 10+2.',
        NOW()
    ),
    (
        83,
        'The study of visual illustration having combination of thoughts and messages by mixing pictures, texts, symbols is known as Graphic Designing. It is actually the mode of communication through visual depictions. All the latest and modernized techniques in Graphic Designing such as grouping of typography, visual arts and the page layout techniques are used in the process.',
        '10+2 with any stream.',
        NOW()
    ),
    (
        84,
        'Photography is an art of storytelling through still photographs, used as recorded events and images of people, places, events, and objects. The course is available in fields like Press photography, Commercial, Industrial, Scientific, Medical, Forensic, Business Photography, Wildlife Photography, Fashion Photography and Portrait work etc. are covered.',
        '10+2.',
        NOW()
    ),
    (
        85,
        'The discipline of Actuarial science applies mathematical and statistical methods to weigh risk in insurance, finance and other industries and occupations. Actuarial science comprises interrelated subjects, including mathematics, statistics, finance, economics and computer science.',
        'Actuarial Common Entrance Test (ACET exam) - 10+2 or equivalent exam with English. After ACET, apply at www.actuariesindia.org to become a student member of IAI. For PG diplomas, Graduate Degree in any discipline.',
        NOW()
    ),
    (
        86,
        'Bank Management includes sectors such as Investment Banking, Corporate Finance Banking, Personal, Retail and Rural Banking, Treasury Management etc. The course structure is related to fund raising through bonds and securities in the capital market, giving financial advice, plans and raising the capital or fund.',
        '10+2 with accounts, maths and economics.',
        NOW()
    ),
    (
        87,
        'The administration of a business is interchangeable with the performance or management of business operations, it includes the efficient organization of people and other resources so as to direct activities toward common goals and objectives.',
        '10+2 or equivalent qualification. B.Com, B.A., B.Sc., BE/B.Tech etc. Subjects such as commerce, economics and mathematics would prepare a candidate better.',
        NOW()
    ),
    (
        88,
        'Business management is the process of the planning, co-ordination and control of a business and to establish a value-creating organization.',
        '10+2 pass with any discipline or equivalent. Graduation for Post-Graduation degree/diploma in management. CAT/CMAT/other entrance tests after graduation.',
        NOW()
    ),
    (
        89,
        'A course in Cost and Work Accounts work would cover structuring business policy of a company to give a forecast for projects on the basis of past and present financial performances.',
        'For Foundation Course: 10/10+2 pass or equivalent. For Intermediate Course: Passed 10+2 and Foundation Course of the Institute of Cost Accountants of India/Graduation in any discipline other than Fine Arts.',
        NOW()
    ),
    (
        90,
        'Chartered Accountancy plays key role in formulation of financial policies & investment plans of a company, and to make business plans for sustenance and growth of a company.',
        'Completion of Foundation Course and pass in Foundation Exam or, Commerce graduates with more than 50% or, Non-commerce graduates with mathematics as one of the subjects and 60% of total marks or, Non-commerce graduates other than mathematics with minimum 55%. Duration: 12 months.',
        NOW()
    ),
    (
        91,
        'CFA Program gives an insight in corporate finance, investment management and financial services. The Program is divided into three levels: Preliminary, inter and final level. It is recognized as a Postgraduate Diploma in Financial Analysis by AICTE. It is a self-study programme and the Institute supplies study material to the enrolled students.',
        'Degree and Engineering college students (any discipline). Candidates successful in admission test or exempted are enrolled. Maximum period: 3 years for preliminary level, 7 years for entire programme.',
        NOW()
    ),
    (
        92,
        'An Event is a program, function, seminar, exhibition, show, award ceremony, marriage or even family party. The activities and assignments in event management involve event marketing, Costs and Budgets available, advertisements, reviews, demos and post.',
        '10+2 with good knowledge of English.',
        NOW()
    ),
    (
        93,
        'Hospital Management is related to various aspects such as purchase of equipment, human resource, and promotion of health services, economic planning, and budget allocation for hospital services.',
        'XII pass or equivalent with Biology. For some institutes an MBBS degree is the criteria for admission and for certain courses a Bachelor’s degree (Any stream) is required. Eligibility criteria may vary.',
        NOW()
    ),
    (
        94,
        'Hotel management involves the study of House-Keeping, Food & Beverage Service, Food Production, Dietetics and Nutrition, Tourism Management, Catering Technology, Accommodation Operations & Management, Culinary Arts and Kitchen Administration (Chef Training), Bartending, front office etc.',
        '10+2 or equivalent exam for diploma and graduation courses.',
        NOW()
    ),
    (
        95,
        'Human resource management deals with the management of workforce in any organisation. It is responsible for the selection, training, assessment, and rewards of employees, along with ensuring compliance of labour laws. HR also includes strategies & initiatives like mergers and acquisitions, talent management, succession planning, industrial and labour relations training in Personnel Management, Employee Welfare, and Industrial Relations.',
        'For Graduation: 10+2. For PG: Three year BA/BBA and an entrance exam such as CMAT/CAT/XAT or ATMA. Duration: 2 years.',
        NOW()
    ),
    (
        96,
        'Insurance assures compensation or reimbursement of loss of ensured life and assets of individual or groups or companies covered under life insurance and general insurance. Life insurance relates to humans lives whereas general insurance covers all the living and non-living things.',
        'For Graduation: 10+2. For post-graduation/PG Diploma: Three years Bachelor’s Degree or equivalent in any discipline. Associate/Fellow Members of ICSI or Insurance Institute of India also eligible.',
        NOW()
    ),
    (
        97,
        'Supply chain consists of various activities that take place between the production and distribution of materials. Logistics and supply chain management includes different sections of supply chain management like materials purchase, management of transport, warehousing, packaging and distribution, order processing, inventory management.',
        'UG: 10+2. PG: BA/BBA.',
        NOW()
    ),
    (
        98,
        'Management is a vital component of an organization which determines its success or failure to a great extent. There are courses available in Marketing research, Marketing Management, HR management, Finance Management and verticals such as advertising, Operations research analysis. There are several other specialized areas like Information Technology, Hospitality, Tourism and Pharma Management and more.',
        '10+2 for undergraduate courses like BBA. CAT/CMAT/other entrance tests after graduation.',
        NOW()
    ),
    (
        99,
        'Bachelor of Arts is a three year degree course after +2 in which mostly 4 or 5 subjects are taught such as Hindi, English or other language, Political Science, History, Economics, Geography, Sociology, Psychology or other social science subjects or Fine Arts, Health & Physical Education etc. Specialisation or honours courses can also be done in any one subject as a major such as B.A. in Fine Arts or English etc.',
        '10+2.',
        NOW()
    ),
    (
        100,
        'Diploma in Elementary Education (D.El.Ed/D.Ed) programme is meant for training of in-service teachers working in primary/ upper primary schools. Whereas Bachelor of Education (B.Ed.) course is meant for training of teachers for teaching at secondary and senior secondary classes.',
        'D.El.Ed: 10+2 with 50% marks and teaching experience required in some institutes. B.Ed.: Bachelor of Arts (B.A.) or Bachelor of Science (B.Sc.).',
        NOW()
    ),
    (
        101,
        'Corporate intelligence helps in making business decisions and strategies. It assesses and gives important information on present and prospective business and other matters to assist companies to avoid risks, venture into new markets/fields, mitigate business problems and carry out investigations. Its activities and work improves business opportunities. It adds to corporate, financial and legal intelligence of a company. Corporate intelligence becomes prerequisite for new investments, combined ventures and procurements/acquisitions.',
        'CIP-I Level Certification requires completion of courses CI 101, CI 301, CI 302, CI 303, CI 304. Master of CI CIP-II Level Certification requires completion of courses CI 401, CI 402, CI 403 and CIP-I certification.',
        NOW()
    ),
    (
        102,
        'The work of Private detectives is to investigate multiple areas, ranging from finding missing persons to discovering the cause of a fire, or recovering stolen property to investigating theft. It encompasses conducting casework, interview witnesses, perform surveillance, and review public and government records to collect information. Cases may at times require investigators to testify in a court or work alongside law enforcement.',
        '10th (SSC) or 10+2 (HSC) or Diploma passed in any discipline from recognized Board/School/College OR Basic knowledge about related field.',
        NOW()
    ),
    (
        103,
        'It is the study of understanding the biological and chemical composition of food and how its preservation can affect the level of nutrition. Nutritionist, Diet Therapist, and Aerobic Consultant know the science of Food and Nutrition and integrate it with the production and consumption of food.',
        '10+2 examination in any relevant stream.',
        NOW()
    ),
    (
        104,
        'Learning foreign languages not only strengthens better understanding of cultures, perspectives, employability but also improves cognitive skills, concentration span, memorisation and multi-tasking skills in an individual.',
        '10th/10+2 for Diploma & Certificate courses. 10+2 with Diploma or Certificate courses for BA. Eligibility varied for MA among universities & language centres.',
        NOW()
    ),
    (
        105,
        'Home Science course is the study of the artistic values and the scientific methods employed in home management. It helps the students to have knowledge on diverse aspects of Resource Management, Food Nutrition, Human development, and so on.',
        '10+2 or intermediate examination with any two Biology/Natural Sciences, Physical Sciences, Agricultural Sciences and Vocational courses in Home Science.',
        NOW()
    ),
    (
        106,
        'The course consists of developing concepts, spaces, research and managing projects. Interior designing is the art of designing interior furniture, furnishings, design patterns, colour combinations to meet the demand of customized solutions.',
        '10+2. Some colleges/universities select students based on performance in aptitude test (Mathematics, science, drawing skills).',
        NOW()
    ),
    (
        107,
        'Liberal studies involves the multidisciplinary study of subjects ranging from Humanities to, Sciences, Social Sciences and Arts. The aim of the course is to develop critical thinking.',
        '10+2 or equivalent examination.',
        NOW()
    ),
    (
        108,
        'Library Science course is the study of managing, maintaining and preserving records and information. Information of various types is sourced and classified for users with the help of record management, preserved and disseminated with the help of technology.',
        '10+2 (any stream) for Certificate & Diploma Courses.',
        NOW()
    ),
    (
        109,
        'This course is meant for teaching in nursery schools/ playschools/ pre-schools/ kindergartens on doing early childhood education/nursery teacher training course or Montessori teacher training course. After doing these training courses, there are avenues for becoming entrepreneur in this field of education by setting up schools.',
        'Should be at least 18 years of age. Passed in 10th.',
        NOW()
    ),
    (
        110,
        'Nutrition and Dietetics is mainly associated with the promotion of good, clean health habits which can help to live a quality life. The focus is to educate, motivate and counsel people for a better work routine and healthy food selection. The study of nutrition involves understanding of the components of the food, harmful reactions, digestion and body fitness.',
        '10+2 examination in any relevant stream.',
        NOW()
    ),
    (
        111,
        'Physical Education is an interdisciplinary course that covers the physical knowledge of sports, exercises or physical activities. It teaches care, development of body of a person or a group of people through training and management skills.',
        '10+2 in any stream.',
        NOW()
    ),
    (
        112,
        'Sports means to indulge in any kind of Physical activity or games played individually or in groups/teams for the purposes of enjoyment, learning skills and participating in competition. The course provides details of these athletic activities, management structure, rules and ethics etc.',
        '10 & 10+2 at entry level.',
        NOW()
    ),
    (
        113,
        'Tourism & Travels studies the physical, economic, social and cultural aspects of tourism, tourist markets, and destinations. It also studies the wider perspective of tourism as an interdisciplinary way drawing knowledge from several social science subjects.',
        '10+2 with fluency in English, at least one foreign language & also 2 or 3 regional languages. At post graduate level: Graduation in any discipline.',
        NOW()
    ),
    (
        114,
        'Allopathy generally refers to the science-supported modern medicine wherein medical professionals (doctors, nurses, pharmacists and therapists) assess and treat any disease, its symptoms and effects by means of drugs, surgery, radiology etc. Medical professionals work individually as well as in team for analysing a patient’s disease or general health issues with their symptoms and effects and take steps for treatment with diagnostic tests, surgery, prescribing certain medications. They also undertake research in medical field to explore cause of ailments and best possible ways of treating diseases and injuries. The specialities in it include Internal medicine, Anaesthesiology, Neurology, Cardiovascular medicine, Paediatrics, Family medicine, Oncology, Psychiatry, Dermatology, Orthopaedics, Radiation oncology etc.',
        'UG: 10+2 class pass with Physics, chemistry and biology. Entrance Test: NEET-UG. PG: MBBS.',
        NOW()
    ),
    (
        115,
        'The Indian Army, Indian Air Force, Indian Navy and Indian Coast Guard constitute very contours of Indian Armed Forces. The various paramilitary organizations and various inter-service institutions also assist the Indian Armed Forces. The interdisciplinary subject of Military/Defence Studies in various colleges/universities in India related the studies or various aspects of national security such as military manpower, strategic interest, geopolitics, geography, science and technology, economics of defence, conflict management and conflict resolution, war etc.',
        'All India Competitive Examinations conducted by UPSC for Army, Indian Air Force and Navy. NDA for 10+2. CDSE for Graduates. AFCAT for Graduates.',
        NOW()
    ),
    (
        116,
        'A qualified Company Secretary (CS) becomes a Key Managerial Personnel (KMP) in a Company or can set up his/her own practice, through various advisory services in fields such as business strategy, guidance on setting up of various forms of business organisation, compliance, arbitration, valuation and other business related matters like areas of Corporate law advisory & Representation, Arbitration and Conciliation services. A CS plays multi-disciplinary roles as an In-House Legal Expert/ Planner/Strategic Manager and Compliance officer of the company for audit and verifications.',
        'Company Secretaries Executive Entrance Test (CSEET): 10+2 Pass or equivalent. CS Executive Programme: CSEET Passed Students/ICAI Final Pass/ICMAI Final Pass. CS Professional Programme: Executive Passed Students.',
        NOW()
    ),
    (
        117,
        'The Blockchain Technology is basically an open source digital ledger where the information is shared in a reliable, secure, chronological manner. The Blockchain Technology sprung after huge popularity of digital cryptocurrencies. The study of Blockchain Technology comprises basic design and architectural of Blockchain, emerging models, functional and operational aspects of the cryptocurrency, cyber security, its usage in various application domains and limitations, etc.',
        'UG: 10+2 with Physics, Chemistry, Maths. PG: B.Tech (CSE/IT)/M.Tech/Ph.D.',
        NOW()
    ),
    (
        118,
        'Digital Marketing Courses broadly give inside view of sales and marketing activities and practical understanding of digital means and technologies through Internet, mobile phones, display advertising, and similar other digital channels and platforms.',
        'Minimum Eligibility: 10+2. Executive Program/PG Program: Graduate/PostGraduate degree. Executive Program also requires 2/3 years of relevant experience.',
        NOW()
    ),
    (
        119,
        'Civil Services can be referred as executive branch of India works as the backbone of the administrative machinery of the country. It facilitates in implementation of policies of Govt. of India and delivering services in India while creating vision and strategies vis a vis emerging requirements. The Union Public Service Commission (UPSC) conducts nationwide preliminary and main exams followed by Interview for selection of candidates for recruitment to various Civil Services of the Government of India.',
        'Minimum Educational Qualifications: Graduate. Age Limits: 21-32 years (relaxable). Number of attempts: Six. More details on UPSC website.',
        NOW()
    ),
    (
        120,
        'In Diagnostic Radiology, the images of X-Ray and other imaging techniques are used to diagnose the disease or ailment of a patient through procedures such as plain radiographs, ultrasound, and computed tomography (CT), MRI and positron emission tomography coupled with CT or MRI (PET-CT and PET-MRI) etc. Radiology can be broadly categorised into two areas: Diagnostic radiology and Interventional radiology.',
        'UG: 10+2 or equivalent with English, Physics, Chemistry and either Biology and/or Mathematics. PG: Bachelor Degree in Sciences (three years course), Medical Technology (Radiography) and Medicine/MBBS degree.',
        NOW()
    ),
    (
        121,
        'Disaster Management provides fundamental conceptual understanding of various type of disasters that affect human lives and property. It studies causes and effects of calamities, human response to emergencies, crisis management, aspects of damage management & control, insurance, strategies for Disaster Risk Reduction and rehabilitation, applications for science and technology for hazards, communication systems during calamities, Public Health consequences of Disasters, awareness towards disasters etc.',
        'Diploma/Graduation: Pass in 10+2 Exam or equivalent. PG Level: Graduate. Some institutions seek Bachelor’s degree in Geography/Geology/Environmental Science/Civil Engg. or M.Sc./M.Tech in Remote Sensing/GIS.',
        NOW()
    ),
    (
        122,
        'Telecommunication management encompasses understanding of telecom-related technologies including telephony, television and internet. This also includes required skills, space, and strategies to manage telecom networks - voice, video and data. The focus of the study on Telecom Industry is compatibility and conjunction with other technologies, expansion of systems and services, managing cost pressures, and robust industry gains etc. while fulfilling workforce requirements and other dynamic needs of information and communication technology systems to make Telecom technology as a means of development as well as welfare.',
        'B.Tech: 10+2 with minimum 60% in PCM for Non-Sponsored & 55% for Sponsored Category. Post Graduate: BSc/BCA/B.Tech./BE/BBA.',
        NOW()
    ),
    (
        123,
        'Entrepreneurship is the art of starting and managing a business. This is the skill of identifying a business opportunity, investing in it, making a plan for enterprise expansion and monitoring. An Entrepreneur explores newer fields/ sources or demands in existing businesses. The Entrepreneur ideates and establishes business venture vis a vis demand, assesses business requirements, business dealing and follow-ups.',
        'For Diploma: 10+2 or Bachelor Preparatory Programme (BPP) from IGNOU. Post Graduate Course: Graduation/ Graduation with relevant work experience.',
        NOW()
    );

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
    `id` int(11) NOT NULL,
    `name` varchar(100) DEFAULT NULL,
    `email` varchar(100) DEFAULT NULL,
    `phone` varchar(15) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `city` varchar(100) DEFAULT NULL,
    `gender` varchar(20) DEFAULT NULL,
    `dob` date DEFAULT NULL,
    `is_verified` tinyint(4) DEFAULT 0,
    `verified_at` datetime DEFAULT NULL,
    `is_admin` tinyint(4) DEFAULT 0,
    `last_login` datetime DEFAULT NULL,
    `login_count` int(11) DEFAULT 0,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_activity`
--

CREATE TABLE `user_activity` (
    `id` int(11) NOT NULL,
    `user_id` int(11) DEFAULT NULL,
    `field_id` int(11) DEFAULT NULL,
    `specialization_id` int(11) DEFAULT NULL,
    `course_id` int(11) DEFAULT NULL,
    `activity_type` varchar(50) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `college_courses`
--
ALTER TABLE `college_courses` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
-- ALTER TABLE `courses`
--   ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fields`
--
ALTER TABLE `fields` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specializations`
--
ALTER TABLE `specializations` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialization_details`
--
-- ALTER TABLE `specialization_details`
--   ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_activity`
--
ALTER TABLE `user_activity` ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 11;

--
-- AUTO_INCREMENT for table `college_courses`
--
ALTER TABLE `college_courses`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 46;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses` AUTO_INCREMENT = 134;

--
-- AUTO_INCREMENT for table `fields`
--
ALTER TABLE `fields`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 11;

--
-- AUTO_INCREMENT for table `specializations`
--
ALTER TABLE `specializations`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 41;

--
-- AUTO_INCREMENT for table `specialization_details`
--
ALTER TABLE `specialization_details` AUTO_INCREMENT = 127;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_activity`
--
ALTER TABLE `user_activity`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Table structure for table `otp_verification`
--

CREATE TABLE `otp_verification` (
    `id` int(11) NOT NULL,
    `contact` varchar(100) DEFAULT NULL,
    `otp` varchar(6) DEFAULT NULL,
    `expires_at` datetime DEFAULT NULL,
    `is_used` tinyint(4) DEFAULT 0,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
    `id` int(11) NOT NULL,
    `user_id` int(11) DEFAULT NULL,
    `login_time` datetime DEFAULT NULL,
    `logout_time` datetime DEFAULT NULL,
    `ip_address` varchar(50) DEFAULT NULL,
    `device` varchar(50) DEFAULT NULL,
    `browser` varchar(50) DEFAULT NULL,
    `os` varchar(50) DEFAULT NULL,
    `token` text DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `updated_by` int(11) DEFAULT NULL,
    `is_status` tinyint(4) DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Indexes for table `otp_verification`
--
ALTER TABLE `otp_verification` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login` ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `otp_verification`
--
ALTER TABLE `otp_verification`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Dumping data for table `users`
--

INSERT INTO
    `users` (
        `name`,
        `email`,
        `phone`,
        `password`,
        `city`,
        `is_verified`,
        `verified_at`,
        `is_admin`,
        `created_at`,
        `is_status`
    )
VALUES (
        'Admin User',
        '2004bshree@gmail.com',
        '9999999999',
        '$2y$12$WYcQKX5yLTWDkVWvmPL5TeWyaZincUyMhzvS9zJdIg3ltyjbU6qpm',
        'Bhubaneswar',
        1,
        NOW(),
        1,
        NOW(),
        1
    ),
    (
        'Rohan Das',
        'rohan@example.com',
        '9876543210',
        '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W',
        'Cuttack',
        1,
        NOW(),
        0,
        NOW(),
        1
    ),
    (
        'Priya Mohanty',
        'priya@example.com',
        '9876543211',
        '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W',
        'Bhubaneswar',
        1,
        NOW(),
        0,
        NOW(),
        1
    ),
    (
        'Sourav Nayak',
        'sourav@example.com',
        '9876543212',
        '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W',
        'Puri',
        1,
        NOW(),
        0,
        NOW(),
        1
    ),
    (
        'Ananya Behera',
        'ananya@example.com',
        '9876543213',
        '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W',
        'Sambalpur',
        1,
        NOW(),
        0,
        NOW(),
        1
    ),
    (
        'Bikash Patra',
        'bikash@example.com',
        '9876543214',
        '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W',
        'Balasore',
        1,
        NOW(),
        0,
        NOW(),
        1
    );

--
-- Dumping data for table `user_login`
--

INSERT INTO
    `user_login` (
        `user_id`,
        `login_time`,
        `ip_address`,
        `device`,
        `browser`,
        `os`,
        `token`,
        `created_at`
    )
VALUES (
        1,
        NOW(),
        '127.0.0.1',
        'Desktop',
        'Chrome',
        'Windows',
        'token_admin',
        NOW()
    ),
    (
        2,
        DATE_SUB(NOW(), INTERVAL 1 DAY),
        '127.0.0.1',
        'Mobile',
        'Safari',
        'iOS',
        'token_rohan',
        NOW()
    ),
    (
        3,
        DATE_SUB(NOW(), INTERVAL 2 DAY),
        '127.0.0.1',
        'Desktop',
        'Firefox',
        'Linux',
        'token_priya',
        NOW()
    );

--
-- Dumping data for table `user_activity`
--

INSERT INTO
    `user_activity` (
        `user_id`,
        `field_id`,
        `specialization_id`,
        `course_id`,
        `activity_type`,
        `created_at`
    )
VALUES (
        2,
        1,
        1,
        1,
        'Viewed Course',
        NOW()
    ),
    (
        3,
        2,
        17,
        NULL,
        'Searched Specialization',
        NOW()
    ),
    (
        4,
        3,
        21,
        NULL,
        'Viewed Field',
        NOW()
    ),
    (5, 1, 1, 1, 'Inquired', NOW());

--
-- Table structure for table `general_courses`
--

CREATE TABLE `general_courses` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) DEFAULT NULL,
    `full_name` varchar(150) DEFAULT NULL,
    `duration` varchar(50) DEFAULT NULL,
    `degree_level` varchar(50) DEFAULT NULL,
    `course_type` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

INSERT INTO
    `general_courses` (
        `id`,
        `name`,
        `full_name`,
        `duration`,
        `degree_level`,
        `course_type`
    )
VALUES (
        1,
        'B.Tech',
        'Bachelor of Technology',
        '4 Years',
        'UG Degree',
        'Full Time'
    ),
    (
        2,
        'M.Tech',
        'Master of Technology',
        '2 Years',
        'PG Degree',
        'Full Time'
    ),
    (
        3,
        'MBA',
        'Master of Business Administration',
        '2 Years',
        'PG Degree',
        'Full Time'
    ),
    (
        4,
        'MBBS',
        'Bachelor of Medicine and Bachelor of Surgery',
        '5.5 Years',
        'UG Degree',
        'Full Time'
    ),
    (
        5,
        'M.Sc',
        'Master of Science',
        '2 Years',
        'PG Degree',
        'Full Time'
    ),
    (
        6,
        'Ph.D',
        'Doctor of Philosophy',
        '3 Years',
        'Doctoral',
        'Full Time'
    ),
    (
        7,
        'E-Master',
        'Executive Master Program',
        '1-2 Years',
        'Postgraduate',
        'Online/Part-time'
    ),
    (
        8,
        'B.A',
        'Bachelor of Arts',
        '3 Years',
        'UG Degree',
        'Full Time'
    ),
    (
        9,
        'B.Tech & M.Tech Dual Degree',
        'Integrated B.Tech and M.Tech',
        '5 Years',
        'Integrated',
        'Full Time'
    ),
    (
        10,
        'PG (Medical)',
        'Post Graduate Medical (DM/M.Ch)',
        '3 Years',
        'Super Specialty',
        'Full Time'
    ),
    (
        11,
        'MD',
        'Doctor of Medicine',
        '3 Years',
        'PG Degree',
        'Full Time'
    ),
    (
        12,
        'MS',
        'Master of Surgery',
        '3 Years',
        'PG Degree',
        'Full Time'
    ),
    (
        13,
        'Allied Medical Courses',
        'Allied Health Sciences',
        '2-3 Years',
        'Various',
        'Full Time'
    ),
    (
        14,
        'BCA',
        'Bachelor of Computer Applications',
        '3 Years',
        'UG Degree',
        'Full Time'
    ),
    (
        15,
        'MCA',
        'Master of Computer Applications',
        '2 Years',
        'PG Degree',
        'Full Time'
    ),
    (
        16,
        'B.Sc',
        'Bachelor of Science',
        '3 Years',
        'UG Degree',
        'Full Time'
    ),
    (
        17,
        'B.Pharm',
        'Bachelor of Pharmacy',
        '4 Years',
        'UG Degree',
        'Full Time'
    ),
    (
        18,
        'Diploma',
        'Polytechnic Diploma',
        '3 Years',
        'Diploma',
        'Full Time'
    ),
    (
        19,
        'B.Ed',
        'Bachelor of Education',
        '2 Years',
        'UG Degree',
        'Full Time'
    );

-- --------------------------------------------------------

--
-- Table structure for table `college_course_specializations`
--

CREATE TABLE `college_course_specializations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `college_id` INT,
    `course_id` INT,
    `specialization_id` INT,
    `total_seats` INT,
    `short_desc` TEXT,
    `created_at` DATETIME,
    `created_by` INT,
    `updated_at` DATETIME,
    `updated_by` INT,
    `is_status` TINYINT DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

INSERT INTO
    `college_course_specializations` (
        `college_id`,
        `course_id`,
        `specialization_id`,
        `total_seats`,
        `short_desc`
    )
VALUES (
        4,
        1,
        11,
        60,
        'Civil Engineering: Foundations of infrastructure, structural design, and construction management.'
    ),
    (
        4,
        1,
        11,
        60,
        'Construction Technology: Focuses on modern construction methods, project management, and sustainable building practices.'
    ),
    (
        4,
        1,
        20,
        60,
        'Mechanical Engineering: Design, analysis, and manufacturing of mechanical systems and machinery.'
    ),
    (
        4,
        1,
        6,
        60,
        'Mechanical Engineering(Automobile): Specialized study of vehicle design, engines, and automotive systems.'
    ),
    (
        4,
        1,
        2,
        60,
        'Aerospace Engineering: Research, design, and development of aircraft and spacecraft systems.'
    ),
    (
        4,
        1,
        28,
        60,
        'Mechatronics Engineering: Integration of mechanical systems with electronics and intelligent control software.'
    ),
    (
        4,
        1,
        13,
        60,
        'Electrical Engineering: Power generation, transmission, and electrical equipment design.'
    ),
    (
        4,
        1,
        13,
        60,
        'Electrical and Computer Engineering: Study of hardware-software integration and electrical system design.'
    ),
    (
        4,
        1,
        14,
        60,
        'Electronics & Tele-Communication Engineering: Design of communication devices, signal processing, and networking.'
    ),
    (
        4,
        1,
        13,
        60,
        'Electronics & Electrical Engineering: Combined study of electronic circuits and electrical power systems.'
    ),
    (
        4,
        1,
        14,
        60,
        'Electronics and Computer Science Engineering: Integration of electronic systems with computer science principles.'
    ),
    (
        4,
        1,
        14,
        60,
        'Electronics Engineering VLSI Design and Technology: Specialized design of very-large-scale integrated circuits and microelectronics.'
    ),
    (
        4,
        1,
        17,
        60,
        'Electronics and Instrumentation: Focus on electronic instruments, automation, and measurement systems.'
    ),
    (
        4,
        1,
        12,
        120,
        'Computer Science & Engineering: Comprehensive study of computer software, algorithms, and data structures.'
    ),
    (
        4,
        1,
        14,
        60,
        'Computer Science & Communication Engineering: Focus on computing systems and digital communication networks.'
    ),
    (
        4,
        1,
        4,
        60,
        'Computer Science and Engineering with specialization Artificial Intelligence: Advanced computing with focus on AI algorithms and intelligent systems.'
    ),
    (
        4,
        1,
        35,
        60,
        'Computer Science and Engineering with specialization Cyber Security: Focus on protecting systems, networks, and data from digital attacks.'
    ),
    (
        4,
        1,
        12,
        60,
        'Computer Science and Engineering with specialization Data Science: Extraction of insights from large datasets using statistical and computational methods.'
    ),
    (
        4,
        1,
        35,
        60,
        'Computer Science and Engineering with specialization Internet of Things and Cyber Security Including Block Chain Technology: Study of connected devices, security, and decentralized ledger technology.'
    ),
    (
        4,
        1,
        12,
        60,
        'Computer Science and Engineering with specialization Internet of Things: Design and development of connected smart devices and networks.'
    ),
    (
        4,
        1,
        12,
        60,
        'Computer Science & Systems Engineering: Study of complex computing systems and their integration into larger infrastructures.'
    ),
    (
        4,
        1,
        4,
        60,
        'Computer Science and Engineering with specialization Artificial Intelligence and Machine Learning: Focus on AI, machine learning, and data-driven decision making.'
    ),
    (
        4,
        1,
        34,
        60,
        'Information Technology: Management of information systems, networking, and software applications.'
    ),
    (
        4,
        1,
        10,
        60,
        'Chemical Engineering: Chemical processes for the large-scale production of industrial materials.'
    ),
    (
        4,
        8,
        99,
        40,
        'Economics (Hons): Study of production, distribution, and consumption of goods and services.'
    ),
    (
        4,
        8,
        99,
        40,
        'Sociology (Hons): Scientific study of society, social patterns, and social interactions.'
    ),
    (
        4,
        8,
        99,
        40,
        'Psychology (Hons): Scientific study of the human mind and its functions, especially behavior.'
    ),
    (
        4,
        8,
        99,
        40,
        'English (Hons): Advanced study of English literature, language, and linguistics.'
    ),
    (
        1,
        1,
        11,
        60,
        'Civil Engineering: Foundations of infrastructure, structural design, and construction management.'
    ),
    (
        1,
        1,
        20,
        60,
        'Mechanical Engineering: Design, analysis, and manufacturing of mechanical systems and machinery.'
    ),
    (
        1,
        1,
        17,
        40,
        'Electronics & Instrumentation Engineering: Focus on electronic instruments, automation, and measurement systems.'
    ),
    (
        1,
        1,
        22,
        40,
        'Metallurgical & Materials Engineering: Study of metals, alloys, and advanced material science for industrial use.'
    ),
    (
        1,
        1,
        13,
        60,
        'Electrical Engineering: Power generation, transmission, and electrical equipment design.'
    ),
    (
        1,
        1,
        12,
        120,
        'Computer Engineering: Hardware and software integration, system design, and computer architecture.'
    ),
    (
        1,
        1,
        28,
        30,
        'Mechanical Engineering (Al & Robotics): Advanced mechanical engineering with a focus on robotics and artificial intelligence.'
    ),
    (
        1,
        1,
        14,
        90,
        'Electronics & Communication Engineering: Design of communication devices, signal processing, and networking.'
    ),
    (
        1,
        1,
        29,
        40,
        'Textile Engineering: Study of fiber production, fabric design, and textile manufacturing processes.'
    ),
    (
        1,
        1,
        32,
        60,
        'Biotechnology: Applying biological systems and organisms to develop innovative products.'
    ),
    (
        1,
        1,
        12,
        120,
        'Computer Science Engineering: Comprehensive study of computer software, algorithms, and data structures.'
    ),
    (
        1,
        1,
        4,
        60,
        'Computer Science Engineering (AI & ML): Specialization in artificial intelligence, machine learning, and data analytics.'
    ),
    (
        1,
        1,
        34,
        60,
        'Information Technology: Management of information systems, networking, and software applications.'
    ),
    (
        1,
        1,
        82,
        30,
        'Fashion & Apparel Technology: Design and technology behind fashion garments and apparel manufacturing.'
    ),
    (
        1,
        5,
        26,
        30,
        'Chemistry: Advanced study of chemical substances and laboratory analysis.'
    ),
    (
        1,
        5,
        26,
        30,
        'Physics: Theoretical and experimental study of matter, energy, and physical phenomena.'
    ),
    (
        1,
        5,
        43,
        30,
        'Mathematics & Computing: Interdisciplinary study of mathematical modeling and high-performance computing.'
    ),
    (
        1,
        5,
        10,
        30,
        'Industrial chemistry: Chemical processes for the large-scale production of industrial materials.'
    ),
    (
        1,
        2,
        14,
        20,
        'Electronics & Communication Engineering: Advanced electronics and telecommunication systems for the digital age.'
    ),
    (
        1,
        2,
        13,
        18,
        'Energy System and Management: Sustainable energy solutions, power management, and renewable systems.'
    ),
    (
        1,
        2,
        17,
        18,
        'Instumentation and Control Engineering: Advanced control systems, industrial automation, and sensor technologies.'
    ),
    (
        1,
        2,
        20,
        18,
        'Mechanical systems Design: Advanced design and analysis of complex mechanical components and systems.'
    ),
    (
        1,
        2,
        28,
        18,
        'Mechatronics & Machine Learning: Integration of mechanical systems with electronics and intelligent algorithms.'
    ),
    (
        1,
        2,
        13,
        18,
        'Power System Engineering: Power grid management, electrical distribution, and high-voltage engineering.'
    ),
    (
        1,
        2,
        29,
        18,
        'Textile Engineering: Advanced textile processing, fabric innovation, and fiber technology.'
    ),
    (
        1,
        2,
        29,
        18,
        'Textile Chemical Engineering: Chemical processing and finishing techniques in the textile industry.'
    ),
    (
        1,
        2,
        13,
        18,
        'Power Electronics & Drives: Power conversion technology and control of industrial electrical drives.'
    ),
    (
        1,
        2,
        20,
        18,
        'Thermal engineering: Study of thermodynamics, heat transfer, and thermal power systems.'
    ),
    (
        1,
        2,
        14,
        18,
        'VLSI Design & Embedded System: Microelectronic circuit design and dedicated computer system architecture.'
    ),
    (
        1,
        2,
        11,
        18,
        'Water Resources Engineering: Management of water systems, hydrology, and irrigation engineering.'
    ),
    (
        1,
        2,
        32,
        18,
        'Biotechnology: Advanced research in bioprocessing, genetics, and molecular biology.'
    ),
    (
        1,
        2,
        12,
        18,
        'Computer Science & Engineering: Advanced computer science concepts and research in software systems.'
    ),
    (
        1,
        2,
        15,
        18,
        'Industrial Engineering & Management: Optimization of industrial processes and management of operations.'
    ),
    (
        1,
        2,
        34,
        18,
        'Information Technology: Advanced information systems and enterprise technology management.'
    ),
    (
        1,
        2,
        11,
        18,
        'Structural Engineering: Advanced structural analysis and design for modern architecture.'
    ),
    (
        1,
        2,
        15,
        18,
        'Industrial Engineering & Management (Part Time): Evening/Weekend program for working professionals in industrial management.'
    ),
    (
        1,
        2,
        34,
        18,
        'Information Technology (Part time): Part-time program focused on advanced enterprise IT systems.'
    ),
    (
        1,
        2,
        17,
        18,
        'Instrumentation & Control Engineering (Part Time): Professional part-time study in automation and control systems.'
    ),
    (
        1,
        2,
        11,
        18,
        'Water Resources Engineering (Part time): Flexible program for professionals in water resource management.'
    ),
    (
        1,
        7,
        34,
        50,
        'School of computer sciences - Data sciences: Executive master program in big data, analytics, and data-driven insights.'
    ),
    (
        1,
        7,
        35,
        50,
        'School of computer sciences - Cyber Security: Advanced executive training in digital forensics and information security.'
    ),
    (
        1,
        7,
        87,
        50,
        'School of Mechanical Sciences - Business Finance and Management: Executive management program focused on finance and business strategy.'
    ),
    (
        1,
        6,
        34,
        20,
        'All branch of Science, Technology and Humanities: Advanced research opportunities across Science, Technology, and Humanities.'
    ),
    (
        3,
        1,
        7,
        40,
        'Biomedical Engineering: Applying engineering principles to healthcare for medical devices and diagnostic tools.'
    ),
    (
        3,
        1,
        8,
        40,
        'Biotechnology: Utilizing biological systems and organisms to develop innovative healthcare and industrial products.'
    ),
    (
        3,
        1,
        11,
        100,
        'Civil Engineering: Infrastructure design, structural analysis, and sustainable construction management.'
    ),
    (
        3,
        1,
        10,
        60,
        'Chemical Engineering: Processing raw materials into products through chemical, physical, and biological changes.'
    ),
    (
        3,
        1,
        9,
        40,
        'Ceramic Engineering: Study of properties, manufacture, and applications of inorganic, non-metallic materials.'
    ),
    (
        3,
        1,
        4,
        30,
        'Artificial Intelligence: Focus on developing intelligent machines that simulate human cognitive functions.'
    ),
    (
        3,
        1,
        12,
        120,
        'Computer Science and Engineering: Core study of computation, algorithms, software systems, and hardware design.'
    ),
    (
        3,
        1,
        14,
        90,
        'Electronics and Communication Engineering: Design and development of electronic circuits and communication systems.'
    ),
    (
        3,
        1,
        17,
        40,
        'Electronics and Instrumentation Engineering: Focus on measuring and controlling physical variables in automated systems.'
    ),
    (
        3,
        1,
        13,
        90,
        'Electrical Engineering: Power systems, control engineering, and electrical machinery design.'
    ),
    (
        3,
        1,
        40,
        30,
        'Food Process Engineering: Engineering principles applied to the large-scale production and preservation of food.'
    ),
    (
        3,
        1,
        82,
        30,
        'Industrial Design: Creative design of products focusing on aesthetics, usability, and mass production.'
    ),
    (
        3,
        1,
        43,
        30,
        'Mathematics and Computing: Interdisciplinary study of mathematical modeling and computer science applications.'
    ),
    (
        3,
        1,
        20,
        100,
        'Mechanical Engineering: Design and manufacturing of energy-efficient machinery and mechanical systems.'
    ),
    (
        3,
        1,
        22,
        60,
        'Metallurgical and Materials Engineering: Study of the physical and chemical properties of metals and advanced materials.'
    ),
    (
        3,
        1,
        24,
        60,
        'Mining Engineering: Sustainable extraction of mineral resources and mineral processing technology.'
    ),
    (
        3,
        1,
        26,
        30,
        'Engineering Physics: Application of physical sciences to engineering challenges in various industries.'
    ),
    (
        3,
        9,
        10,
        20,
        'Chemical Engineering: Integrated 5-year program covering advanced chemical processes.'
    ),
    (
        3,
        9,
        9,
        20,
        'Industrial Ceramic: Integrated study of industrial applications of advanced ceramic materials.'
    ),
    (
        3,
        9,
        22,
        20,
        'Metallurgical and Materials Engineering: Combined UG and PG study in advanced material science.'
    ),
    (
        3,
        9,
        24,
        20,
        'Mining Engineering: Integrated program focusing on advanced mining techniques and safety.'
    ),
    (
        3,
        2,
        7,
        18,
        'Biomedical Engineering: Advanced research in medical instrumentation and bioprocessing.'
    ),
    (
        3,
        2,
        8,
        18,
        'Biotechnology: Specialized study in genetics, molecular biology, and biopharmaceutical technology.'
    ),
    (
        3,
        2,
        11,
        18,
        'Geotechnical Engineering: Study of soil and rock mechanics for stable foundation and underground construction.'
    ),
    (
        3,
        2,
        11,
        18,
        'Structural Engineering: Advanced analysis and design of complex structures like bridges and skyscrapers.'
    ),
    (
        3,
        2,
        11,
        18,
        'Transportation Engineering: Planning and design of efficient transport networks and highways.'
    ),
    (
        3,
        2,
        11,
        18,
        'Water Resources Engineering: Management of water systems, hydrology, and hydraulic structures.'
    ),
    (
        3,
        2,
        37,
        18,
        'Environmental Engineering: Focus on waste management, pollution control, and sustainable ecosystems.'
    ),
    (
        3,
        2,
        11,
        18,
        'Construction Technology and Management: Advanced project management and technology for large-scale construction.'
    ),
    (
        3,
        2,
        10,
        18,
        'Chemical Engineering: Advanced research in chemical reaction engineering and separation processes.'
    ),
    (
        3,
        2,
        37,
        18,
        'Energy and Environmental Engineering: Focus on renewable energy systems and environmental impact mitigation.'
    ),
    (
        3,
        2,
        9,
        18,
        'Industrial Ceramics: Advanced study of ceramic materials for heavy industrial applications.'
    ),
    (
        3,
        2,
        9,
        18,
        'Ceramic and Materials Engineering: Research in high-performance ceramics and composite materials.'
    ),
    (
        3,
        2,
        34,
        18,
        'Computer Science: Advanced algorithms, data structures, and theoretical computer science.'
    ),
    (
        3,
        2,
        35,
        18,
        'Information Security: Focus on cryptography, network security, and data privacy.'
    ),
    (
        3,
        2,
        12,
        18,
        'Software Engineering: Advanced methodologies for large-scale software development and management.'
    ),
    (
        3,
        2,
        14,
        18,
        'VLSI Design and Embedded Systems: Design of microchips and dedicated hardware-software systems.'
    ),
    (
        3,
        2,
        17,
        18,
        'Electronics and Instrumentation Engineering: Advanced control systems and precision measurement technology.'
    ),
    (
        3,
        2,
        14,
        18,
        'Communication and Networks: Research in wireless networks, signal coding, and data communication.'
    ),
    (
        3,
        2,
        14,
        18,
        'Signal and Image Processing: Advanced algorithms for processing digital audio, images, and video.'
    ),
    (
        3,
        2,
        14,
        18,
        'RF and Microwave Systems: Design of high-frequency circuits and antenna systems for communication.'
    ),
    (
        3,
        2,
        4,
        18,
        'Machine Learning and Signal Processing: Integration of AI algorithms with digital signal processing techniques.'
    ),
    (
        3,
        2,
        14,
        18,
        'Electronic Systems and Communication: Design of complex electronic systems for telecommunication industries.'
    ),
    (
        3,
        2,
        17,
        18,
        'Control and Automation: Specialized study in industrial automation and intelligent control systems.'
    ),
    (
        3,
        2,
        13,
        18,
        'Power Electronics and Drives: Research in power conversion and control of electrical machinery.'
    ),
    (
        3,
        2,
        13,
        18,
        'Power Systems Engineering: Advanced study of power grid stability, transmission, and distribution.'
    ),
    (
        3,
        2,
        42,
        18,
        'Atmosphere and Ocean Science: Research in climatology, ocean currents, and atmospheric modeling.'
    ),
    (
        3,
        2,
        40,
        18,
        'Food Process Engineering: Advanced technology for food preservation, packaging, and safety.'
    ),
    (
        3,
        2,
        82,
        18,
        'Industrial Design: Advanced research in product ergonomics and sustainable design.'
    ),
    (
        3,
        2,
        20,
        18,
        'Thermal Engineering: Advanced thermodynamics, heat transfer, and energy conversion systems.'
    ),
    (
        3,
        2,
        20,
        18,
        'Mechanical Systems Design and Control: Design of complex mechanical components with integrated control.'
    ),
    (
        3,
        2,
        18,
        18,
        'Manufacturing and Automation Engineering: Focus on modern manufacturing processes and industrial robotics.'
    ),
    (
        3,
        2,
        20,
        18,
        'Thermal Science and Energy Engineering: Specialized study in heat transfer and renewable energy technologies.'
    ),
    (
        3,
        2,
        20,
        18,
        'Industrial Refrigeration and Cryogenic Engineering: Technology for low-temperature applications and industrial cooling.'
    ),
    (
        3,
        2,
        22,
        18,
        'Metallurgical and Materials Engineering: Advanced research in alloys, nanomaterials, and corrosion science.'
    ),
    (
        3,
        2,
        24,
        18,
        'Mining Engineering: Research in rock mechanics, mine planning, and environmental impact of mining.'
    ),
    (
        3,
        2,
        14,
        18,
        'Semiconductor Devices and Technology: Design and fabrication of advanced semiconductor components.'
    ),
    (
        3,
        3,
        87,
        40,
        'Management: Management training focusing on business strategy, finance, and operations.'
    ),
    (
        3,
        5,
        26,
        30,
        'Chemistry: Advanced study of chemical properties, synthesis, and laboratory research.'
    ),
    (
        3,
        5,
        36,
        30,
        'Applied Geology: Research in earth materials, mineral exploration, and environmental geology.'
    ),
    (
        3,
        5,
        23,
        30,
        'Atmospheric Sciences: Study of weather patterns, climate change, and atmospheric physics.'
    ),
    (
        3,
        5,
        31,
        30,
        'Life Science: Advanced research in biological processes, genetics, and ecology.'
    ),
    (
        3,
        5,
        43,
        30,
        'Mathematics: Theoretical and applied mathematics including analysis, algebra, and topology.'
    ),
    (
        3,
        5,
        43,
        30,
        'Computational Mathematics and Data Science: Focus on numerical methods and data analysis for complex problems.'
    ),
    (
        3,
        5,
        26,
        30,
        'Physics: Advanced study of matter, energy, and fundamental physical laws.'
    ),
    (
        2,
        10,
        114,
        10,
        'D.M. Endocrinology: Advanced study of endocrine systems and hormonal disorders.'
    ),
    (
        2,
        10,
        114,
        10,
        'D.M. Nephrology: Specialized medical care for kidney diseases and renal replacement therapy.'
    ),
    (
        2,
        10,
        114,
        10,
        'DM. Cardiology: Advanced diagnosis and treatment of heart and vascular system disorders.'
    ),
    (
        2,
        10,
        114,
        10,
        'D.M. Clinical Immunology & Rheumatology: Study of immune system disorders and rheumatic diseases.'
    ),
    (
        2,
        10,
        114,
        10,
        'D.M. Medical Gastroenterology: Specialized care for the digestive system and its disorders.'
    ),
    (
        2,
        10,
        114,
        10,
        'D.M. Neurology: Advanced study and treatment of disorders of the nervous system.'
    ),
    (
        2,
        10,
        114,
        10,
        'M.Ch. Neuro-Surgery: Surgical specialty focusing on the brain, spinal cord, and peripheral nerves.'
    ),
    (
        2,
        10,
        114,
        10,
        'M.Ch.Urology: Surgical specialty focusing on the urinary tract and male reproductive system.'
    ),
    (
        2,
        10,
        114,
        10,
        'D.M. CRITICAL CARE MEDICINE: Specialized care for patients with life-threatening illnesses or injuries.'
    ),
    (
        2,
        10,
        114,
        10,
        'D.M. NEONATOLOGY: Specialized medical care for newborn infants, especially the ill or premature.'
    ),
    (
        2,
        10,
        114,
        10,
        'M.CH. PLASTIC & RECONSTRUCTIVE SURGERY: Surgical specialty involving restoration, reconstruction, or alteration of the human body.'
    ),
    (
        2,
        10,
        114,
        10,
        'M.CH. PAEDIATRIC SURGERY: Surgical care for infants, children, and adolescents.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Anatomy): Study of the structure of the human body and its components.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Biochemistry): Chemical processes within and relating to living organisms.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Pharmacology): Study of drug action and the interaction between drugs and living systems.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Community Medicine): Focus on the health of populations and community-based healthcare.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Anaesthesiology): Specialized care for patients before, during, and after surgery involving anesthesia.'
    ),
    (
        2,
        11,
        114,
        20,
        'MD (Pediatrics): Medical care of infants, children, and adolescents.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Physiology): Study of the normal functions of living organisms and their parts.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Microbiology): Study of microscopic organisms and their roles in health and disease.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Pathology): Study of the causes and effects of diseases or injuries.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Psychiatry): Medical specialty devoted to the diagnosis, prevention, and treatment of mental disorders.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (DVL): Specialized study of Dermatology, Venereology, and Leprosy.'
    ),
    (
        2,
        11,
        120,
        20,
        'MD (Radio Diagnosis & Radiology): Use of medical imaging to diagnose and treat diseases.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (TB & Respiratory Diseases): Focus on tuberculosis and other pulmonary/respiratory system disorders.'
    ),
    (
        2,
        11,
        114,
        25,
        'MD (General Medicine): Broad medical specialty focusing on the diagnosis and non-surgical treatment of adult diseases.'
    ),
    (
        2,
        11,
        114,
        10,
        'MD (IHBT): Specialized study of Immuno-Haematology and Blood Transfusion.'
    ),
    (
        2,
        11,
        114,
        15,
        'MD (Emergency Medicine): Focus on the immediate decision making and action necessary to prevent death or further disability.'
    ),
    (
        2,
        12,
        114,
        10,
        'MS (ENT): Surgical specialty focusing on the ears, nose, and throat.'
    ),
    (
        2,
        12,
        114,
        20,
        'MS (Orthopedics): Focus on the musculoskeletal system, including bones, joints, and ligaments.'
    ),
    (
        2,
        12,
        114,
        25,
        'MS (General Surgery): Broad surgical specialty focusing on abdominal contents and other core surgical areas.'
    ),
    (
        2,
        12,
        114,
        15,
        'MS (Ophthalmology): Medical and surgical specialty focusing on the eye and its disorders.'
    ),
    (
        2,
        12,
        114,
        20,
        'MS (OBGY): Combined medical specialty focusing on Obstetrics and Gynecology.'
    ),
    (
        2,
        13,
        114,
        30,
        'B.Sc. in Optometry (BO): Primary healthcare profession focusing on the eyes and related structures.'
    ),
    (
        2,
        13,
        21,
        40,
        'B.Sc. in Medical Laboratory Technology (MLT): Diagnostic procedures performed in laboratory settings.'
    ),
    (
        2,
        13,
        120,
        30,
        'B.Sc. in Medical Radiation Technology (MRT): Use of radiation for medical imaging and treatment.'
    ),
    (
        2,
        13,
        21,
        30,
        'B.Sc. in Operation Theatre Technology (OTT): Assisting in surgical procedures and operation theatre management.'
    ),
    (
        2,
        13,
        21,
        30,
        'B.Sc. in Emergency Medicine Technology (EMT): Specialized training for emergency medical care and procedures.'
    ),
    (
        2,
        13,
        114,
        20,
        'Certified Ophthalmic Assistant (COA): Assisting ophthalmologists in eye care and diagnostic procedures.'
    ),
    (
        2,
        13,
        21,
        20,
        'Certified OT Technicians (COTT): Technical assistance in operation theatre settings.'
    ),
    (
        2,
        13,
        21,
        20,
        'Certified Dialysis Technician (CDT): Assisting in dialysis procedures for kidney failure patients.'
    ),
    (
        2,
        13,
        21,
        20,
        'Certified Neuro Technician (CNT): Technical support for neurological diagnostic tests.'
    ),
    (
        2,
        13,
        21,
        20,
        'Certified ECG Technicians (CECGT): Technical assistance in performing electrocardiograms.'
    ),
    (
        2,
        13,
        21,
        20,
        'Certified EEG Technicians (CEEGT): Technical assistance in performing electroencephalograms.'
    ),
    (
        2,
        13,
        21,
        20,
        'Certified EMG Technicians (CEMGT): Technical assistance in performing electromyograms.'
    ),
    (
        2,
        13,
        114,
        20,
        'Certified Ward Technician (CWT): Basic healthcare support and assistance in hospital wards.'
    ),
    (
        2,
        13,
        21,
        20,
        'Certified Blood Collection Assistant (CBCA): Technical assistance in phlebotomy and blood collection procedures.'
    ),

-- ITER University (ID 5)
(
    5,
    1,
    11,
    60,
    'Civil Engineering: Planning, design, and construction of sustainable infrastructure and structural systems.'
),
(
    5,
    1,
    20,
    60,
    'Mechanical Engineering: Design, analysis, and manufacturing of energy-efficient machines and mechanical systems.'
),
(
    5,
    1,
    13,
    60,
    'Electrical Engineering: Focus on power systems, electrical machinery, and energy transmission.'
),
(
    5,
    1,
    13,
    60,
    'Electrical and Electronics Engineering: Combined study of electrical power and electronic control systems.'
),
(
    5,
    1,
    14,
    60,
    'Electronics and Communication Engineering: Design of communication devices, signal processing, and networking technologies.'
),
(
    5,
    1,
    12,
    120,
    'Computer Science and Engineering: Core study of computation, algorithms, software development, and hardware design.'
),
(
    5,
    1,
    34,
    60,
    'Computer Science and Information Technology: Focus on information systems, software engineering, and network management.'
),
(
    5,
    1,
    4,
    60,
    'CSE (Artificial Intelligence and Machine Learning): Advanced computing with a focus on AI algorithms and intelligent systems.'
),
(
    5,
    1,
    12,
    60,
    'CSE (Data Science): Extraction of insights from large datasets using statistical and computational methods.'
),
(
    5,
    1,
    12,
    60,
    'CSE (Internet of Things): Design and development of connected smart devices and sensor networks.'
),
(
    5,
    1,
    35,
    60,
    'CSE (Cyber Security): Focus on protecting systems, networks, and data from digital attacks and threats.'
),
(
    5,
    14,
    33,
    60,
    'Computer Applications: Comprehensive study of computer applications and software development.'
),
(
    5,
    5,
    26,
    30,
    'Physics: Advanced study of fundamental physical laws, energy, and matter.'
),
(
    5,
    5,
    26,
    30,
    'Chemistry: Research-oriented study of chemical substances, synthesis, and laboratory analysis.'
),
(
    5,
    5,
    43,
    30,
    'Mathematics: Advanced mathematical modeling, analysis, and computational mathematics.'
),
(
    5,
    15,
    33,
    60,
    'Computer Applications: Advanced training in computer applications, software engineering, and system management.'
),
(
    5,
    2,
    11,
    18,
    'Structural Engineering: Advanced structural analysis and design for modern civil engineering projects.'
),
(
    5,
    2,
    12,
    18,
    'Computer Science and Engineering: Advanced research in software systems, algorithms, and computational theory.'
),
(
    5,
    2,
    14,
    18,
    'Embedded System and VLSI Design: Design of dedicated hardware systems and microelectronic circuits.'
),
(
    5,
    2,
    13,
    18,
    'Electric Vehicle Technology: Specialized study in EV powertrains, battery management, and green energy.'
),
(
    5,
    2,
    20,
    18,
    'Machine Design and Robotics: Focus on advanced mechanical design and industrial robotics.'
),
(
    5,
    6,
    26,
    10,
    'General Sciences: Advanced doctoral research across fundamental and applied science disciplines.'
),
(
    5,
    6,
    12,
    10,
    'Engineering and Technology: Research-driven doctoral program in advanced engineering and technological innovation.'
),
(
    5,
    6,
    99,
    10,
    'Humanities and Social Sciences: Advanced research in languages, social structures, and cultural studies.'
);

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `full_name` varchar(255) DEFAULT NULL,
    `phone` varchar(20) DEFAULT NULL,
    `courses` varchar(255) DEFAULT NULL,
    `colleges` varchar(255) DEFAULT NULL,
    `location` varchar(255) DEFAULT NULL,
    `guidance` varchar(10) DEFAULT 'yes',
    `created_at` datetime DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) DEFAULT NULL,
    `college_id` int(11) DEFAULT NULL,
    `created_at` datetime DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Table structure for table `course_details`
--

CREATE TABLE `course_details` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `slug` varchar(100) DEFAULT NULL,
    `category` varchar(100) DEFAULT NULL,
    `short_name` varchar(100) DEFAULT NULL,
    `full_name` varchar(255) DEFAULT NULL,
    `rating` decimal(3, 1) DEFAULT NULL,
    `reviews_count` int(11) DEFAULT NULL,
    `badge` varchar(100) DEFAULT NULL,
    `short_description` text DEFAULT NULL,
    `about_description` text DEFAULT NULL,
    `fees_range` varchar(255) DEFAULT NULL,
    `career_opportunities` json DEFAULT NULL,
    `eligibility` json DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `course_details`
--

INSERT INTO
    `course_details` (
        `id`,
        `slug`,
        `category`,
        `short_name`,
        `full_name`,
        `rating`,
        `reviews_count`,
        `badge`,
        `short_description`,
        `about_description`,
        `fees_range`,
        `career_opportunities`,
        `eligibility`
    )
VALUES (
        1,
        'btech',
        'Engineering',
        'B.Tech',
        'Bachelor of Technology',
        4.6,
        256,
        '🔥 Most Popular',
        'B.Tech is a 4-year undergraduate program that provides engineering skills and technical knowledge in various specializations.',
        'B.Tech programs prepare students with a strong foundation in engineering principles, problem-solving skills, and practical knowledge to build successful careers in the tech and innovation-driven world.',
        '₹ 60,000 - 1,50,000',
        '[{"icon": "💼", "desc": "Design, develop and maintain software applications.", "title": "Software Engineer"}, {"icon": "🌐", "desc": "Build and manage websites and web applications.", "title": "Web Developer"}, {"icon": "🗄️", "desc": "Analyze data and extract valuable insights.", "title": "Data Scientist"}, {"icon": "🛡️", "desc": "Protect systems and data from cyber threats.", "title": "Cyber Security Analyst"}, {"icon": "🤖", "desc": "Work on intelligent systems and machine learning models.", "title": "AI / ML Engineer"}, {"icon": "•••", "desc": "Explore countless career paths in engineering.", "title": "And Many More"}]',
        '["10+2 with Physics, Chemistry and Mathematics (PCM)", "Minimum 50% aggregate", "Entrance Exam (JEE Main / OJEE)", "Seat allocation through counselling"]'
    ),
    (
        2,
        'mba',
        'Management',
        'MBA',
        'Master of Business Administration',
        4.5,
        180,
        '💎 Top Career Choice',
        'MBA is a 2-year postgraduate program focused on business administration, leadership, and management skills.',
        'The Master of Business Administration (MBA) program is designed to develop the skills required for careers in business and management. An MBA can provide significant career benefits, including higher salary potential, promotion opportunities, and a valuable professional network.',
        '₹ 80,000 - 2,50,000',
        '[{"icon": "💼", "desc": "Analyze business data to help companies make better decisions.", "title": "Business Analyst"}, {"icon": "📈", "desc": "Lead marketing campaigns and strategies for products.", "title": "Marketing Manager"}, {"icon": "💰", "desc": "Manage company finances, investments, and budgeting.", "title": "Financial Manager"}, {"icon": "👥", "desc": "Oversee recruitment, training, and employee relations.", "title": "HR Manager"}, {"icon": "🚀", "desc": "Plan, execute, and close projects efficiently.", "title": "Project Manager"}, {"icon": "•••", "desc": "Start and manage your own business ventures.", "title": "And Many More"}]',
        '["Bachelor degree in any discipline", "Minimum 50% marks in graduation", "Entrance Exam (CAT / MAT / OJEE / XAT)", "Group Discussion & Personal Interview (GD/PI)"]'
    ),
    (
        3,
        'bsc',
        'Science',
        'B.Sc',
        'Bachelor of Science',
        4.2,
        120,
        '🔬 Research Focused',
        'B.Sc is a 3-year undergraduate program focusing on scientific theories, experiments, and research methodologies.',
        'Bachelor of Science (B.Sc) programs provide a solid foundation in natural sciences, mathematics, or specialized scientific disciplines. It fosters analytical, problem-solving, and scientific inquiry skills, preparing students for research, industry roles, or advanced studies.',
        '₹ 15,000 - 50,000',
        '[{"icon": "🔬", "desc": "Conduct laboratory experiments and support scientific research.", "title": "Research Assistant"}, {"icon": "🧪", "desc": "Operate and maintain laboratory equipment and analyze samples.", "title": "Lab Technician"}, {"icon": "📊", "desc": "Process and analyze scientific or business data.", "title": "Data Analyst"}, {"icon": "🌱", "desc": "Advise on environmental sustainability and compliance.", "title": "Environmental Consultant"}, {"icon": "💡", "desc": "Write research papers, reports, and educational material.", "title": "Scientific Writer"}, {"icon": "•••", "desc": "Teach science subjects in schools or colleges.", "title": "And Many More"}]',
        '["10+2 with Science stream (PCM / PCB)", "Minimum 45% to 50% aggregate marks", "Merit-based admission or university entrance test"]'
    ),
    (
        4,
        'bca',
        'Computer Applications',
        'BCA',
        'Bachelor of Computer Applications',
        4.4,
        150,
        '💻 Coding & IT',
        'BCA is a 3-year undergraduate program covering computer programming, software development, and database systems.',
        'The Bachelor of Computer Applications (BCA) is a popular degree for students interested in software development, web development, and information technology. It covers database management, software engineering, networking, and programming languages.',
        '₹ 30,000 - 80,000',
        '[{"icon": "💻", "desc": "Design and write code for software applications.", "title": "Software Developer"}, {"icon": "🌐", "desc": "Create and maintain responsive websites.", "title": "Web Developer"}, {"icon": "📱", "desc": "Build iOS and Android applications.", "title": "Mobile App Developer"}, {"icon": "🗄️", "desc": "Organize, secure, and manage database systems.", "title": "Database Administrator"}, {"icon": "🛠️", "desc": "Analyze and design IT systems for organizations.", "title": "System Analyst"}, {"icon": "•••", "desc": "Set up and manage computer network infrastructure.", "title": "And Many More"}]',
        '["10+2 with Mathematics / Computer Science as a subject", "Minimum 45% to 50% aggregate marks", "Direct admission based on merit or entrance exam"]'
    ),
    (
        5,
        'bpharm',
        'Pharmacy',
        'B.Pharm',
        'Bachelor of Pharmacy',
        4.3,
        95,
        '💊 Healthcare & Medical',
        'B.Pharm is a 4-year undergraduate program focusing on pharmaceutical sciences, drug design, and healthcare industry.',
        'The Bachelor of Pharmacy (B.Pharm) is a professional undergraduate degree in the field of pharmacy. It teaches students about manufacturing medicines, dosage formulation, pharmacology, drug analysis, and patient counseling.',
        '₹ 50,000 - 1,20,000',
        '[{"icon": "💊", "desc": "Dispense medications and advise patients in pharmacies or hospitals.", "title": "Pharmacist"}, {"icon": "🧪", "desc": "Monitor pharmaceutical safety, quality, and standards compliance.", "title": "Drug Inspector"}, {"icon": "🔬", "desc": "Help research and synthesize new drug compounds.", "title": "Research & Development"}, {"icon": "🏭", "desc": "Verify safety and quality during medicine manufacturing.", "title": "Quality Control Chemist"}, {"icon": "💼", "desc": "Promote and sell pharmaceutical products to doctors.", "title": "Medical Representative"}, {"icon": "•••", "desc": "Oversee clinical trials and gather medical data.", "title": "And Many More"}]',
        '["10+2 with Physics, Chemistry, and Biology/Mathematics", "Minimum 50% aggregate marks", "Entrance Exam (OJEE / NEET)"]'
    ),
    (
        6,
        'diploma',
        'Engineering & Tech',
        'Diploma',
        'Polytechnic Diploma',
        4.1,
        210,
        '⚡ Practical & Skill-Based',
        'A 3-year technical program providing practical engineering skills for early entry into the industry.',
        'Polytechnic Diploma programs focus on technical skills and hands-on laboratory experiences. It is ideal for students who want a career in engineering fields quickly or plan to enter B.Tech programs through lateral entry.',
        '₹ 10,000 - 30,000',
        '[{"icon": "🛠️", "desc": "Assist in engineering design, maintenance, and testing.", "title": "Junior Engineer"}, {"icon": "🏗️", "desc": "Manage physical construction sites and safety protocols.", "title": "Site Supervisor"}, {"icon": "⚙️", "desc": "Repair, install, and calibrate industrial machinery.", "title": "Technician"}, {"icon": "✍️", "desc": "Create detailed technical drawing plans using CAD tools.", "title": "CAD Draftsman"}, {"icon": "🏢", "desc": "Explain technical product benefits to potential clients.", "title": "Technical Sales Executive"}, {"icon": "•••", "desc": "Perform regular checks on factory and facility systems.", "title": "And Many More"}]',
        '["Class 10th (Matriculation) with Science and Mathematics", "Minimum 35% aggregate marks", "Seat allocation based on merit or Diploma Entrance Exam (DET)"]'
    ),
    (
        7,
        'bed',
        'Education',
        'B.Ed',
        'Bachelor of Education',
        4.3,
        80,
        '🏫 Teaching Career',
        'B.Ed is a 2-year professional undergraduate degree that prepares students for teaching careers in schools.',
        'The Bachelor of Education (B.Ed) is a professional degree that qualifies graduates to teach in secondary and senior secondary schools. The curriculum covers teaching methodology, child development, classroom management, and teaching practice.',
        '₹ 25,000 - 60,000',
        '[{"icon": "🏫", "desc": "Teach subjects in primary, secondary, or senior secondary schools.", "title": "School Teacher"}, {"icon": "💡", "desc": "Provide guidance and support to students on academic matters.", "title": "Education Counselor"}, {"icon": "📚", "desc": "Create school curricula, lesson plans, and textbooks.", "title": "Content Developer"}, {"icon": "💻", "desc": "Teach courses and webinars through digital platforms.", "title": "Online Educator"}, {"icon": "✏️", "desc": "Offer individual or group academic assistance.", "title": "Private Tutor"}, {"icon": "•••", "desc": "Manage school activities, schedules, and operations.", "title": "And Many More"}]',
        '["Bachelor or Master degree in any stream (Science, Commerce, Arts)", "Minimum 50% to 55% aggregate marks in graduation", "State level B.Ed Entrance Exam"]'
    ),
    (
        8,
        'ba',
        'Arts & Humanities',
        'BA',
        'Bachelor of Arts',
        4.0,
        90,
        '🎨 Creative & Social',
        'BA is a 3-year undergraduate program focusing on social sciences, literature, history, and languages.',
        'The Bachelor of Arts (BA) program covers a wide spectrum of subjects in humanities and social sciences. It offers flexibility to specialize in fields like English, History, Economics, Geography, or Sociology, developing critical thinking and communication skills.',
        '₹ 10,000 - 30,000',
        '[{"icon": "✍️", "desc": "Write articles, blogs, and marketing copy for businesses.", "title": "Content Writer"}, {"icon": "🏛️", "desc": "Prepare and take exams to work in government administration.", "title": "Civil Services"}, {"icon": "📢", "desc": "Build and manage relationships with public media.", "title": "Public Relations Specialist"}, {"icon": "📰", "desc": "Research, write, and present news stories and reports.", "title": "Journalist"}, {"icon": "🎨", "desc": "Work on art history, design, or gallery coordination.", "title": "Creative Designer"}, {"icon": "•••", "desc": "Help people solve issues in communities.", "title": "And Many More"}]',
        '["10+2 in any stream (Arts, Science, Commerce)", "Minimum 40% to 45% aggregate marks", "Direct admission based on merit"]'
    ),
    (
        9,
        'mtech',
        'Engineering',
        'M.Tech',
        'Master of Technology',
        4.5,
        140,
        '🔬 Advanced Tech',
        'M.Tech is a 2-year postgraduate program offering advanced engineering and research-oriented specializations.',
        'Master of Technology (M.Tech) is a postgraduate degree program designed to provide in-depth specialization in specific engineering disciplines. It focuses on research, advanced analytics, and technological development.',
        '₹ 50,000 - 1,20,000',
        '[{"icon": "💼", "desc": "Design and lead structural and technical system designs.", "title": "Software Architect"}, {"icon": "🔬", "desc": "Conduct research and development in engineering fields.", "title": "Research Scientist"}, {"icon": "⚙️", "desc": "Design and manage complex industrial systems.", "title": "Systems Engineer"}, {"icon": "👥", "desc": "Manage tech teams and project milestones.", "title": "Project Lead"}, {"icon": "•••", "desc": "Explore roles in advanced manufacturing and research.", "title": "And Many More"}]',
        '["B.Tech/B.E. or equivalent degree", "Minimum 55% aggregate marks", "Entrance Exam (GATE / OJEE)"]'
    ),
    (
        10,
        'mbbs',
        'Medical',
        'MBBS',
        'Bachelor of Medicine and Bachelor of Surgery',
        4.9,
        320,
        '🩺 Elite Profession',
        'MBBS is a 5.5-year professional undergraduate medical degree incorporating hospital internships.',
        'The Bachelor of Medicine and Bachelor of Surgery (MBBS) is the primary professional degree in medicine. It trains students in diagnostic, surgical, and therapeutic medical practices, culminating in a mandatory one-year residency/internship.',
        '₹ 1,50,000 - 6,00,000',
        '[{"icon": "🩺", "desc": "Diagnose and treat general health issues in hospitals or clinics.", "title": "General Physician"}, {"icon": "🔪", "desc": "Perform operations and surgical treatments.", "title": "Surgeon"}, {"icon": "🏢", "desc": "Advise hospitals on healthcare policies and management.", "title": "Medical Consultant"}, {"icon": "👶", "desc": "Treat child illnesses and manage child health.", "title": "Pediatrician"}, {"icon": "•••", "desc": "Manage medical departments and healthcare facilities.", "title": "And Many More"}]',
        '["10+2 with Physics, Chemistry, and Biology (PCB)", "Minimum 50% aggregate marks", "Entrance Exam (NEET UG)"]'
    ),
    (
        11,
        'msc',
        'Science',
        'M.Sc',
        'Master of Science',
        4.3,
        110,
        '🧪 Research Focused',
        'M.Sc is a 2-year postgraduate program specializing in scientific theories and practical experiments.',
        'The Master of Science (M.Sc) is a postgraduate academic degree awarded for studies in science and technology. It focuses on research-oriented advanced theory and practical laboratory work.',
        '₹ 20,000 - 80,000',
        '[{"icon": "🔬", "desc": "Conduct laboratory experiments and support research.", "title": "Senior Researcher"}, {"icon": "🧪", "desc": "Manage and operate laboratory environments and teams.", "title": "Lab Director"}, {"icon": "📊", "desc": "Analyze and interpret complex scientific data.", "title": "Data Analyst"}, {"icon": "🏭", "desc": "Oversee standards and quality checking in industries.", "title": "Quality Control Manager"}, {"icon": "•••", "desc": "Teach science subjects in schools or higher institutions.", "title": "And Many More"}]',
        '["B.Sc or equivalent undergraduate degree in relevant science stream", "Minimum 50% to 55% marks in graduation", "Merit-based or university entrance exam"]'
    ),
    (
        12,
        'phd',
        'Science',
        'Ph.D',
        'Doctor of Philosophy',
        4.8,
        75,
        '🎓 Highest Degree',
        'Ph.D is a 3 to 5-year doctoral research program culminating in a thesis defense.',
        'A Doctor of Philosophy (Ph.D) is the highest academic degree awarded by universities. It requires independent original research, publication of papers, and writing a comprehensive doctoral thesis.',
        '₹ 30,000 - 1,50,000',
        '[{"icon": "🏫", "desc": "Teach and conduct academic research in universities.", "title": "Professor"}, {"icon": "🔬", "desc": "Lead research labs and seek grant funding for projects.", "title": "Principal Investigator"}, {"icon": "💡", "desc": "Provide expert advice to corporations or governments.", "title": "Senior Consultant"}, {"icon": "🏢", "desc": "Manage and direct scientific research initiatives.", "title": "Research Director"}, {"icon": "•••", "desc": "Analyze and draft public or private sector policies.", "title": "And Many More"}]',
        '["Master degree in relevant discipline", "Minimum 55% aggregate marks", "Entrance Exam (UGC NET / CSIR NET / University Written Test)"]'
    ),
    (
        13,
        'e-master',
        'Management',
        'E-Master',
        'Executive Master Program',
        4.4,
        60,
        '💼 For Professionals',
        'E-Master is a flexible 1 to 2-year postgraduate program designed for working professionals.',
        'Executive Master Programs are specialized degrees targeted at working executives seeking advanced professional and technical skills without leaving their careers. Classes are typically online or hybrid.',
        '₹ 1,50,000 - 3,50,000',
        '[{"icon": "🏢", "desc": "Lead business units and divisions.", "title": "Director"}, {"icon": "💼", "desc": "Manage high-level operations and corporate teams.", "title": "Senior Manager"}, {"icon": "⚙️", "desc": "Optimize supply chains and business processes.", "title": "Operations Lead"}, {"icon": "💡", "desc": "Provide advisory services for corporate growth.", "title": "Business Consultant"}, {"icon": "•••", "desc": "Hold leadership titles in executive management.", "title": "And Many More"}]',
        '["Graduation in any discipline", "Minimum 2+ years of relevant professional work experience", "Interview and profile screening"]'
    ),
    (
        14,
        'btech-mtech-dual-degree',
        'Engineering',
        'B.Tech & M.Tech Dual Degree',
        'Integrated B.Tech and M.Tech',
        4.5,
        90,
        '⚙️ Integrated Path',
        'A 5-year integrated program awarding both Bachelor\'s and Master\'s degrees in engineering.',
        'The Integrated Dual Degree program allows students to complete both B.Tech and M.Tech in 5 years, saving one academic year. It offers a seamless transition from foundational to advanced specialization subjects.',
        '₹ 80,000 - 1,80,000',
        '[{"icon": "⚙️", "desc": "Manage engineering designs and technical processes.", "title": "Lead Engineer"}, {"icon": "🔬", "desc": "Perform research and innovation tasks in tech firms.", "title": "R&D Specialist"}, {"icon": "📊", "desc": "Analyze tech systems and advise on optimization.", "title": "Systems Analyst"}, {"icon": "💡", "desc": "Advise industries on implementing new technologies.", "title": "Technology Consultant"}, {"icon": "•••", "desc": "Access premium engineering and management roles.", "title": "And Many More"}]',
        '["10+2 with Physics, Chemistry, and Mathematics (PCM)", "Minimum 50% to 60% aggregate marks", "Entrance Exam (JEE Main / OJEE / Merit)"]'
    ),
    (
        15,
        'pg-medical',
        'Medical',
        'PG (Medical)',
        'Post Graduate Medical (DM/M.Ch)',
        4.9,
        40,
        '🌟 Super Specialty',
        'A 3-year advanced residency for medical doctor specialization and super-specialty training.',
        'Postgraduate Super Specialty Medical programs (DM / M.Ch) represent the highest level of clinical specialization in medicine and surgery, training doctors in specialized organs or disease areas.',
        '₹ 2,00,000 - 5,00,000',
        '[{"icon": "🫀", "desc": "Perform complex cardiac procedures and treatments.", "title": "Super Specialist Cardiologist"}, {"icon": "🧠", "desc": "Perform delicate brain and nervous system surgeries.", "title": "Neurosurgeon"}, {"icon": "💧", "desc": "Diagnose and treat urinary tract and kidney issues.", "title": "Urologist"}, {"icon": "🫁", "desc": "Perform digestive tract diagnostic and medical care.", "title": "Gastroenterologist"}, {"icon": "•••", "desc": "Provide specialized medical care for organ failures.", "title": "And Many More"}]',
        '["MBBS degree from a recognized university", "MD / MS or equivalent DNB qualification", "Entrance Exam (NEET SS)"]'
    ),
    (
        16,
        'md',
        'Medical',
        'MD',
        'Doctor of Medicine',
        4.8,
        85,
        '🏥 Clinical Specialty',
        'A 3-year postgraduate medical degree focusing on non-surgical clinical specializations.',
        'Doctor of Medicine (MD) is a postgraduate degree program in medicine. It trains MBBS graduates in advanced diagnosis, pharmacology, and therapeutic care for specific specialties like pediatrics or internal medicine.',
        '₹ 1,00,000 - 5,00,000',
        '[{"icon": "🏥", "desc": "Provide specialized clinical diagnostics and treatment.", "title": "Specialist Physician"}, {"icon": "🩺", "desc": "Consult patients on complex clinical cases.", "title": "Clinical Consultant"}, {"icon": "🧪", "desc": "Research drug actions and patient safety.", "title": "Pharmacologist"}, {"icon": "🏫", "desc": "Teach medical students at medical universities.", "title": "Medical Faculty"}, {"icon": "•••", "desc": "Lead clinical trials and hospital medicine programs.", "title": "And Many More"}]',
        '["MBBS degree from a NMC recognized medical college", "Completion of compulsory rotating internship", "Entrance Exam (NEET PG)"]'
    ),
    (
        17,
        'ms',
        'Medical',
        'MS',
        'Master of Surgery',
        4.8,
        80,
        '🔪 Surgical Expert',
        'A 3-year postgraduate surgical specialty degree for operating and patient care.',
        'Master of Surgery (MS) is a postgraduate qualification in surgery. It trains medical graduates in advanced surgical procedures, operations, trauma care, and post-operative recovery.',
        '₹ 1,00,000 - 5,00,000',
        '[{"icon": "🦴", "desc": "Perform bone, joint, and ligament surgeries.", "title": "Orthopedic Surgeon"}, {"icon": "🔪", "desc": "Perform abdominal and general surgeries.", "title": "General Surgeon"}, {"icon": "👂", "desc": "Perform surgeries on ear, nose, and throat.", "title": "ENT Specialist"}, {"icon": "🤰", "desc": "Manage high-risk pregnancies and perform C-sections.", "title": "Obstetrician & Gynecologist"}, {"icon": "•••", "desc": "Treat acute emergency surgical cases.", "title": "And Many More"}]',
        '["MBBS degree from a NMC recognized medical college", "Completion of compulsory rotating internship", "Entrance Exam (NEET PG)"]'
    ),
    (
        18,
        'allied-medical-courses',
        'Medical',
        'Allied Medical Courses',
        'Allied Health Sciences',
        4.1,
        130,
        '🧬 Healthcare Support',
        'Various 2 to 3-year medical technology programs support laboratory, radiology, and operation theatres.',
        'Allied Medical and Health Science courses train technicians and technologists who support the medical ecosystem, from operating diagnostic machinery like MRI to managing blood banks and laboratories.',
        '₹ 20,000 - 60,000',
        '[{"icon": "🧪", "desc": "Analyze samples and report diagnostic values.", "title": "Lab Technologist"}, {"icon": "📸", "desc": "Operate X-Ray, CT, and MRI machines.", "title": "Radiology Technician"}, {"icon": "🏥", "desc": "Set up operation theatres and assist surgeons.", "title": "OT Technician"}, {"icon": "🩸", "desc": "Support patients undergoing renal dialysis.", "title": "Dialysis Assistant"}, {"icon": "•••", "desc": "Operate and capture electrocardiogram signals.", "title": "And Many More"}]',
        '["10+2 with Science stream (PCB / PCM)", "Minimum 45% aggregate marks", "Merit-based admission"]'
    ),
    (
        19,
        'mca',
        'Computer Applications',
        'MCA',
        'Master of Computer Applications',
        4.5,
        140,
        '💻 Advanced Software',
        'MCA is a 2-year postgraduate program covering advanced computer networks, software engineering, and database systems.',
        'The Master of Computer Applications (MCA) program provides advanced instruction in software development, web technologies, database administration, and system design, preparing students for high-level technical roles.',
        '₹ 40,000 - 1,00,000',
        '[{"icon": "💻", "desc": "Create robust desktop and enterprise software solutions.", "title": "Software Engineer"}, {"icon": "🛠️", "desc": "Design and evaluate information systems for firms.", "title": "System Analyst"}, {"icon": "🗄️", "desc": "Secure, optimize, and manage enterprise databases.", "title": "Database Administrator"}, {"icon": "🌐", "desc": "Architect full stack websites and web services.", "title": "Web Architect"}, {"icon": "•••", "desc": "Develop secure Android and iOS mobile applications.", "title": "And Many More"}]',
        '["Graduation in BCA/B.Sc CS/IT or equivalent", "Passed Mathematics at 10+2 or graduation level", "Entrance Exam (OJEE / NIMCET)"]'
    );

-- --------------------------------------------------------

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `full_name` varchar(255) NOT NULL,
    `phone` varchar(50) NOT NULL,
    `courses` text DEFAULT NULL,
    `colleges` text DEFAULT NULL,
    `location` varchar(255) DEFAULT NULL,
    `guidance` varchar(10) DEFAULT 'yes',
    `status` varchar(50) DEFAULT 'New',
    `created_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) UNIQUE,
    `setting_value` TEXT,
    `created_at` DATETIME,
    `created_by` INT,
    `updated_at` DATETIME,
    `updated_by` INT,
    `is_status` TINYINT DEFAULT 1
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO
    `settings` (
        `setting_key`,
        `setting_value`,
        `created_at`,
        `is_status`
    )
VALUES (
        'support_phone',
        '+919114422555',
        NOW(),
        1
    ),
    (
        'support_message',
        ' +919114422555',
        NOW(),
        1
    ),
    (
        'support_email',
        'support@admissionodisha.in',
        NOW(),
        1
    );

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;