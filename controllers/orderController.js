var express = require('express')
var router = express.Router()
var Order = require('../models/order')
var OrderMiddleware = require('../middlewares/orderMiddleware')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.post('/order/new', async function(req, res) {
    var orderDetails = req.body;
    var result  = await Order.insertOrder(orderDetails);
    if(result === -1)
        res.send(500);
    else
        res.send(200);
})
module.exports = router