const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({ // admin model   
    name: {
        type: String,
        required: [true, "Please add admin name"],
        unique: [true, "Admin name already taken"]
    },
    level: {
        type: String,
        required: [true, "Please add admin level"]
    },
    password: {
        type: String,
        required: [true, "Please add password for admin"]
    }
}, {
    timestamps:true
})

module.exports = mongoose.model("Admin", adminSchema)