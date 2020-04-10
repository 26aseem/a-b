const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "NO order found in Database"
            });
        }
        req.order = order;
    });

};

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, order) => {
       if(err){ 
        console.log(err)
        return res.status(400).json({
            error: "Failed to save your order in the Database"
        });
    }
    res.json(order);
    })
};


exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
       if(err){ 
        return res.status(400).json({
            error: "No orders found in the Database"
        });
    }
    res.json(order);
    })
};


exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
    
};


exports.updateStatus = (req, res) => {
    Order.updated(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err){ 
             return res.status(400).json({
                 error: "Cannot update status"
             });
            }
            res.json(order);
        }
    )
};