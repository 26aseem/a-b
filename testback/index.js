const express = require("express");
const app = express();
const port = 5000;
const admin = (req,res) => {
    return res.send("Admin Dashboard")
};

const isAdmin = (req,res,next) => {
    console.log("isAdmin is running");
    next();
};

const isloggedIn  = (req,res,next) => {
    console.log("Admin is logged in");
    next();
};

app.get('/', (req,res) => {
    res.send('Welcome Peeps!')
});
app.get("/admin", isloggedIn, isAdmin, admin);

app.get('/home', (req,res) => {
    res.send('Welcome to Home Page')
});

app.get('/login', (req,res) => {
    res.send('You are visiting login route')
});

app.get('/signout', (req,res) => {
    res.send('You have successfully signed out')
});

app.get('/contact', (req,res) => {
    res.send('We are here to help you!')
});

app.listen(port, () => console.log("Server is up and running...."));
