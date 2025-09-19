const express = require('express');
const router = express.Router();
const controller = require('../controllers/achivevementsController');

const multer = require('multer');
const upload = multer();

router.get('/achievements', controller.getItems);
router.post('/achievements', upload.none(), controller.createItem);
router.delete('/achievements/:id', controller.deleteItem)

module.exports = router;