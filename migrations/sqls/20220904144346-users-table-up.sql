CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(64), firstName VARCHAR(64) NOT NULL, lastName VARCHAR(64), password text NOT NULL);