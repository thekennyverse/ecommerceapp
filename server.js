const express = require('express');
const server = express();
const DBUsers = require('./users');
const DBProducts = require('./products');
const session = require('express-session');
const port= 4000;

server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Add session middleware
server.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
  // other options
}));

// USERS
server.get("/userbyid/:id", async (req, res) => {
    const userId = Number(req.params.id);
    console.log(userId)
    const user = await DBUsers.findUserById(userId);
    res.send(user);
});

/* This code snippet is defining a route handler for the GET request to "/usersearch/:username". */
server.get("/user/search/:username", async (req, res) => {
    const username = req.params.username;
    const users = await DBUsers.searchUsersByUsername(username);
    res.send(users);
}); 

/* The code snippet is defining a route handler for the POST request to "/login". It is expecting the
request body to contain login data, which typically includes a username/email and password. */
server.post("/login", async (req, res) => {
    const loginData = req.body;
    const user = await DBUsers.loginUser(loginData);
    // authenticate and set user in session 
    if (user) {
        req.session.user = user;
        res.statusCode = 200;

        const result = {
            status: res.statusCode,
            message: "User has been found",
            data: user
        }
        res.send(result);

    } else {
        res.statusCode = 401;

        const result = {
            status: res.statusCode,
            message: "Incorrect credentials provided. Please provide correct username/email and password.",
            data: null
        }
        res.send(result);
    }
});

// Use middleware to protect routes  
server.get('/dashboard', (req, res) => {
    // show app
    const { user } = req.session;
  
    if (user) {
      res.statusCode = 200;
  
      const result = {
          status: res.statusCode,
          message: "User has been found",
          data: user
      }
      res.send(result);
  
    } else {
      res.statusCode = 404;
      const result = {
          status: res.statusCode,
          message: "User not found, Please log in",
          data: null
      }
      res.send(result);
    }
  });

  //Create user
server.post("/user", async (req, res) => {
    const userData = req.body;
    const username = await DBUsers.createUser(userData);
    const user = await DBUsers.findUserByUsername(username);
    res.send(user);
});

// Update user
server.patch("/user", async (req, res) => {
    const newUserData = req.body;
    if (newUserData.user_id == null) throw new Error("Need to provide a user_id in body")
    const originalUserData = await DBUsers.findUserById(newUserData.user_id);
    if(originalUserData.length === 0) throw new Error("No user_id with value " + newUserData.user_id);
    const updatedUser = {
        ...originalUserData[0],
        ...newUserData
    }
    console.log("NEW DATA", updatedUser)
    const username = await DBUsers.updateUser(updatedUser);
    const user = await DBUsers.findUserByUsername(username);
    res.send(user);
});

//Delete user
server.delete("/user/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const user = await DBUsers.deleteUserById(userId);
    res.send(user);
});

server.get('/logout', (req, res) => {
    // destroy session 
});
  
// PRODUCTS


server.listen(port, () => { console.log("server is running on port 4000");

}) // I made sure server is running correctly in the terminal


// product

// this should Get all products
server.get('/products/search/:title', async (req, res) => {
  const title = req.params.title;
  const products = await DBProducts.searchProductsByTitle(title);
  res.send(products);
});

server.get('/products/count/total', async (req, res) => {
  const count = await DBProducts.getProductCount();
  res.send({count: count});
});
  
// this should Get single product 
server.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = await DBProducts.getProductById(id);
  
  if (product) {
    res.send(product);
  } else {
    res.status(404).send('Product not found'); 
  }
});

// server.get('/products/populate/all', async (req, res) => {
//   const products = await DBProducts.populateProducts();
//   res.send(products);
// })
  
//   this should  Create product
server.post('/products', async (req, res) => {
  const product = req.body;
  const newProduct = await DBProducts.createProduct(product);
  res.status(201).send(newProduct); 
});

//    this should  Update product
server.put('/products/:id', async (req, res) => {
  // ...
});

// Delete product 
server.delete('/products/:id', async (req, res) => {
  // ... 
});


server.post('/cart/add', async (req, res) => {
  const { user_id, product_id } = req.body;
  const data = await DBProducts.addOneProduct(user_id, product_id);
  res.send(data)
})

server.post('/cart/remove', async (req, res) => {
  const { user_id, product_id } = req.body;
  const data = await DBProducts.removeOneProduct(user_id, product_id);
  res.send(data)
})

server.get('/cart/check/:id', async (req, res) => {
  const user_id = req.params.id;
  const data = await DBProducts.checkCart(user_id);
  res.send(data)
})

server.post('/cart/remove/all', async (req, res) => {
  const { user_id } = req.body;
  const data = await DBProducts.removeAllProducts(user_id);
  res.send(data)
})