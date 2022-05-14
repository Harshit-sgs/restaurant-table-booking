const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/admin");
const { Customer } = require("../models/customer");
const { Restaurant } = require("../models/restaurant");

module.exports.authAdmin = async (req, res, next) => {
    const { adminToken } = req.cookies;
    if (!adminToken) throw createError(401, "Access denied.");

    const decoded = jwt.verify(adminToken, process.env.ADMIN_PRIVATE_KEY);

    const admin = await Admin.findById(decoded._id);
    if (!admin) throw createError(404, "Admin not found with this credentials.");

    req.admin = admin;
    next();
};

module.exports.authCustomer = async (req, res, next) => {
    const { customerToken } = req.cookies;
    if (!customerToken) throw createError(401, "Access denied.");

    const decoded = jwt.verify(customerToken, process.env.CUSTOMER_PRIVATE_KEY);

    const customer = await Customer.findById(decoded._id);
    if (!customer) throw createError(404, "Customer not found with this credentials.");

    req.customer = customer;
    next();
};

module.exports.authRestaurant = async (req, res, next) => {
    const { restaurantToken } = req.cookies;
    if (!restaurantToken) throw createError(401, "Access denied.");

    const decoded = jwt.verify(restaurantToken, process.env.RESTAURANT_PRIVATE_KEY);

    const restaurant = await Restaurant.findById(decoded._id);
    if (!restaurant) throw createError(404, "Restaurant not found with this credentials.");

    req.restaurant = restaurant;
    next();
};
