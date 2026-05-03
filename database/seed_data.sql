USE admission_odisha;

-- Insert Fields
INSERT INTO fields (name, short_desc, icon, created_at, is_status) VALUES
('Engineering & Technology', 'B.Tech, M.Tech, Diploma programs', 'fa-cogs', NOW(), 1),
('Medical & Health Sciences', 'MBBS, BDS, Pharmacy', 'fa-user-md', NOW(), 1),
('Management', 'BBA, MBA', 'fa-briefcase', NOW(), 1);

-- Insert Specializations (Assuming field_id 1 is Engineering, 2 is Medical)
INSERT INTO specializations (field_id, name, short_desc, created_at, is_status) VALUES
(1, 'Computer Science Engineering', 'Software, AI, and Networking', NOW(), 1),
(1, 'Mechanical Engineering', 'Machines, Manufacturing, and Design', NOW(), 1),
(2, 'MBBS', 'Bachelor of Medicine and Bachelor of Surgery', NOW(), 1);

-- Insert Colleges
INSERT INTO colleges (name, location, rating, created_at, is_status) VALUES
('Odisha University of Technology', 'Bhubaneswar', 4.5, NOW(), 1),
('Kalinga Institute of Medical Sciences', 'Bhubaneswar', 4.8, NOW(), 1),
('National Institute of Technology', 'Rourkela', 4.7, NOW(), 1);

-- Insert Courses (Assuming specialization 1 is CSE, 2 is Mech, 3 is MBBS)
INSERT INTO courses (specialization_id, name, duration, degree_level, created_at, is_status) VALUES
(1, 'B.Tech in Computer Science', '4 Years', 'Undergraduate', NOW(), 1),
(2, 'B.Tech in Mechanical', '4 Years', 'Undergraduate', NOW(), 1),
(3, 'MBBS General Medicine', '5.5 Years', 'Undergraduate', NOW(), 1);

-- Map Colleges to Courses (College 1 offers Course 1 & 2, etc.)
INSERT INTO college_courses (college_id, course_id, created_at, is_status) VALUES
(1, 1, NOW(), 1),
(1, 2, NOW(), 1),
(2, 3, NOW(), 1),
(3, 1, NOW(), 1);
