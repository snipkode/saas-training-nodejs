CREATE DATABASE saas_ai;
USE saas_ai;

-- Table Tenants
CREATE TABLE tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    domain VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table User Roles
CREATE TABLE user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name ENUM('admin', 'tenant', 'user') NOT NULL
);

-- Table Users (with tenant association and role)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL DEFAULT 3,
    role_id INT NOT NULL DEFAULT 3,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES user_roles(id) ON DELETE CASCADE
);

-- Table Subscription Plans
CREATE TABLE subscription_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL COMMENT 'Price in IDR',
    prompt_limit INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- Table User Subscriptions
CREATE TABLE user_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE
);

-- Table AI Prompts Usage
CREATE TABLE ai_prompt_usage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prompt_text TEXT NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table Payments
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL COMMENT 'Amount in IDR',
    payment_status ENUM('pending', 'completed', 'failed', 'success') DEFAULT 'pending',
    transaction_token VARCHAR(255),
    payment_type VARCHAR(50),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert Dummy Tenants
INSERT INTO tenants (name, domain) VALUES 
('Solusi Konsep Tech', 'solusikonsep.co.id'),
('Arkana Putra Tech', 'arkanaputra.co.id');

-- Insert User Roles
INSERT INTO user_roles (role_name) VALUES 
('admin'),
('tenant'),
('user');

-- Insert Dummy Users
INSERT INTO users (tenant_id, role_id, name, email, password_hash) VALUES 
(1, 1, 'Admin', 'admin@solusikonsep.co.id', '$2a$08$pNJM4VHy0IV4RH88Iok7p.3cYT314fwuYmSJ22DtRHNeP7bwO53i6'),
(1, 2, 'Tenant', 'tenant@solusikonsep.co.id', '$2a$08$pNJM4VHy0IV4RH88Iok7p.3cYT314fwuYmSJ22DtRHNeP7bwO53i6'),
(2, 3, 'User', 'user@arkanaputra.co.id', '$2a$08$pNJM4VHy0IV4RH88Iok7p.3cYT314fwuYmSJ22DtRHNeP7bwO53i6');

-- Insert Dummy Subscription Plans
INSERT INTO subscription_plans (tenant_id, name, price, prompt_limit) VALUES 
(1, 'Free Plan', 0.00, 5), 
(1, 'Basic Plan', 149000.00, 100), 
(2, 'Pro Plan', 299000.00, 500), 
(2, 'Enterprise Plan', 749000.00, 9999);

-- Insert Dummy User Subscriptions
INSERT INTO user_subscriptions (user_id, plan_id, start_date, end_date, status, created_date) VALUES 
(1, 1, '2023-01-01', '2023-12-31', 'active', CURRENT_TIMESTAMP),
(2, 2, '2023-01-01', '2023-12-31', 'active', CURRENT_TIMESTAMP),
(3, 3, '2023-01-01', '2023-12-31', 'active', CURRENT_TIMESTAMP);

-- Insert Dummy AI Prompt Usage
INSERT INTO ai_prompt_usage (user_id, prompt_text) VALUES 
(1, 'Prompt text 1 by Alice'),
(1, 'Prompt text 2 by Alice'),
(2, 'Prompt text 1 by Bob'),
(3, 'Prompt text 1 by Charlie'),
(3, 'Prompt text 2 by Charlie'),
(3, 'Prompt text 3 by Charlie');

-- Insert Dummy Payments
INSERT INTO payments (user_id, order_id, amount, payment_status, transaction_token, payment_type) VALUES 
(1, 'order-1', 0.00, 'completed', 'token-1', 'credit_card'),
(2, 'order-2', 149000.00, 'completed', 'token-2', 'bank_transfer'),
(3, 'order-3', 299000.00, 'completed', 'token-3', 'qris');

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
