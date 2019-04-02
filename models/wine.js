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

module.exports.insertWine = insertWine;
module.exports.deleteWine = deleteWine;