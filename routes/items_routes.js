const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/items_controller');


router.patch('/', itemsController.updateItems)
// Get all items in the db
router.get('/', itemsController.getItems);
// router.get('/:itemId',);
router.post('/', itemsController.postUsers)

router.delete('/', itemsController.deleteItems)

// router.patch('/profile/', usersController.updateProfile)
// router.post('/login/', usersController.userLogin);
// router.get('/search/:query',usersController.searchUsers);
// router.get('/:userId',usersController.getUserById);
// router.get('/',usersController.getUsers);
// router.post('/',usersController.postUsers);

module.exports = router;