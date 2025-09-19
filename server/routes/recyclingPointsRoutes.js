const express = require('express');
const router = express.Router();
const controller = require('../controllers/recyclingPointsController');

const multer = require('multer');
const upload = multer();

router.get('/recycling-point', controller.getItems);
router.post('/recycling-point', upload.none(), controller.createItem);
router.delete('/recycling-point/:id', controller.deleteItem)

module.exports = router;