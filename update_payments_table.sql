ALTER TABLE payments
  ADD COLUMN order_id VARCHAR(255) NOT NULL AFTER user_id,
  ADD COLUMN transaction_token VARCHAR(255) AFTER payment_status,
  ADD COLUMN payment_type VARCHAR(50) AFTER transaction_token;
