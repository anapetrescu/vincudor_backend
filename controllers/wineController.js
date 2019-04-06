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

router.get('/wines/all', async function(req, res) {
    var result = (await Wine.getAll(function(err, res){}))
    if(result === 0)
        res.send(500);
    else
        res.status(200).send({wines: result});
})

router.get('/wines/:id', async function(req, res){
    var wine_id = req.params.id;
    var result = (await Wine.getById(wine_id, function(err, res){}))
    if(result === 0)
        res.send(400);
    else if(result === -1)
            res.send(500);
        else
            res.status(200).send({wine: result});
})

module.exports = router