const {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAdmin,
    getAllAdmin,
    updateAdmin,
    deleteAdmin
} = require("../controllers/admins");
const { getAllCustomer, deleteCustomerByAdmin } = require("../controllers/customers");
const { getAllRestaurant, deleteRestaurantByAdmin } = require("../controllers/restaurants");
const { getContacts, deleteContacts } = require("../controllers/contacts");
const { addPackage, updatePackage, deletePackage } = require("../controllers/packages");
const {
    getSiteFeedback,
    deleteSiteFeedback,
    getRestaurantFeedback,
    deleteRestaurantFeedback
} = require("../controllers/feedbacks");
const { authAdmin } = require("../middleware/auth");
const { validId, validEmail, validAdmin } = require("../middleware/validation");
const router = require("express").Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/logout/me", authAdmin, logoutAdmin);

router.get("/me", authAdmin, getAdmin);

router.get("/admins", authAdmin, getAllAdmin);

router.post("/change/me", authAdmin, validAdmin, updateAdmin);

router.get("/remove/me", authAdmin, deleteAdmin);

router.get("/customers", authAdmin, getAllCustomer);

router.post("/customers/remove", authAdmin, validEmail, deleteCustomerByAdmin);

router.get("/restaurants", authAdmin, getAllRestaurant);

router.post("/restaurants/remove", authAdmin, validEmail, deleteRestaurantByAdmin);

router.get("/contacts", authAdmin, getContacts);

router.post("/contacts/remove", authAdmin, validEmail, deleteContacts);

router.post("/package/add", authAdmin, addPackage);

router.post("/package/update", authAdmin, validId, updatePackage);

router.post("/package/remove", authAdmin, validId, deletePackage);

router.get("/feedback/site", authAdmin, getSiteFeedback);

router.get("/feedback/restaurant", authAdmin, getRestaurantFeedback);

router.post("/feedback/site", authAdmin, validId, deleteSiteFeedback);

router.post("/feedback/restaurant", authAdmin, validId, deleteRestaurantFeedback);

module.exports = router;
