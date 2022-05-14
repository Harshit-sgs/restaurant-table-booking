const {
    registerRestaurant,
    loginRestaurant,
    logoutRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require("../controllers/restaurants");
const { postContact } = require("../controllers/contacts");
const { getPackage } = require("../controllers/packages");
const { giveSiteFeedback } = require("../controllers/feedbacks");
const { authRestaurant } = require("../middleware/auth");
const { validRestaurant } = require("../middleware/validation");
const router = require("express").Router();

router.get("/packages", getPackage);

router.post("/register", registerRestaurant);

router.post("/login", loginRestaurant);

router.get("/logout/me", authRestaurant, logoutRestaurant);

router.get("/me", authRestaurant, getRestaurant);

router.post("/change/me", authRestaurant, validRestaurant, updateRestaurant);

router.get("/remove/me", authRestaurant, deleteRestaurant);

router.post("/feedbacks", authRestaurant, giveSiteFeedback);

router.post("/contacts", postContact);

module.exports = router;
