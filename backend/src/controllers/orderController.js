const Order = require("../models/orderModel");
const { objParser } = require("../utils/objParser");

// @desc Get all orders
// @route GET /api/order
// @access private
const getOrders = async(req, res) => {
    const orders = await Order.find({ }).sort({ orderDate: -1 }).exec(); // get all
    const modifiedOrders = objParser(orders); // data preprocessing
    res.status(200).json(modifiedOrders);
}

// @desc Create new order
// @route POST /api/order
// @access public
const createOrder = async(req, res) => {
    const { tableName, foods, totalAmount } = req.body;
    if(!tableName || !foods || !totalAmount) { // check fields
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const order = await Order.create({ // create
        tableName,
        foods,
        totalAmount
    });
    res.status(200).json(order);
}

// @desc Deliver the order
// @route POST /api/order/:id
// @access private
const deliverOrder = async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) { // check id
        res.status(404);
        throw new Error("Order not found");
    }
    const deliveredOrder = await Order.findByIdAndUpdate( // update
        req.params.id,
        { status: "Delivered" },
        { new: true }
    );
    res.status(200).json(deliveredOrder);
}

module.exports = {
    getOrders,
    createOrder,
    deliverOrder
}