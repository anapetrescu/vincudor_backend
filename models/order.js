var sql = require('../db');

async function insertOrder(orderDetails) {
    return new Promise(async function(resolve, reject){
        var newOrderDetails = {
            address: orderDetails.address,
            order_date: new Date()
        }

        var order_id = await insertOrderDetails(newOrderDetails);
        console.log(order_id);
        if(order_id === -1)
            resolve(-1);
        var wines = orderDetails.products;
        for(var i = 0; i < wines.length; i++){
            var newOrder = {
                order_id: order_id,
                wine_id: wines[i].wine_id,
                user_id: orderDetails.user_id,
                quantity: wines[i].quantity
            }
            var result = await insertOrders(newOrder);
            if(result === -1)
                resolve(-1);
        }
        resolve(1);
    })
}

async function insertOrderDetails(newOrderDetails){
    return new Promise(function(resolve, reject){
        sql.query("INSERT INTO orders_details SET ?", [newOrderDetails], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else{
                console.log(res);
                resolve(res.insertId);
                }
        })
    })
}

async function insertOrders(newOrder){
    return new Promise(function(resolve, reject){
        sql.query("INSERT INTO orders SET ?", [newOrder], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else
                resolve(1);
        })
    })
}

module.exports.insertOrder = insertOrder;