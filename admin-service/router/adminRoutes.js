

const express = require('express');
const router = express.Router();
const {register,login,fetchUsersFromService,getAllOrdersFromOrderService,getUserByIdFromUserService,deleteUserByIdFromUserService} = require('../controller/adminControler');

router.post('/register', register);
router.post('/login', login);
router.get('/fetch-user',fetchUsersFromService);
router.get('/get-orders',getAllOrdersFromOrderService);
router.get('user/:id',getUserByIdFromUserService);
router.delete('/delete/:id',deleteUserByIdFromUserService);
module.exports = router;
