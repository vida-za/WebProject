const express = require('express');
const router = express.Router();
const controller = require('../controllers/wasteTypesController');

const multer = require('multer');
const upload = multer();

router.get('/waste-types', controller.getItems);
router.post('/waste-types', upload.none(), controller.createItem);
router.delete('/waste-types/:id', controller.deleteItem)

module.exports = router;