const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in the database"
            });
        }

        req.profile = user;
        next();
    });
};


exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encrypt_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err || !users){
            return res.status(400).json({
                error: "NO users found"
            })
        }
        return res.json(users);
        
    });

};


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err, user) => {
            if(err || !user){
                return res.status(400).json({
                    error: "NOT authorised. Update unsuccessful"
                })
            }
            user.salt = undefined;
            user.encrypt_password = undefined;
            user.createdAt = undefined;
            user.updateUser = undefined;
            return res.json(user);
        }
    )
};

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No orders for this user"
            });
        }
        return res.json(order);
    })

};

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id : product._id,
            name: product.name,
            description: product.description ? product.description : "",
            category: product.category,
            inventory: product.inventory,
            price: req.body.order.price,
            transaction_id: req.body.order.transaction_id
        });
    });

//store in database
User.findOneAndUpdate(
    {_id: req.profile._id},
    {$push: {purchases: purchases}},
    {new: true},
    (err, purchases) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save purchase list"
            });
        }
        next()
    }
    )
    
};