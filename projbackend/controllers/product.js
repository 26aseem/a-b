const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");  //File System

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
    });
    next();
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Issues with the image"
            });
        }

        let product = req.product;
        product = _.extend

        //handle file here
        if(file.photo){
            if(file.photo.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the db
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error: "Saving image to the Database failed"
                });
            }
            return res.json(product);
        });

    })
};



exports.getProduct = (req, res) => {
    req.product.photo = undefined    //So that product loads quickly
    return res.json(req.product)
};

//Performance optimization
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
};

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the product"
            });
        }

        res.json({
            message: "Deletion was successful"
        });
    });
};


exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Issues with the image"
            });
        }
        //destructure the fields
        const {name, description, price, category, inventory } = fields;
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !inventory
        ){
            return res.status(400).json({
                error: "Please include all the fields"
            });
        }


        let product = new Product(fields);
        if(file.photo){
            if(file.photo.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the db
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error: "Saving image to the Database failed"
                });
            }
            return res.json(product);
        });

    })
};