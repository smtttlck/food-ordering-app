const express = require('express');
const asyncHandler = require('express-async-handler');
const validateTokenHandler = require('../middlewares/validateTokenHandler');
const { 
    getOrders, 
    createOrder,
    deliverOrder
} = require('../controllers/orderController');

const router = express.Router();

// public endpoints
router.route("/")
    .post(asyncHandler(createOrder));

router.use(asyncHandler(validateTokenHandler)); // token validation

// private endpoints
router.route("/")
    .get(asyncHandler(getOrders));
router.route("/:id")
    .post(asyncHandler(deliverOrder));

module.exports = router;