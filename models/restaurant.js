const _ = require("lodash");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name must be required"],
            trim: true,
            validate: [(v) => validator.matches(v, /^[a-z|\s]+$/gi), "Please enter valid restaurant name"]
        },
        email: {
            type: String,
            required: [true, "email must be required"],
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
        phoneNo: {
            type: String,
            required: [true, "phoneNo must be required"],
            trim: true,
            validate: [(v) => validator.isMobilePhone(v, "en-IN"), "Please enter valid phoneNo"]
        },
        address: {
            type: String,
            required: [true, "address must be reuired"],
            trim: true,
            validate: [(v) => validator.matches(v, /^[\w|\s]+$/gi), "Please enter valid address"]
        },
        since_date: {
            type: Date,
            required: [true, "since_date must be reuired"],
            validate: [(v) => validator.isDate(v), "Please enter valid date"]
        }
    },
    { timestamps: true }
);

restaurantSchema.methods.toJSON = function () {
    const admin = _.pick(this, ["_id", "name", "email", "phoneNo", "address", "since_date", "createdAt", "updatedAt"]);
    return admin;
};

//? Access token generator
restaurantSchema.methods.generateAccessToken = function (maxAge) {
    const token = jwt.sign({ _id: this._id }, process.env.RESTAURANT_PRIVATE_KEY, {
        expiresIn: maxAge
    });
    return token;
};

//? Admin login function
restaurantSchema.statics.login = async (email, password) => {
    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) throw createError(400, "Unable to login. Please register first.");

    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) throw createError(400, "Unable to login. Invalid password");

    return restaurant;
};

//? Encrypt the password
restaurantSchema.pre("save", async function (next) {
    this.isModified("password") && (this.password = await bcrypt.hash(this.password, 10));
    next();
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = { Restaurant };
