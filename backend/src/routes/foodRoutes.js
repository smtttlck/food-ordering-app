const express = require('express');
const asyncHandler = require('express-async-handler');
const validateTokenHandler = require('../middlewares/validateTokenHandler');
const {
    getFoods,
    getFood,
    createFood,
    updateFood,
    deleteFood
} = require('../controllers/foodController');

const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({ // multer disk storage
    destination: (req, file, cb) => { // path for file
        const uploadPath = 'public/uploads/foodImg';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => { // file name
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Max file size (5 MB)
    fileFilter: function (req, file, cb) {
        // check file type
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Sadece resim dosyaları kabul edilir.'));
        }
    }
})

// public endpoints
router.route("/")
    .get(asyncHandler(getFoods));
router.route("/:id")
    .get(asyncHandler(getFood));

router.use(asyncHandler(validateTokenHandler)); // token validation
   
// private endpoints 
router.route("/")
    .post(upload.single('image'), asyncHandler(createFood));
router.route("/:id")
    .put(upload.single('image'), asyncHandler(updateFood))
    .delete(asyncHandler(deleteFood));

module.exports = router;