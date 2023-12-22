const knex = require('knex')({
    client: 'pg',
    connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
    },
    pool: {
        min: 2,
        max: 10,
    },
    ssl: { rejectUnauthorized: false }
});

module.exports = knex;