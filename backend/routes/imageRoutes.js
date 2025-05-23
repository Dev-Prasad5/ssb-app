const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/imageController');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), imageController.uploadImage);

// Add this line somewhere after imports, before exports:
router.get('/', imageController.getAllImages);

router.get('/random', imageController.getRandomImage);

module.exports = router;