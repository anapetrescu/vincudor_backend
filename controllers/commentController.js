var express = require('express')
var router = express.Router()
var Comment = require('../models/comment')
var CommentMiddleware = require('../middlewares/commentMiddleware')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.post('/commment/add', async function(req, res) {
    var commmentDetails = req.body;
    var result = await Comment.insertComment(commmentDetails);
    if(result === -1)
        res.send(500);
    else
        res.send(200);
})

router.post('/comment/delete', async function(req, res){
    var comment_id = req.body.comment_id;
    var result = await Comment.deleteComment(comment_id);
    if(result === -1)
        res.send(500);
    else
        res.send(200);
})

module.exports = router