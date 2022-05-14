const createError = require("http-errors");
const { Admin } = require("../models/admin");
const MAX_AGE = 60 * 60 * 24;

module.exports.registerAdmin = async (req, res) => {
    const admin = new Admin(req.body);
    await admin.save();

    const token = admin.generateAccessToken(MAX_AGE);

    res.cookie("adminToken", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(201).send(admin);
};

module.exports.loginAdmin = async (req, res) => {
    const admin = await Admin.login(req.body.email, req.body.password);
    const token = admin.generateAccessToken(MAX_AGE);

    res.cookie("adminToken", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.send(admin);
};

module.exports.logoutAdmin = (req, res) => {
    res.cookie("adminToken", "", { httpOnly: true, maxAge: 1 });
    res.send("Logout Admin");
};

module.exports.getAdmin = (req, res) => {
    res.send(req.admin);
};

module.exports.getAllAdmin = async (req, res) => {
    const admins = await Admin.find();
    if (Array.isArray(admins) && !admins.length) throw createError(404, "Admins not found");
    
    res.send(admins);
};

module.exports.updateAdmin = async (req, res) => {
    const key = Object.keys(req.body);

    key.forEach((key) => (req.admin[key] = req.body[key]));
    await req.admin.save();

    res.status(202).send(req.admin);
};

module.exports.deleteAdmin = async (req, res) => {
    await req.admin.remove();

    res.cookie("adminToken", "", { httpOnly: true, maxAge: 1 });
    res.send(req.admin);
};
