const express = require("express");
const router = express.Router();

const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct} = require("../controllers/product");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//All of Params
router.param("userId", getUserById);
router.param("productId", getProductById);

//All of actual routes

//create route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

//read route
router.get("/product/:productId", getProduct);
router.get("/product/:productId", photo);

//update route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
//delete update
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

//listing route
router

module.exports = router;