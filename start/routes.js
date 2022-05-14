module.exports = (app) => {
    app.use(require("express").json());
    app.use(require("cookie-parser")());
    app.use("/customer", require("../routes/customer.routes"));
    app.use("/restaurant", require("../routes/restaurant.routes"));
    app.use("/admin", require("../routes/admin.routes"));
    app.use(require("../middleware/errors"));
};
