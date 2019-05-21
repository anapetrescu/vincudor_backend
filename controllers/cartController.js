var express = require('express')
var router = express.Router()
var Cart = require('../models/cart')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.post('/cart/add', async function(req, res) {
    var user_id = req.body.user_id;
    var product_id = req.body.product_id;
    var quantity = req.body.quantity;
    var result = await Cart.insertCart(user_id, product_id, quantity);
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

router.get('/cart/all/:id', async function(req, res){
    var user_id = req.params.id;
    var cart = await Cart.getCart(user_id);
    if(cart === -1)
      res.send(500);
    else
        res.status(200).send({cart: cart});
})

router.post('/cart/:user_id', async function(req, res){
    var user_id = req.params.user_id;
    var wines = req.body;
    console.log(wines);
    var cart = await Cart.updateCart(wines, user_id);
    if(cart === -1)
      res.send(500);
    else
        res.send(200);
})
module.exports = router