const express = require('express');
const router = express.Router();
const controller = require('../controllers/chatController');

router.post('/query', controller.makeQuery);
router.get('/models', controller.getModels);

module.exports = router;