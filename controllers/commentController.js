var express = require('express')
var router = express.Router()
var Comment = require('../models/comment')
var CommentMiddleware = require('../middlewares/commentMiddleware')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// router.post('/commment/add', async function(req, res) {
//     var commmentDetails = req.body;
//     var result = await Comment.insertComment(commmentDetails);
// })

// module.exports = router