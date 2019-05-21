var sql = require('../db');
var Wine = require('./wine');
var Cart = {}
async function insertCart(user_id, product_id, quantity) {
    return new Promise(function(resolve, reject){
        var cart = {
            user_id: user_id,
            product_id: product_id,
            quantity: quantity
        }
        sql.query("INSERT INTO cart SET ?", [cart], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else{
                resolve(1);
            }
        })
    })
    
}

async function deleteCart(user_id, product_id) {
    return new Promise(function(resolve, reject){
        sql.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else{
                resolve(1);
            }
        })
    })
    
}

async function getCart(user_id) {
    return new Promise(function(resolve, reject){
        sql.query("SELECT * FROM cart WHERE user_id = ?", [user_id], async function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else{
                let cart = []
                for(var i = 0; i < res.length; i++){
                    var product = await Wine.getById(res[i].product_id);
                    cart.push(product);
                }
                resolve(cart);
            }
        })
    })
    
}

async function updateCart(wines, user_id){
    for(var i = 0; i < wines.length; i++){
        console.log(wines[i].product_id, wines[i].quantity, user_id)
        var result = await updateProduct(wines[i].product_id, wines[i].quantity, user_id);
        if(result === -1)
            return -1;
    }
    return 1;
}

async function updateProduct(product_id, quantity, user_id){
    return new Promise(function(resolve, reject){
        sql.query("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?", 
            [quantity, user_id, product_id], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else
                resolve(1);
        })
    })
}

module.exports.Cart = Cart;
module.exports.insertCart = insertCart;
module.exports.deleteCart = deleteCart;
module.exports.getCart = getCart;
module.exports.updateCart = updateCart;
