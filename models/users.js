var sql = require('../db');
const bcrypt = require('bcrypt');
const salt = 10;
//User constructor
var User = function (user) {
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.password = user.password;
    this.phone_number = user.phone_number;
    this.city = user.city;
};

//create new user
 async function createUser(newUser, result){
    console.log(newUser);
    var user = 
    {
    email: newUser.email,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    phone_number: newUser.phone_number,
    password: bcrypt.hashSync(newUser.password, salt),
    city: newUser.city
    }
    var isUniq = await isUnique(newUser.email);
    console.log(isUniq);
    if(isUniq === true)
     {
        sql.query("INSERT INTO users SET ?", user, function(err, res){
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
                
            }
        });
        return 1;
    }
    else{
        return 0;
    }
}

//Find user by phonenumber or email
async function isUnique(email){
    return new Promise(function(resolve, reject) {
    sql.query("SELECT * FROM users WHERE email = ?", [email], function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else if(res.length !== 0){
                resolve(false)
            }
            else {
                resolve(true);
            }
    })
    });
}

//find user by email and compare passwords
async function loginUser(user){
    return new Promise(function(resolve, reject) {
    sql.query("SELECT * FROM users WHERE email = ?", [user.email], function(err, res){
        if(err) {
            console.log("error: ", err);
            resolve(-1);
        }
        else if(res.length === 0){
                resolve(0);
            }
            else {
                console.log(res[0]);
                if(bcrypt.compareSync(user.password, res[0].password) === true)
                    {
                        console.log('ceva');
                        resolve(res[0]);
                    }
                else
                    {   console.log('ceva2');
                        resolve(0);}
            }
    })
    })
}

module.exports.User = User;
module.exports.createUser = createUser;
module.exports.loginUser= loginUser;

