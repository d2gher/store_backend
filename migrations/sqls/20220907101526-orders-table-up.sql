CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id) ON DELETE CASCADE, 
    status VARCHAR(8) DEFAULT 'active')