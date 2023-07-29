
-- delete table
-- DROP TABLE ecommerce_app;

-- create table
CREATE TABLE ecommerce_app (
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
INSERT INTO ecommerce_app ( username, email, password_hash, full_name, address, city, country, postal_code, created_at) VALUES
(
  'cloud7', 
  'cloud@gmail.com', 
  'lfkjfsdjfosdjflsdjflshulsdfhgiousdfhgisudfhiusdfguisdf', 
  'Cloud Strife', 
  null,
  null, 
  null, 
  null, 
  null
);

-- select everything
SELECT * FROM ecommerce_app;


