const createError = require("http-errors");
const { Package } = require("../models/package");

module.exports.addPackage = async (req, res) => {
    let packages = await Package.find();
    if (packages.length === 3) throw createError(400, "Maximum Packages already exists");

    for (let i = 0; i < packages.length; i++) {
        if (packages[i].name === req.body.name) throw createError(400, "Package is already Added");
    }

    const package = new Package(req.body);
    await package.save();

    res.status(201).send(package);
};

module.exports.getPackage = async (req, res) => {
    const packages = await Package.find();
    if (Array.isArray(packages) && !packages.length) throw createError(404, "Packages not found");

    res.send(packages);
};

module.exports.updatePackage = async (req, res) => {
    const package = await Package.findByIdAndUpdate(
        req.body.id,
        { $set: { ...req.body } },
        { new: true, runValidators: true }
    );
    if (!package) throw createError(404, "Package not found with this id");

    res.send(package);
};

module.exports.deletePackage = async (req, res) => {
    const package = await Package.findByIdAndRemove(req.body.id);
    if (!package) throw createError(404, "Package not found with this id");

    res.send(package);
};
