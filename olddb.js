
/* This code is importing the `Client` class from the 'pg' module and creating a new instance of the
`Client` class. The `Client` class is used to connect to a PostgreSQL database. The `new Client()`
constructor takes an object as an argument, which specifies the connection details such as the host,
database name, and user. In this case, it is connecting to a PostgreSQL database running on the
localhost with the database name 'ecommerce_app' and the user 'postgres'. */
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'ecommerce_app', // created in Beekeeper
  user: 'postgres',
  // ...
})

client.connect();


module.exports = {
  initDb: async() => {
    await client.connect();
  }
}