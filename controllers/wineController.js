var express = require('express')
var router = express.Router()
var Wine = require('../models/wine')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.post('/wine/newWine', async function(req, res) {
    var newWine = req.body;
    var result = (await Wine.insertWine(newWine, function(err, res){}))
    if(result === 0)
        res.send(500);
    else
        res.send(200);
})

router.post('/wine/delete', async function(req, res){
    var wine = req.body;
    var result = (await Wine.deleteWine(wine, function(err, res){}))
    if(result === 0)
        res.send(500);
    else
        res.send(200);
})

module.exports = router