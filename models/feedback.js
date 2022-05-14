const validator = require("validator");
const mongoose = require("mongoose");

const restaurantFeedbackSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: [true, "rating must be required"],
        validate: [(v) => validator.isDecimal(v), "Please enter valid rating"]
    },
    description: {
        type: String,
        required: [true, "description must be required"],
        trim: true,
        validate: [(v) => validator.matches(v, /^[a-z|\s]+$/gi), "Please enter valid description"]
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "restaurantId must be required"],
        validate: [(v) => validator.isMongoId(v), "Invalid restaurant id provided"],
        ref: "Restaurant"
    }
});

const customerFeedbackSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: [true, "rating must be required"],
        validate: [(v) => validator.isDecimal(v), "Please enter valid rating"]
    },
    description: {
        type: String,
        required: [true, "description must be required"],
        trim: true,
        validate: [(v) => validator.matches(v, /^[a-z|\s]+$/gi), "Please enter valid description"]
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "customerId must be required"],
        validate: [(v) => validator.isMongoId(v), "Invalid customer id provided"],
        ref: "Customer"
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "restaurantId must be required"],
        validate: [(v) => validator.isMongoId(v), "Invalid restaurant id provided"],
        ref: "Restaurant"
    }
});

module.exports.RestaurantFeedback = mongoose.model("RestaurantFeedback", restaurantFeedbackSchema);

module.exports.CustomerFeedback = mongoose.model("CustomerFeedback", customerFeedbackSchema);
