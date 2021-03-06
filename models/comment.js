var sql = require('../db');

async function insertComment(commentDetails){
    return new Promise(async function(resolve, reject){
        if(commentDetails.replied_to === undefined || commentDetails.replied_to === '' || commentDetails.replied_to === null)
            commentDetails.replied_to = 0;
        console.log(commentDetails.replied_to)
        var newComment = {
            user_id: commentDetails.user_id,
            wine_id: commentDetails.wine_id,
            comment: commentDetails.comment,
            comment_date: new Date(),
            replied_to: commentDetails.replied_to
        }
        sql.query("INSERT INTO comments SET ?", [newComment], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else
                resolve(res.insertId);
        })
    })
}

async function deleteComment(comment_id){
    return new Promise(function(resolve, reject){
        sql.query("DELETE FROM comments WHERE comment_id = ?", [comment_id], function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else
                resolve(1);
        })
    })
}

async function editComment(commentDetails){
    return new Promise(async function(resolve, reject){
        if(commentDetails.replied_to === undefined || commentDetails.replied_to === '' || commentDetails.replied_to === null)
            commentDetails.replied_to = 0;
        console.log(commentDetails.replied_to)
        sql.query("UPDATE comments SET comment = ? WHERE comment_id = ?", [commentDetails.comment, commentDetails.comment_id],
         function(err, res){
            if(err){
                console.log("err", err);
                resolve(-1);
            }
            else
                resolve(1);
        })
    })
}

async function getCommentsByWineId(wine_id){
    return new Promise(async function(resolve, reject){
        sql.query("SELECT C.*, U.first_name, U.last_name FROM comments C, users U WHERE C.wine_id = ? AND U.user_id = C.user_id", [wine_id], function(err, res){
            if(err){
                console.log(err);
                resolve(-1);
            }
            else
                resolve(res);
        })
    })
}

module.exports.insertComment = insertComment;
module.exports.deleteComment = deleteComment;
module.exports.editComment = editComment;
module.exports.getCommentsByWineId = getCommentsByWineId;