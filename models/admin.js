const _ = require("lodash");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

//? Admin model
const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name must be required"],
            trim: true,
            validate: [(v) => validator.matches(v, /^[a-z|\s]+$/gi), "Please enter valid name"]
        },
        email: {
            type: String,
            required: [true, "email must be required"],
            lowercase: true,
            unique: true,
            trim: true,
            validate: [(v) => validator.isEmail(v), "Please enter valid email-id"]
        },
        password: {
            type: String,
            required: [true, "password must be required"],
            trim: true,
            validate: [(v) => validator.isStrongPassword(v), "Password is not enough strong"]
        },

        mobile: {
            type: String,
            trim: true,
            validate: [(v) => validator.isMobilePhone(v, "en-IN"), "Please enter valid mobile no"]
        }
    },
    { timestamps: true }
);

adminSchema.methods.toJSON = function () {
    const admin = _.pick(this, ["_id", "name", "email", "mobile", "createdAt", "updatedAt"]);
    return admin;
};

//? Access token generator
adminSchema.methods.generateAccessToken = function (maxAge) {
    const token = jwt.sign({ _id: this._id }, process.env.ADMIN_PRIVATE_KEY, {
        expiresIn: maxAge
    });
    return token;
};

//? Admin login function
adminSchema.statics.login = async (email, password) => {
    const admin = await Admin.findOne({ email });
    if (!admin) throw createError(400, "Unable to login. Please register first.");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw createError(400, "Unable to login. Invalid password");

    return admin;
};

//? Encrypt the password
adminSchema.pre("save", async function (next) {
    this.isModified("password") && (this.password = await bcrypt.hash(this.password, 10));
    next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
