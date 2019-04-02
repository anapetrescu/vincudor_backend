var express = require('express')
var router = express.Router()
var User = require('../models/users')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var jwt = require('jsonwebtoken');
var config = require('../config');
//Registration
router.post('/user/register', async function (req, res) {
    var newUser = req.body;
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
    var user = req.body;
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

router.post('/user/edit', async function(req, res){
  var newUser = req.body;
  console.log(newUser);
  var result = (await User.editUser(newUser, function(err, res){}))
  console.log(result);
  if(result === 0)
    res.send(500);
  else
    res.send(200);
});
router.post('/user/changePassword', async function(req, res){
  var user = req.body;
  console.log(user);
  var result = (await User.changePassword(user, function(err, res){}));
  console.log(result);
  if(result === 0)
    res.send(500);
  else
    res.send(200);
});

router.post('/user/delete', async function(req, res){
  var user = req.body;
  console.log(user);
  var result = (await User.deleteUser(user, function(err, res){}))
  console.log(result);
  if(result === 0)
    res.send(500);
  else
    res.send(200);
})
module.exports = router
