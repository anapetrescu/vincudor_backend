var sql = require('../db');

async function addReview(review){
    return new Promise(async function(resolve, reject){
        var result = 0;
        var reviewExist = await reviewExists(review);
        console.log(reviewExist);
        if(reviewExist === 0)
            result = await add(review);
        else
             result = await edit(review);
       if(result === -1)
            resolve(-1);
        else
            resolve(1);
    })
}

async function reviewExists(review){
    return new Promise(function(resolve, reject){
        sql.query("SELECT * FROM reviews WHERE user_id = ? AND wine_id = ?", [review.user_id, review.wine_id],
        function(err, res){
            if(err)
                resolve(-1);
            else if(res.length <= 0)
                    resolve(0);
                 else
                    resolve(1);
        })
    })
}

async function add(review){
    return new Promise(function(resolve, reject){
        var newReview = {
            user_id: review.user_id,
            wine_id: review.wine_id,
            review: review.review
        }
        sql.query("INSERT INTO reviews SET ?", [newReview], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else
                resolve(1);
        })
    })
}

async function edit(review){
    return new Promise(function(resolve, reject){
        sql.query("UPDATE reviews SET review = ?", [review.review], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else
                resolve(1);
        })
    })
}

module.exports.addReview = addReview;