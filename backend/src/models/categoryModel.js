const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({ // category model  
    name: {
        type: String,
        required: [true, "Please add the category name for foods"]
    },
    iconName: {
        type: String,
        required: [true, "Please add the icon name for category"]
    }
});

module.exports = mongoose.model("Category", categorySchema);