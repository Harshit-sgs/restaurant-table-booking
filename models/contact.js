const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema(
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
            trim: true,
            validate: [(v) => validator.isEmail(v), "Please enter valid email-id"]
        },
        description: {
            type: String,
            required: [true, "description must be required"],
            trim: true,
            validate: [(v) => validator.isAscii(v), "Please enter valid description"]
        }
        
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = { Contact };
