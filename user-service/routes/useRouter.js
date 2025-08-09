const express = require ('express')
const router = express();
const protect = require ('../middleware/authmiddleware');
const {registerUser,loginUser,getUserById,getUser,deleteUserById} = require('../controller/userController');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/:id',getUserById);
router.get('/get',getUser);
router.delete('/delete/:id',deleteUserById);


module.exports = router;
