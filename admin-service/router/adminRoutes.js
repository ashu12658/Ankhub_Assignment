const express = require('express');
const router = express.Router();
const {register,login,fetchUsersFromService,getAllOrdersFromOrderService} = require('../controller/adminControler');

router.post('/register', register);
router.post('/login', login);
router.get('/fetch-user',fetchUsersFromService);
router.get('/get-orders',getAllOrdersFromOrderService)
module.exports = router;
