var express = require('express')
var router = express.Router()
var Review = require('../models/review')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.post('/review', async function(req, res) {
    var review = req.body;
    var result = await Review.addReview(review);
    if(result === -1)
        res.send(500);
    else
        res.send(200);
})

module.exports = router