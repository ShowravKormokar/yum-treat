const express = require('express');
const router = new express.Router();
const authController = require('../controller/authController');
const signUpValidationSchema = require('../validator/authValidator');
const validate = require('../middlewares/validateMiddlewares');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddlewares');

//Get usersInfo using protected route using jwtAuthMiddleware
// router
//     .route('/user-info') //for admin only
//     .get(jwtAuthMiddleware, authController, authController.getSignUpData);
router.get("/ping", (req, res) => { // Testing api that response perfectly - PASS✅
    res.send("pong!");
});

//Handle new user sign-up -> Ensures frontend is sending correct data format.
router
    .route('/sign_up')
    .post(validate(signUpValidationSchema), authController.register);

//Handle user login -> authController.login verifies credentials and returns a JWT if valid
router
    .route('/sign_in')
    .post(authController.login);

//Show logged-in user's own profile -> authController.individualProfile pulls user data based on token's userId.
router
    .route('/account')
    .get(jwtAuthMiddleware, authController.individualProfileInfo);

module.exports = router;