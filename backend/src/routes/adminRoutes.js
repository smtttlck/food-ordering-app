const express = require('express');
const asyncHandler = require('express-async-handler');
const validateTokenHandler = require('../middlewares/validateTokenHandler');
const {
    createAdmin,
    getAdmins,
    loginAdmin,
    deleteAdmin,
    updateAdmin
} = require('../controllers/adminController');

const router = express.Router();

// public endpoints
router.route("/login")
    .post(asyncHandler(loginAdmin));

router.use(asyncHandler(validateTokenHandler)); // token validation

// private endpoints
router.route("/")
    .get(asyncHandler(getAdmins))
    .post(asyncHandler(createAdmin));
router.route("/:id")
    .delete(asyncHandler(deleteAdmin))
    .put(asyncHandler(updateAdmin));

module.exports = router;