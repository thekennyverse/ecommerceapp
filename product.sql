CREATE TABLE Product (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100),
  genre VARCHAR(100),
  description TEXT,
  stock_quantity INTEGER NOT NULL,
  release_date DATE,
  picture_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  price DECIMAL (10, 2) NOT NULL
);

DROP TABLE Product;


INSERT INTO product (title, author, genre, description, price, stock_quantity, release_date, picture_url)
VALUES ('Demon Slayer', 'Mangaka A', 'Action, Fantasy', 'Tanjiro Kamado seeks revenge on demons after they slaughtered his family and turned his sister into one.', 12.99, 100, '2021-07-30', 'picture');

INSERT INTO product (title, author, genre, description, price, stock_quantity, release_date, picture_url)
VALUES ('One Piece', 'Mangaka B', 'Adventure, Comedy', 'Monkey D. Luffy embarks on a journey to become the Pirate King and find the One Piece treasure.', 9.99, 150, '1997-07-22', 'picture');


SELECT * FROM product;