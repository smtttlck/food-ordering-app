const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({ // food model  
    name: {
        type: String,
        required: [true, "Please add the food name"]
    },
    category: {
        type: String,
        required: [true, "Please add the food category"]
    },
    detail: {
        type: String,
        required: [true, "Please add the food detail"]
    },
    salary: {
        type: Number,
        required: [true, "Please add the food salary"]
    },
    imageUrl: {
        type: String,
        required: [true, "Please add the image URL"]
    }
})

module.exports = mongoose.model("Food", foodSchema)