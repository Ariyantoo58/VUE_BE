const models = require("./init-models");
const { mainDB } = require("@/configs/index");

module.exports = models(mainDB);
