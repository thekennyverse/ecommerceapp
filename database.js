const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_app'
});


const findUserById = async (id) => {
    return db.any('SELECT * from ecommerce_app WHERE user_id=$1', id);
};

const findUserByUsername = async (username) => {
    return db.any('SELECT * from ecommerce_app WHERE username=$1', username);
};

const searchUsersByUsername = async (username) => {
    let users = db.any('SELECT * from ecommerce_app WHERE username LIKE $1', `%${username}%`);
    if (users.length === 0) users = db.any('SELECT * from ecommerce_app');
    return users;
};

const createUser = async (userData) => {
    const { username, email, password_hash, full_name, address, city, country, postal_code } = userData;
    const created_at = new Date();
    await db.any(`INSERT INTO ecommerce_app ( username, email, password_hash, full_name, address, city, country, postal_code, created_at) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [username.tolowerCase(), email, password_hash, full_name, address, city, country, postal_code, created_at]);
    return username;
}

const updateUser = async (userData) => {
    const { username, email, password_hash, full_name, address, city, country, postal_code, user_id } = userData;
    await db.any(`UPDATE ecommerce_app SET username = $1, email = $2, password_hash = $3, full_name = $4, address = $5, city = $6, country = $7, postal_code = $8 WHERE user_id = $9`,
    [username.toLowerCase(), email, password_hash, full_name, address, city, country, postal_code, user_id]);
    return username;
}

const deleteUserById = async (id) => {
    await db.any('DELETE FROM ecommerce_app WHERE user_id=$1', id);
    return "Deleted user with Id : "+ id;
};

module.exports = {
    findUserById,
    findUserByUsername,
    createUser,
    updateUser,
    deleteUserById,
    searchUsersByUsername
}

