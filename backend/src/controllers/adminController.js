const Admin = require('../models/adminModel');
const { objParser } = require('../utils/objParser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Create new admin
// @route POST /api/admin
// @access private
const createAdmin = async(req, res) => {
    const { name, level, password } = req.body;
    if(!name || !level || !password) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await Admin.findOne({ name });
    if(userAvailable) {
        res.status(400);
        throw new Error("Admin already created");
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = await Admin.create({ // create
        name, 
        level, 
        password: hashedPassword
    });
    res.status(201).json(admin);
}

// @desc Get all admin
// @route GET /api/admin
// @access private
const getAdmins = async(req, res) => {
    const admins = await Admin.find({ }); // get
    const modifiedAdmins = objParser(admins); // data preprocessing
    res.status(200).json(modifiedAdmins);
}

// @desc Login a admin
// @route POST /api/admin/login
// @access public
const loginAdmin = async(req, res) => {
    const { name, password } = req.body;
    if(!name || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const admin = await Admin.findOne({ name }); // get
    if(admin && await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign({ // create new token
            admin: {
                name: admin.name,
                level: admin.level
            }
        },
            process.env.ADMIN_TOKEN_SECRET,
            { expiresIn: "1d" }
        )
        res.status(200).json({ token });
    }
    else {
        res.status(401);
        throw new Error("Name or password not valid");
    }
}

// @desc Delete category
// @route DELETE /api/category/:id
// @access private
const deleteAdmin = async(req, res) => {
    const admin = await Admin.findById(req.params.id)
    if(!admin) { // check fields
        res.status(404);
        throw new Error("Category not found")
    }
    await admin.deleteOne() // delete
    res.status(200).json(admin);
}

// @desc Update admin
// @route PUT /api/admin/:id
// @access private
const updateAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id); // get
    if(!admin) { // check id
        res.status(404);
        throw new Error("Admin not found");
    }
    const updatedAdmin = await Admin.findByIdAndUpdate( // update
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedAdmin);
}

module.exports = { 
    createAdmin,
    getAdmins,
    loginAdmin,
    deleteAdmin,
    updateAdmin
}