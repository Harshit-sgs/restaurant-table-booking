const express = require("express");
const app = express();

require("express-async-errors");
require("./config/mongoose")(app);
require("./start/routes")(app);
