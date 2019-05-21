var express = require('express')
var router = express.Router()
var Wine = require('../models/wine')
var WineMiddleware = require('../middlewares/wineMiddleware')
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

router.get('/wines/:wine_id/:user_id', async function(req, res){
    var wine_id = req.params.wine_id;
    var user_id = req.params.user_id;
    var result = (await Wine.getById(wine_id,user_id, function(err, res){}))
    if(result === 0)
        res.send(400);
    else if(result === -1)
            res.send(500);
        else
            res.status(200).send({wine: result});
})

router.post('/wines/quality', async function(req, res){
    var details = req.body;
    console.log(details);
    var quality = await WineMiddleware.getQuality(details);
    if(quality === -1)
        res.send(500);
    else
        res.status(200).send({quality: quality})
})

router.get('/wines/producer/:id', async function(req, res){
    var id = req.params.id;
    var wines = await Wine.getByProducer(id);
    if(wines === -1)
        res.send(500);
    else
        res.status(200).send({wines: wines});
})

router.get('/wines/details/:id', async function(req, res){
    var id = req.params.id;
    var wine = await Wine.getDetails(id);
    if(wine === -1)
        res.send(500);
    else
        res.status(200).send({wine: wine});
})

router.post('/wines/edit', async function(req, res){
    var wine = req.body;
    var result = await Wine.editWine(wine);
    if(result === 0)
        res.send(500);
    else
        res.send(200);

})
module.exports = router