const createError = require("http-errors");
const { Restaurant } = require("../models/restaurant");
const MAX_AGE = 60 * 60 * 24;

module.exports.registerRestaurant = async (req, res) => {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();

    const token = restaurant.generateAccessToken(MAX_AGE);

    res.cookie("restaurantToken", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(201).send(restaurant);
};

module.exports.loginRestaurant = async (req, res) => {
    const restaurant = await Restaurant.login(req.body.email, req.body.password);
    const token = restaurant.generateAccessToken(MAX_AGE);

    res.cookie("restaurantToken", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.send(restaurant);
};

module.exports.logoutRestaurant = (req, res) => {
    res.cookie("restaurantToken", "", { httpOnly: true, maxAge: 1 });
    res.send("Logout Restaurant");
};

module.exports.getRestaurant = (req, res) => {
    res.send(req.restaurant);
};

module.exports.getAllRestaurant = async (req, res) => {
    const restaurants = await Restaurant.find();
    if (Array.isArray(restaurants) && !restaurants.length) throw createError(404, "Resaturants not found");

    res.send(restaurants);
};

module.exports.updateRestaurant = async (req, res) => {
    const key = Object.keys(req.body);

    key.forEach((key) => (req.restaurant[key] = req.body[key]));
    await req.restaurant.save();

    res.status(202).send(req.restaurant);
};

module.exports.deleteRestaurant = async (req, res) => {
    await req.restaurant.remove();

    res.cookie("restaurantToken", "", { httpOnly: true, maxAge: 1 });
    res.send(req.restaurant);
};

module.exports.deleteRestaurantByAdmin = async (req, res) => {
    const restaurant = await Restaurant.findOneAndRemove({ email: req.body.email });
    if (!restaurant) throw createError(404, "Restaurant not found with this Email-id");

    res.send(restaurant);
};
