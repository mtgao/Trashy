var express = require('express');
var router = express.Router();

// require controllers
var trashLevelController = require('../controllers/trashLevelController'); 

router.get('/', trashLevelController.index); 

// post request to add data sample for trash level
router.post('/', trashLevelController.level_create); 

// get request to list trash level data samples
router.get('/data/trashlevel/list', trashLevelController.level_list);

module.exports = router; 
