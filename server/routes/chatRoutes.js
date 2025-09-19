const express = require('express');
const router = express.Router();
const controller = require('../controllers/chatController');

router.post('/query', controller.makeQuery);

module.exports = router;