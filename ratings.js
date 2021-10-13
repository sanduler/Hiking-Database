module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //Selects all Ratings to display to user
    function getRatings(res, mysql, context, complete){
        mysql.pool.query("SELECT Hikes.hikeID, Hikes.hikeName, People.peopleID, People.firstName, People.lastName, People.username, Ratings.ratingID as id, Ratings.ratingScore, Ratings.ratingTime FROM Ratings JOIN Hikes ON Ratings.hikeID = Hikes.hikeID JOIN People ON Ratings.peopleID = People.peopleID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ratings = results;
            complete();
        });
    }

    //Selects all Hikes to display to user
    function getHikes(res, mysql, context, complete){
        mysql.pool.query("SELECT hikeID, hikeName FROM Hikes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hikes = results;
            complete();
        })
    }

    //Selects all People to display to user
    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT peopleID, username FROM People", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results;
            complete();
        })
    }


    //Selects for UPDATE
    function getRating(res, mysql, context, id, complete){
        var sql = "SELECT Hikes.hikeID, Hikes.hikeName, People.peopleID, People.firstName, People.lastName, People.username, Ratings.ratingID as id, Ratings.ratingScore, Ratings.ratingTime FROM Ratings JOIN Hikes ON Ratings.hikeID = Hikes.hikeID JOIN People ON Ratings.peopleID = People.peopleID WHERE ratingID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rate = results[0];
            complete();
        });
    }

    //Router to display ratings page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleterating.js"];
        var mysql = req.app.get('mysql');

        //Calling select functions
        getRatings(res, mysql, context, complete);
        getHikes(res, mysql, context, complete);
        getPeople(res, mysql, context, complete);

        //Complete function makes sure all select functions have finished before rendering page
        function complete(){
            callbackCount++;
            if(callbackCount >=3){
                res.render('ratings', context);
            }
        }
    });


    //Insert for a rating
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Ratings (ratingID, hikeID, peopleID, ratingScore, ratingTime) VALUES (NULL,?,?,?,CURDATE())";
        var inserts = [req.body.hikeName, req.body.username, req.body.ratingScore];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/ratings');
            }
        });
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateratings.js"];
        var mysql = req.app.get('mysql');
        getRating(res, mysql, context, req.params.id, complete);
        function complete()
        {
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-ratings', context);
            }

        }
    });

    /*update data is sent to in order to update a customer */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Ratings SET ratingScore=? WHERE ratingID=?";
        var inserts = [req.body.ratingScore, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });


    //Delete for a rating
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Ratings WHERE ratingID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();