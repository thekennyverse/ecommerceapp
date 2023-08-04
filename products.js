const axios = require('axios');
const DBUsers = require('./users');

const { db } = require('./database');

const searchProductsByTitle = async (title) => {
  if(title === "null") return db.any('SELECT * FROM Product'); 
  return db.any('SELECT * FROM product WHERE title ILIKE $1', `%${title}%`);
}


const getProductById = async (bookId) => {
  return db.oneOrNone('SELECT * FROM Product WHERE book_id = $1', bookId);
}

const getProductCount = async (bookId) => {
   const obj = await db.oneOrNone('SELECT COUNT(*) FROM Product');
   return Number(obj.count);
}

const createProduct = async (product) => {
  return db.one(
    'INSERT INTO Product (${this:name}) VALUES (${this:csv}) RETURNING *',
    product
  );
}

const updateProduct = async (bookId, product) => {
  return db.oneOrNone(
    'UPDATE Product SET ${this:name} WHERE book_id = $1 RETURNING *',
    [product, bookId]  
  );
}

const deleteProduct = async (bookId) => {
  return db.result('DELETE FROM Product WHERE book_id = $1', bookId);
}

function generateRandomPrice(min, max){
  return Number(`${Math.floor(Math.random() * (max - min + 1)) + min}.99`) ;
}

function generateRandomQuantity(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const populateProducts = async () => {
  const options = {
    method: 'GET',
    url: 'https://myanimelist.p.rapidapi.com/manga/top/all',
    headers: {
      'X-RapidAPI-Key': 'ecefb48a66msh6cd48e5eba90b66p1d2a41jsn1096e6a9fff5',
      'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    
    const products = response.data.map((manga) => {
      return {
        title: manga.title,
        author: null,
        genre: null,
        description: null,
        stock_quantity: generateRandomQuantity(0, 20),
        release_date: null,
        picture_url: manga.picture_url,
        created_at: null,
        price: generateRandomPrice(5, 15) 
      }
    })
    
    products.forEach(({title, author, genre, description, stock_quantity, release_date, picture_url, created_at, price}) => db.any(`INSERT INTO product (title, author, genre, description, stock_quantity, release_date, picture_url, created_at, price) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [title, author, genre, description, stock_quantity, release_date, picture_url, created_at, price]));

    return products;

  } catch (error) {
    console.error(error);
  }
};
// updateing
const addOneProduct = async (userId, bookId) => {
  await db.any(`INSERT INTO user_product (user_id, product_id) VALUES ($1, $2)`, [userId, bookId]);
  return checkCart(userId); // reading
}

const removeOneProduct = async (userId, bookId) => {   
  await db.any(`DELETE FROM user_product WHERE user_id = $1 AND product_id = $2`, [userId, bookId]);
  return checkCart(userId);
}
// removing all products 
const removeAllProducts = async (userId) => {  
  await db.any(`DELETE FROM user_product WHERE user_id = $1`, [userId]);
  return checkCart(userId);
}

const checkCart = async (userId) => {
  const data = await db.any(`SELECT * FROM users
  JOIN user_product ON users.user_id = user_product.user_id
  JOIN product ON user_product.product_id = product.book_id
  WHERE users.user_id = 1;`);

  const products = data.map((book) => {
    return {
      book_id: book.book_id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      stock_quantity: book.stock_quantity,
      release_date: book.release_date,
      picture_url: book.picture_url,
      price: book.price
    }
  });


  const user = data[0] || (await DBUsers.findUserById(userId))[0];

  const updatedUser = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    password_hash: user.password_hash,
    full_name: user.full_name,
    address: user.address,
    city: user.city,
    country: user.country,
    postal_code: user.postal_code,
    created_at: user.created_at,
    products: products || []
  }

  return updatedUser;
}


module.exports = {
  searchProductsByTitle,
  populateProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addOneProduct,
  removeOneProduct,
  removeAllProducts,
  checkCart,
  getProductCount
}