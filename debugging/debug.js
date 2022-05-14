const debug = require("debug");

const info = debug("info");
const error = debug("error");
const mongooseDebug = debug("mongoose");

module.exports = { info, error, mongooseDebug };