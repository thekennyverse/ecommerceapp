

// async function loginUser(){

  
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const password_hash = password;
//     //hashing of the password

//     const host = "http://localhost:4000"
//     const url = host + "/login/"
//     const headers = {
//       'Content-Type': 'application/json'
//     };
//     const method = "POST";
//     const body = JSON.stringify({ username, password_hash });

//     const response = await fetch(url, {method, headers, body});
  
//     const data = await response.json();
//     console.log(data);
//     if (data) {
//       await fetch(`${host}/products/search?title=`)   // this needs to navigate back to my product.ejs
//       console.log("TEST")
//     }
//     else {
//       throw new Error("Invalid Credientials")
//     } 
//   };






// const bcrypt = require('bcrypt'); // Import the bcrypt library

// ...

async function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const host = "http://localhost:4000";
  const url = `${host}/login`;
  const headers = {
    'Content-Type': 'application/json'
  };
  const method = "POST";

  // Hash the password before sending it to the server
  // const hashedPassword = await hashPassword(password);
  const hashedPassword = password
  const body = JSON.stringify({ username, password_hash: hashedPassword });

  const response = await fetch(url, { method, headers, body });
  const data = await response.json();

  if (response.ok) {
    console.log("Login successful:", data);
    // Redirect to the correct product page after successful login
    window.location.href = `${host}/products/search?title=`;// Change to the actual product page endpoint
  } else {
    console.error("Login failed:", data.message);
  }
}

// async function hashPassword(password) {
//   const saltRounds = 10;
//   return await bcrypt.hash(password, saltRounds);
// }