var express = require('express');
var router = express.Router();
//For Data Validation
const { check, validationResult } = require('express-validator');

//Imported from controllers/auth.js
const { signup, signin, signout, isSignedIn } = require('../controllers/auth.js');

//Signup Route
router.post("/signup",[
    check("firstname", "First Name should be atleast 2 characters").isLength({ min: 2}),
    check("lastname", "Last Name should be atleast 2 characters").isLength({ min: 2}),
    check("password", "Password should be atleast 6 characters").isLength({ min: 6}),
    check("email", "Email is required").isEmail()
],signup);

//Signin Route
router.post("/signin",[
    check("password", "Password is required").isLength({ min: 6}),
    check("email", "Email is required").isEmail()
],signin);

//Signout Route
router.get("/signout", signout);

router.get("/testroute",isSignedIn, (req, res) => {
    res.json(req.auth);
});


module.exports = router;