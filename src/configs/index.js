const db = require("./database.config");
const appConfig = require("./app.config");

module.exports = {
    ...appConfig,
    ...db
}