var sql = require('../db');
var Cart = {}
async function insertCart(user_id, product_id) {
    return new Promise(function(resolve, reject){
        var cart = {
            user_id: user_id,
            product_id: product_id
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

module.exports.Cart = Cart;
module.exports.insertCart = insertCart;
module.exports.deleteCart = deleteCart;
