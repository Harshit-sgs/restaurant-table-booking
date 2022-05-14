const createError = require("http-errors");
const validator = require("validator");
const bcrypt = require("bcrypt");

module.exports.validId = async (req, res, next) => {
    if (!req.body.password) throw createError(400, "password required.");

    const isMatch = await bcrypt.compare(req.body.password, req.admin.password);
    if (!isMatch) throw createError(400, "Invalid password provided");

    if (!validator.isMongoId(req.body.id)) throw createError(400, "Invalid mongoDB id provided");
    next();
};

module.exports.validEmail = (req, res, next) => {
    if (!validator.isEmail(req.body.email)) throw createError(400, "Invalid email-id provided");
    next();
};

module.exports.validAdmin = async (req, res, next) => {
    if (req.body.password) {
        if (!req.body.oldPassword) throw createError(400, "oldPassword required to change password.");

        const isMatch = await bcrypt.compare(req.body.oldPassword, req.admin.password);
        if (!isMatch) throw createError(400, "Invalid password provided");
    }

    next();
};

module.exports.validCustomer = async (req, res, next) => {
    if (req.body.password) {
        if (!req.body.oldPassword) throw createError(400, "oldPassword required to change password.");

        const isMatch = await bcrypt.compare(req.body.oldPassword, req.customer.password);
        if (!isMatch) throw createError(400, "Invalid password provided");
    }

    next();
};

module.exports.validRestaurant = async (req, res, next) => {
    if (req.body.password) {
        if (!req.body.oldPassword) throw createError(400, "oldPassword required to change password.");

        const isMatch = await bcrypt.compare(req.body.oldPassword, req.restaurant.password);
        if (!isMatch) throw createError(400, "Invalid password provided");
    }

    next();
};
