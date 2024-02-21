const express = require('express');
const router = express.Router();

const userController = require('../src/user/userController');

router.get('/user/getAll',userController.getDataControllerFn);
router.post('/user/create', userController.createUserControllerFn);
router.patch('/user/update/:id',userController.updateUserController);
router.delete('/user/delete/:id',userController.deleteUserController);

module.exports = router;
 