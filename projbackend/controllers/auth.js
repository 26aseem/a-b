const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req, res) => {
    /*res.json({
        message:"Signup works!"
    })*/

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            errorParam: errors.array()[0].param
        })
    }


    const user = new User(req.body);
    //Database updated
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err : "Not able to save user in the Database"
            });
        }

        res.json({
            name: user.firstname + ' ' + user.lastname,
            email: user.email,
            id: user._id
        })
    });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;   //This destructuring
    
    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            errorParam: errors.array()[0].param
        });
    }
    User.findOne({email}, (err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User Not Found. Trying Sign Up!"
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match"
            });
        }

        //Create Token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        //Put Token in cookie
        res.cookie("token, token", {expire: new Date() + 9999});

        //send response to front end
        const {_id, name, email, role } = user;
        return res.json({token, user: { _id, name, email, role}});

    });

};

exports.signout = (req,res) => {
    res.clearCookie("token")
    res.json({
        message: "User Signout Successfully"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = ( req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};


exports.isAdmin = ( req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not ADMIN, ACCESS DENIED"
        });
    }
    next();
};