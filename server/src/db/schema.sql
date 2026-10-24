-- ============================================
-- Bake 'n' More - PostgreSQL Production Schema
-- ============================================

-- 1. Users Table (Admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price VARCHAR(50) DEFAULT 'Price on request',
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_veg BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Custom Cake Inquiries Table
CREATE TABLE IF NOT EXISTS cake_inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  event_date VARCHAR(50),
  occasion VARCHAR(80),
  flavour VARCHAR(80),
  design TEXT,
  budget VARCHAR(80),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, confirmed, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT,
  total_amount NUMERIC(10, 2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'pending', -- pending, preparing, out_for_delivery, delivered, cancelled
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, cod
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INT REFERENCES menu_items(id) ON DELETE SET NULL,
  item_name VARCHAR(150),
  quantity INT DEFAULT 1,
  price NUMERIC(10, 2) DEFAULT 0.00
);

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread', -- unread, read, replied
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Categories
INSERT INTO categories (id, name, slug, sort_order, is_active) VALUES
  (1, 'Cakes', 'cakes', 1, TRUE),
  (2, 'Pastries', 'pastries', 2, TRUE),
  (3, 'Pizzas', 'pizzas', 3, TRUE),
  (4, 'Burgers & Rolls', 'burgers', 4, TRUE),
  (5, 'Sandwiches', 'sandwiches', 5, TRUE),
  (6, 'Noodles & South Indian', 'noodles-south-indian', 6, TRUE),
  (7, 'Combos & Offers', 'combos', 7, TRUE)
ON CONFLICT (id) DO NOTHING;
