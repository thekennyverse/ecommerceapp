
-- delete table
-- DROP TABLE users;

-- create table
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  address VARCHAR(50),
  city VARCHAR(50),
  country VARCHAR(50),
  postal_code VARCHAR(50),
  created_at DATE
);


-- insert into table
INSERT INTO users ( username, email, password_hash, full_name, address, city, country, postal_code, created_at) VALUES
(
  'cloud7', 
  'cloud@gmail.com', 
  'abc', 
  'Cloud Strife', 
  null,
  null, 
  null, 
  null, 
  null
);

-- select everything
SELECT * FROM users;


