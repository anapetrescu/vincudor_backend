var express = require('express')
var router = express.Router()
var User = require('../models/users')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var jwt = require('jsonwebtoken');
var config = require('../config');
//Registration
router.post('/user/register', async function (req, res) {
    var newUser = req.body.user;
    var result = (await User.createUser(newUser, function(err, user){}))
    console.log(result);
    if(result === 1){
      res.send(200);
    }
    else if(result === 0)
           res.send(500);
         else
           res.sendStatus(400);
});

router.post('/user/login', async function(req, res){
    var user = req.body.user;
    console.log(user);
    var result = (await User.loginUser(user, function(err, userRes){}))
    console.log(result);
    if(result === 0)
      res.send(500);
    else if(result === -1)
           res.send(400);
         else
           { 
              var token = jwt.sign({ id: result.id }, config.secret);
              res.status(200).send({id_token: token, user: result});
             }
});

module.exports = router
