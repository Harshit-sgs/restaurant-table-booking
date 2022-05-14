const createError = require("http-errors");
const { RestaurantFeedback, CustomerFeedback } = require("../models/feedback");

module.exports.giveSiteFeedback = async (req, res) => {
    const feedback = new RestaurantFeedback(req.body);
    await feedback.save();

    res.status(201).send(feedback);
};

module.exports.getSiteFeedback = async (req, res) => {
    const feedbacks = await RestaurantFeedback.find().populate("Restaurant");
    if (Array.isArray(feedbacks) && !feedbacks.length) throw createError(404, "Feedback not found");

    res.send(feedbacks);
};

module.exports.deleteSiteFeedback = async (req, res) => {
    const feedback = await RestaurantFeedback.findByIdAndRemove(req.body.id);
    if (!feedback) throw createError(404, "Feedback not found");

    res.send(feedback);
};

module.exports.giveRestaurantFeedback = async (req, res) => {
    const feedback = new CustomerFeedback(req.body);
    await feedback.save();

    res.status(201).send(feedback);
};

module.exports.getRestaurantFeedback = async (req, res) => {
    const feedbacks = await CustomerFeedback.find().populate("Customer").populate("Restaurant");
    if (Array.isArray(feedbacks) && !feedbacks.length) throw createError(404, "Feedback not found");

    res.send(feedbacks);
};

module.exports.deleteRestaurantFeedback = async (req, res) => {
    const feedback = await CustomerFeedback.findByIdAndRemove(req.body.id);
    if (!feedback) throw createError(404, "Feedback not found");

    res.send(feedback);
};
