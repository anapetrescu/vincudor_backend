var sql = require('../db');

var Wine = function(wine){
    this.wine_id                                = wine.wine_id;
    this.producer_id                            = wine.producer_id;
    this.wine_name                              = wine.wine_name;
    this.type                                   = wine.type;
    this.fixed_acidity                          = wine.fixed_acidity;
    this.volatile_acidity                       = wine.volatile_acidity;
    this.citric_acid                            = wine.citric_acid;
    this.residual_sugar                         = wine.residual_sugar;
    this.chlorides                              = wine.chlorides;
    this.free_sulfur_dioxide                    = wine.free_sulfur_dioxide;
    this.total_sulfur_dioxide                   = wine.total_sulfur_dioxide;
    this.density                                = wine.density;
    this.pH                                     = wine.pH;
    this.sulphates                              = wine.sulphates;
    this.alcohol                                = wine.alcohol;
    this.quality                                = wine.quality;
    this.price                                  = wine.price;
    this.quantity                               = wine.quantity;
    this.color                                  = wine.color;
    this.description                            = wine.description
}

async function insertWine(newWine){
    return new Promise(function(resolve, reject){
     
     sql.query("INSERT INTO wines SET ?", newWine, function(err, res){
            if(err) {
                console.log("error: ", err);
                resolve(0);
            }
            else{
                console.log(res.insertId);
                resolve(1);    
            }
    })
})
}

async function deleteWine(wine){
    return new Promise(function(resolve, reject){
        sql.query("DELETE FROM wines WHERE wine_id = ?", [wine.wine_id], function(err, res){
            if(err){
                console.log("err", err);
                resolve(0);
            }
            else
                resolve(1);
        })
    })
}

async function getAll(){
    return new Promise(function(resolve, reject){
        sql.query("SELECT wine_id, producer_id, wine_name, type, price, quantity, color, description FROM wines", async function(err, res){
            if(err){
                console.log("err", err);
                resolve(0);
            }
            else{
                console.log(res[0]);
                let wines = [];
                for(let i = 0; i < res.length; i++){
                    var producer = await getProducer(res[i].producer_id);
                    res[i].producer = producer;
                    wines.push(res[i]);
                }
                resolve(wines);
            }
        })
    })
}

async function getProducer(producer_id){
    return new Promise (function(resolve, reject){
         sql.query("SELECT user_id, first_name, last_name, email, city, phone_number FROM users WHERE user_id = ?",
        [producer_id], function(err, res){
            if(err){
                console.log("err", err);
                resolve(0);
            }
            else{
                resolve(res[0]);
            }
        })
    })
}

module.exports.insertWine = insertWine;
module.exports.deleteWine = deleteWine;
module.exports.getAll = getAll;