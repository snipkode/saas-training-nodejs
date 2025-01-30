ALTER TABLE payments
  ADD COLUMN transaction_token VARCHAR(255) AFTER payment_status,
  ADD COLUMN payment_type VARCHAR(50) AFTER transaction_token;
