CREATE DATABASE saas_ai_subscription;
USE saas_ai_subscription;

-- Tabel Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Subscription Plans
CREATE TABLE subscription_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL COMMENT 'Price in IDR',
    prompt_limit INT NOT NULL,  -- Jumlah maksimal prompts
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel User Subscriptions
CREATE TABLE user_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE
);

-- Tabel AI Prompts Usage
CREATE TABLE ai_prompt_usage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prompt_text TEXT NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel Payments
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL COMMENT 'Amount in IDR',
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert Default Plans (Free & Paid)
INSERT INTO subscription_plans (name, price, prompt_limit) VALUES 
('Free Plan', 0.00, 5), 
('Basic Plan', 149000.00, 100), 
('Pro Plan', 299000.00, 500), 
('Enterprise Plan', 749000.00, 9999);

-- Insert Dummy Users
INSERT INTO users (name, email, password_hash) VALUES 
('Alice', 'alice@example.com', 'hashed_password_1'),
('Bob', 'bob@example.com', 'hashed_password_2'),
('Charlie', 'charlie@example.com', 'hashed_password_3');

-- Insert Dummy User Subscriptions
INSERT INTO user_subscriptions (user_id, plan_id, start_date, end_date, status) VALUES 
(1, 1, '2023-01-01', '2023-12-31', 'active'),
(2, 2, '2023-01-01', '2023-12-31', 'active'),
(3, 3, '2023-01-01', '2023-12-31', 'active');

-- Insert Dummy AI Prompt Usage
INSERT INTO ai_prompt_usage (user_id, prompt_text) VALUES 
(1, 'Prompt text 1 by Alice'),
(1, 'Prompt text 2 by Alice'),
(2, 'Prompt text 1 by Bob'),
(3, 'Prompt text 1 by Charlie'),
(3, 'Prompt text 2 by Charlie'),
(3, 'Prompt text 3 by Charlie');

-- Insert Dummy Payments
INSERT INTO payments (user_id, amount, payment_status) VALUES 
(1, 0.00, 'completed'),
(2, 149000.00, 'completed'),
(3, 299000.00, 'completed');

-- View jumlah penggunaan prompts per user
CREATE VIEW user_prompt_count AS
SELECT user_id, COUNT(*) AS total_prompts
FROM ai_prompt_usage
GROUP BY user_id;

-- Stored Procedure: Cek apakah user masih bisa menggunakan AI
DELIMITER $$
CREATE PROCEDURE CheckPromptLimit(IN userId INT)
BEGIN
    DECLARE user_plan INT;
    DECLARE prompt_count INT;
    
    SELECT plan_id INTO user_plan FROM user_subscriptions WHERE user_id = userId AND status = 'active';
    SELECT prompt_limit INTO prompt_count FROM subscription_plans WHERE id = user_plan;
    
    IF (SELECT COUNT(*) FROM ai_prompt_usage WHERE user_id = userId) >= prompt_count THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Prompt limit exceeded. Upgrade your plan.';
    END IF;
END$$
DELIMITER ;
