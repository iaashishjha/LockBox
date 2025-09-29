const {signup, login, profile} =require('../controllers/AuthController')
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');



const router= require('express').Router();

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

router.get('/profile', profile)

module.exports=router;