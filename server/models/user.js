const db = require('../../config/db');

const createUser = async (username, passwordHash) => {
    const result = await db.query(
        'insert into users(username, passwordhash, createdat) values($1, $2, Now()) Returning *',
        [username, passwordHash]
    )
    return result.rows[0];
};

const getUserByUsername = async (username) => {
    const result = await db.query(
        'select * from users where username = $1', [username]);
    return result.rows[0];
}

const findById = async (id) => {
    const res = await db.query(
        'select * from users where id = $1', [id]
    );
    return res.rows[0];
}

module.exports = { createUser, getUserByUsername, findById }