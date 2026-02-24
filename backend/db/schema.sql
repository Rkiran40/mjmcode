-- Pratyaksha News Database Schema Example
-- Run this SQL to initialize the required tables for the backend.

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Add other tables as needed for gallery, videos, etc.

-- Insert default admin (change password after first login)
INSERT INTO admins (username, password) VALUES ('Pratyaksha', 'News@2026');
