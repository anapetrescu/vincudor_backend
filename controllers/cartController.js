var express = require('express')
var router = express.Router()
var Cart = require('../models/cart')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.post('/cart/add', async function(req, res) {
    console.log("a ajuns aici");
    var user_id = req.body.user_id;
    var product_id = req.body.product_id;
    var result = await Cart.insertCart(user_id, product_id);
    if(result === -1)
        res.send(500);
    else
        res.send(200);   
})

router.post('/cart/delete', async function(req, res){
    var user_id = req.body.user_id;
    var product_id = req.body.product_id;
    var result = await Cart.deleteCart(user_id, product_id);
    if(result === -1)
        res.send(500);
    else
        res.send(200);  
})

router.get('/cart/all', async function(req, res){
    var cart = await Cart.getCart();
    if(cart === -1)
      res.send(500);
    else
        res.status(200).send({cart: cart});
})

module.exports = router