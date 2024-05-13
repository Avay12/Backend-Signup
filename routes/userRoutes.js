const express = require('express');
const userController = require('../controllers/userController');
// const authController = require('../controller/authController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router.route('/').get(userController.getUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
