const _ = require("lodash");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
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
            unique: true,
            trim: true,
            lowercase: true,
            validate: [(v) => validator.isEmail(v), "Please enter valid email-id"]
        },
        password: {
            type: String,
            required: [true, "password must be required"],
            trim: true,
            validate: [(v) => validator.isStrongPassword(v), "Password is not enough strong"]
        },
        phoneNo: {
            type: String,
            required: [true, "phoneNo must be required"],
            trim: true,
            validate: [(v) => validator.isMobilePhone(v, "en-IN"), "Please enter valid phoneNo"]
        },
        address: {
            type: String,
            required: [true, "address must be required"],
            trim: true,
            validate: [(v) => validator.matches(v, /^[\w|\s]+$/gi), "Please enter valid address"]
        },
        city: {
            type: String,
            required: [true, "city must be required"],
            trim: true,
            validate: [(v) => validator.isAlpha(v, "en-IN"), "please enter valid city name"]
        },
        state: {
            type: String,
            required: [true, "state must be required"],
            trim: true,
            validate: [(v) => validator.isAlpha(v, "en-IN"), "please enter valid state name"]
        },
        country: {
            type: String,
            required: [true, "country must be required"],
            trim: true,
            validate: [(v) => validator.isAlpha(v, "en-IN"), "please enter valid country name"]
        },
        postalCode: {
            type: String,
            required: [true, "postalCode must be required"],
            trim: true,
            validate: [(v) => validator.isPostalCode(v, "IN"), "Please enter valid postalCode"]
        }
    },
    { timestamps: true }
);

customerSchema.methods.toJSON = function () {
    const admin = _.pick(this, [
        "_id",
        "name",
        "email",
        "phoneNo",
        "address",
        "city",
        "state",
        "country",
        "postalCode",
        "createdAt",
        "updatedAt"
    ]);
    return admin;
};

//? Access token generator
customerSchema.methods.generateAccessToken = function (maxAge) {
    const token = jwt.sign({ _id: this._id }, process.env.CUSTOMER_PRIVATE_KEY, {
        expiresIn: maxAge
    });
    return token;
};

//? Admin login function
customerSchema.statics.login = async (email, password) => {
    const customer = await Customer.findOne({ email });
    if (!customer) throw createError(400, "Unable to login. Please register first.");

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) throw createError(400, "Unable to login. Invalid password");

    return customer;
};

//? Encrypt the password
customerSchema.pre("save", async function (next) {
    this.isModified("password") && (this.password = await bcrypt.hash(this.password, 10));
    next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };
