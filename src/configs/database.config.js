"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

const mainDB = new Sequelize(process.env.DB_NAME, null, null, {
    dialect: 'postgres',
    logging: false,
    timezone: '+07:00',
    replication: {
        read: [
            { host: process.env.DB_HOST_READ, port: process.env.DB_PORT_READ, username: process.env.DB_USER_READ, password: process.env.DB_PASS_READ }
        ],
        write: { host: process.env.DB_HOST_WRITE, port: process.env.DB_PORT_WRITE, username: process.env.DB_USER_WRITE, password: process.env.DB_PASS_WRITE }
    }
});

mainDB.authenticate().then(() => console.log(`[server] Connected to database ${DB_HOST}:${DB_PORT}`)).catch(() => console.error(`[server] Unable to connect to the database!`));

module.exports = {
    mainDB
}
