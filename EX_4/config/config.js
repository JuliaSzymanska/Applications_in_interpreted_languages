module.exports = {
    "username": "loggin",
    "password": "1234",
    "database": "Shop",
    "host": "localhost",
    "dialect": "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}