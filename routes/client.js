const express = require('express');

const ClientController = require('../controllers/ClientController');
const router = express.Router();
const validateApiKey = require('../middlewares/validateApiKey');

//Routes
router.post('/:countryCode/onboarding', validateApiKey, ClientController.onboarding);


module.exports = router; 


//The API could be documented with Swagger


 