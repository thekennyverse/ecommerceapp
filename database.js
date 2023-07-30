const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_app'
});

module.exports = {
    db
}

