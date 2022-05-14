const {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customers");
const { getAllRestaurant } = require("../controllers/restaurants");
const { postContact } = require("../controllers/contacts");
const { giveRestaurantFeedback } = require("../controllers/feedbacks");
const { authCustomer } = require("../middleware/auth");
const { validCustomer } = require("../middleware/validation");
const router = require("express").Router();

router.post("/register", registerCustomer);

router.post("/login", loginCustomer);

router.get("/logout/me", authCustomer, logoutCustomer);

router.get("/me", authCustomer, getCustomer);

router.post("/change/me", authCustomer, validCustomer, updateCustomer);

router.get("/remove/me", authCustomer, deleteCustomer);

router.get("/restaurants", getAllRestaurant);

router.post("/feedbacks", authCustomer, giveRestaurantFeedback);

router.post("/contacts", postContact);

module.exports = router;
