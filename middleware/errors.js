const { error } = require("../debugging/debug");

module.exports = (err, req, res, next) => {
    error(err.name, err.code, err.status);

    let temp = {};
    let message;

    if (err.name === "JsonWebTokenError") {
        err.status = 403;
        err.message = "Invalid token provided. Access denied.";
    }

    if (err.name === "ValidationError") {
        err.status = 400;

        for (let key in err.errors) {
            temp[key] = err.errors[key]["properties"].message;
        }

        message = { error: temp };
    } else {
        message = { error: err.message };
    }

    err.code === 11000 && ((err.status = 400), (message = { error: { email: "This email is already taken." } }));

    (err && res.status(err.status || 500).send(message)) || next();
};
