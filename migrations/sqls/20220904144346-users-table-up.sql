CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(64) UNIQUE, 
    firstname VARCHAR(64) NOT NULL, 
    lastname VARCHAR(64), 
    password TEXT NOT NULL);