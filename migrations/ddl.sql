CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255) DEFAULT NULL,
  balance BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  banner_name VARCHAR(255) NOT NULL,
  banner_image VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_code VARCHAR(50) UNIQUE NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_icon VARCHAR(255) NOT NULL,
  service_tariff BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  service_id UUID REFERENCES services(id) DEFAULT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  total_amount BIGINT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);