-- Drop database if it exists, then recreate it
-- Connect to maintenance database to be able to drop target DB
\c postgres

-- Terminate existing connections to the target database (if any)
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'test_db' AND pid <> pg_backend_pid();

-- Drop and recreate the database
DROP DATABASE IF EXISTS test_db;
CREATE DATABASE test_db OWNER postgres;
GRANT ALL PRIVILEGES ON DATABASE test_db TO postgres;

-- Connect to the (re)created database
\c test_db

-- Optional: create extensions
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Drop table if it exists, then recreate it
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS conversation_participants;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat tables
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversation_participants (
    conversation_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Instagram-like tables
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url VARCHAR(1024) NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_like UNIQUE (post_id, user_id)
);

-- E-commerce tables
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    image_url VARCHAR(1024) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_cart_item UNIQUE (user_id, product_id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed demo products (prices in cents)
INSERT INTO products (name, description, price, image_url) VALUES
('Wireless Headphones', 'Comfortable over-ear headphones with noise cancellation.', 5999, 'https://images.unsplash.com/photo-1518443874488-7ebd77a95c89?q=80&w=800&auto=format&fit=crop'),
('Smart Watch', 'Track your fitness and notifications on the go.', 12999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'),
('Mechanical Keyboard', 'Tactile keys for a satisfying typing experience.', 8999, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop'),
('USB-C Charger', 'Fast-charging 65W USB-C wall charger.', 2999, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=800&auto=format&fit=crop');

-- Log the initialization
SELECT 'Database test_db and ecommerce tables initialized successfully' AS status;