USE admission_odisha;

-- 1. Insert Dummy Users
-- Admin User (Password: admin123)
-- Note: set verified_at to a recent time to keep it verified for 2 hours
INSERT INTO users (name, email, phone, password, city, is_verified, verified_at, is_admin, created_at, is_status) VALUES
('Admin User', '2004bshree@gmail.com', '9999999999', '$2y$12$WYcQKX5yLTWDkVWvmPL5TeWyaZincUyMhzvS9zJdIg3ltyjbU6qpm', 'Bhubaneswar', 1, NOW(), 1, NOW(), 1);

-- Regular Users
INSERT INTO users (name, email, phone, password, city, is_verified, verified_at, is_admin, created_at, is_status) VALUES
('Rohan Das', 'rohan@example.com', '9876543210', '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W', 'Cuttack', 1, NOW(), 0, NOW(), 1),
('Priya Mohanty', 'priya@example.com', '9876543211', '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W', 'Bhubaneswar', 1, NOW(), 0, NOW(), 1),
('Sourav Nayak', 'sourav@example.com', '9876543212', '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W', 'Puri', 1, NOW(), 0, NOW(), 1),
('Ananya Behera', 'ananya@example.com', '9876543213', '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W', 'Sambalpur', 1, NOW(), 0, NOW(), 1),
('Bikash Patra', 'bikash@example.com', '9876543214', '$2y$10$7R/0W7W2W5W5W5W5W5W5W.5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W', 'Balasore', 1, NOW(), 0, NOW(), 1);

-- 2. Insert Dummy User Logins
INSERT INTO user_login (user_id, login_time, ip_address, device, browser, os, token, created_at) VALUES
(1, NOW(), '127.0.0.1', 'Desktop', 'Chrome', 'Windows', 'token_admin', NOW()),
(2, DATE_SUB(NOW(), INTERVAL 1 DAY), '127.0.0.1', 'Mobile', 'Safari', 'iOS', 'token_rohan', NOW()),
(3, DATE_SUB(NOW(), INTERVAL 2 DAY), '127.0.0.1', 'Desktop', 'Firefox', 'Linux', 'token_priya', NOW());

-- 3. Insert Dummy User Activity
INSERT INTO user_activity (user_id, field_id, specialization_id, course_id, activity_type, created_at) VALUES
(2, 1, 1, 1, 'Viewed Course', NOW()),
(3, 2, 17, NULL, 'Searched Specialization', NOW()),
(4, 3, 21, NULL, 'Viewed Field', NOW()),
(5, 1, 1, 1, 'Inquired', NOW());
