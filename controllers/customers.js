const createError = require("http-errors");
const { Customer } = require("../models/customer");
const MAX_AGE = 60 * 60 * 24;

module.exports.registerCustomer = async (req, res) => {
    const customer = new Customer(req.body);
    await customer.save();

    const token = customer.generateAccessToken(MAX_AGE);

    res.cookie("customerToken", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(201).send(customer);
};

module.exports.loginCustomer = async (req, res) => {
    const customer = await Customer.login(req.body.email, req.body.password);
    const token = customer.generateAccessToken(MAX_AGE);

    res.cookie("customerToken", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.send(customer);
};

module.exports.logoutCustomer = (req, res) => {
    res.cookie("customerToken", "", { httpOnly: true, maxAge: 1 });
    res.send("Logout Customer");
};

module.exports.getCustomer = (req, res) => {
    res.send(req.customer);
};

module.exports.getAllCustomer = async (req, res) => {
    const customers = await Customer.find();
    if (Array.isArray(customers) && !customers.length) throw createError(404, "Customers not found");

    res.send(customers);
};

module.exports.updateCustomer = async (req, res) => {
    const key = Object.keys(req.body);

    key.forEach((key) => (req.customer[key] = req.body[key]));
    await req.customer.save();

    res.status(202).send(req.customer);
};

module.exports.deleteCustomer = async (req, res) => {
    await req.customer.remove();

    res.cookie("customerToken", "", { httpOnly: true, maxAge: 1 });
    res.send(req.customer);
};

module.exports.deleteCustomerByAdmin = async (req, res) => {
    const customer = await Customer.findOneAndRemove({ email: req.body.email });
    if (!customer) throw createError(404, "Customer not found with this Email-id");

    res.send(customer);
};
