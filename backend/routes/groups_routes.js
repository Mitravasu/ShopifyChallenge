const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/groups_controller');

router.get('/', groupsController.getGroups);
router.post('/', groupsController.postGroups)


module.exports = router;