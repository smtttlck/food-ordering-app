const mongoose = require('mongoose');

const orderModel = mongoose.Schema({ // order model  
    tableName: {
        type: String,
        required: true
    },
    foods: [{ // foods on order
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        _id: false
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Waiting", "Delivered"],
        default: "Waiting"
    }   
});

module.exports = mongoose.model("Order", orderModel);