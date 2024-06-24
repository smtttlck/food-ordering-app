const Category = require('../models/categoryModel');
const { objParser } = require('../utils/objParser');

// @desc Get all categories
// @route GET /api/category
// @access public
const getCategories = async(req, res) => {
    const categories = await Category.find({ }); // get
    const modifiedCategories = objParser(categories); // data preprocessing
    res.status(200).json(modifiedCategories);
}

// @desc Create new category
// @route POST /api/category
// @access private
const createCategory = async(req, res) => {
    const { name, iconName } = req.body;
    if(!name || !iconName) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const category = await Category.create({ // create
        name,
        iconName
    });
    res.status(201).json(category);
}

// @desc Delete category
// @route DELETE /api/category/:id
// @access private
const deleteCategory = async(req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) { // check fields
        res.status(404);
        throw new Error("Category not found");
    }
    await category.deleteOne() // delete
    res.status(200).json(category);
}

// @desc Update category
// @route PUT /api/category/:id
// @access private
const updateCategory = async(req, res) => {
    const category = await Category.findById(req.params.id)
    if(!category) { // check fields
        res.status(404);
        throw new Error("Category not found")
    }
    const updatedCategory = await Category.findByIdAndUpdate( // update
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedCategory);
}

module.exports = { 
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
}