const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
require("dotenv").config();
const cors = require('cors');
const connectDb = require('./config/db');

const path = require('path');

connectDb() // database connection
const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors()); // Allow cross-origin requests from any domain

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads'))); // Serve static files from the uploads directory


app.use(express.json()) // middleware to parse JSON bodies
app.use("/api/food", require("./routes/foodRoutes")); // api routes for food
app.use("/api/category", require("./routes/categoryRoutes")); // api routes for category
app.use("/api/admin", require("./routes/adminRoutes")); // api routes for admin
app.use("/api/order", require("./routes/orderRoutes")); // api routes for order
app.use(errorHandler); // error handling codes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
