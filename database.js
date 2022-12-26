const Pool = require ('pg').Pool;

const pool = new Pool ({
    host: "localhost",
    user: "daffa",
    port: 5432,
    password: "",
    database: "restaurantdb"
})

module.exports = pool
