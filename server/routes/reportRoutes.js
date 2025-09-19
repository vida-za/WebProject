const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportsController');

const multer = require('multer');
const upload = multer();

router.get('/report', controller.getItems);
router.post('/report', upload.none(), controller.createItem);
router.delete('/report/:id', controller.deleteItem)

module.exports = router;