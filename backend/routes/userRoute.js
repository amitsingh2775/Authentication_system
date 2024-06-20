// userRoute.js

import express from 'express';
import { Signup,Login } from '../controllers/userControler.js'; // Check the path to the controller file
import { forgetPass,ResetPass } from '../controllers/forgetControler.js'; 
const router = express.Router();

// Define the route for user signup and associate it with the Signup function
router.route('/signup').post(Signup);
router.route('/login').post(Login);
router.route('/forget').post(forgetPass)
router.route('/reset/:token').post(ResetPass)


export default router;
