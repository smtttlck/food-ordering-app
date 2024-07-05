const Food = require('../models/foodModel');
const { objParser } = require('../utils/objParser');
const fs = require('fs');

// @desc Get all foods
// @route GET /api/food
// @access public
const getFoods = async (req, res) => {
    const foods = await Food.find({ }).sort({ _id: -1 }).exec(); // get all
    const modifiedFoods = objParser(foods); // data preprocessing
    res.status(200).json(modifiedFoods);
}

// @desc Get a foods
// @route GET /api/food/:id
// @access public
const getFood = async (req, res) => {
    const food = await Food.findById(req.params.id); // get one
    if(!food) { // check id
        res.status(404);
        throw new Error("Food not found");
    }
    res.status(200).json(food);
}

// @desc Create new food
// @route POST /api/food
// @access private
const createFood = async (req, res) => {
    const { name, category, detail, salary } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    if(!name || !category || !detail || !salary || !imageUrl) { // check fields 
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const food = await Food.create({ // create
        name, 
        category, 
        detail, 
        salary, 
        imageUrl
    });
    res.status(201).json(food);
}

// @desc Update food
// @route PUT /api/food/:id
// @access private
const updateFood = async (req, res) => {
    const food = await Food.findById(req.params.id); // get
    if(!food) { // check id
        res.status(404);
        throw new Error("Food not found");
    }

    if(req.file) { // Is there a new file?
        fs.unlinkSync(food.imageUrl)
        req.body.imageUrl = req.file.path
    }
    else        
        req.body.imageUrl = food.imageUrl;
    
    const updatedFood = await Food.findByIdAndUpdate( // update
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedFood);
}

// @desc Delete food
// @route DELETE /api/food/:id
// @access private
const deleteFood = async (req, res) => {
    const food = await Food.findById(req.params.id); // get
    if(!food) { // check id
        res.status(404);
        throw new Error("Food not found");
    }
    fs.unlinkSync(food.imageUrl)  
    await food.deleteOne(); // delete
    res.status(200).json(food);
}

module.exports = {
    getFoods,
    getFood,
    createFood,
    updateFood,
    deleteFood
}