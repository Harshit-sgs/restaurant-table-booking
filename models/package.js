const mongoose = require("mongoose");
const validator = require("validator");

const packageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name must be required"],
            trim: true,
            validate: [(v) => validator.matches(v, /^[a-z|\s]+$/gi), "Please enter valid name"]
        },
        discount: {
            type: String,
            required: [true, "discount must be required"],
            min: 0,
            validate: [(v) => validator.isDecimal(v), "Please enter valid discount"]
        },
        price: {
            type: String,
            required: [true, "price must be required"],
            min: 0,
            validate: [(v) => validator.isDecimal(v), "Please enter valid price"]
        },
        month: {
            type: String,
            required: [true, "month must be required"],
            validate: [(v) => validator.isInt(v, { min: 1, max: 12 }), "Please enter valid month"]
        },
        service: {
            type: String,
            required: [true, "service must be required"],
            trim: true,
            validate: [(v) => validator.matches(v, /^[a-z|\s]+$/gi), "Please enter valid service"]
        }
    },
    { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = { Package };
