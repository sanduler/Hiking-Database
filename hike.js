module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //Selects all Hikes to display to user
    function getHikes(res, mysql, context, complete){
        mysql.pool.query("SELECT hikeID as id, hikeName, distance, elevation, difficulty, averageRating FROM Hikes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hikes = results;
            complete();
        });
    }

    //Selects all Hikes to display to user
    function getHike(res, mysql, context, id, complete){
        var sql = "SELECT hikeID as id, hikeName, distance, elevation, difficulty, averageRating FROM Hikes WHERE hikeID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hiking = results[0];
            complete();
        });
    }

    //Router to display hikes page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletehike.js"];
        var mysql = req.app.get('mysql');

        //Calling select functions
        getHikes(res, mysql, context, complete);

        //Complete function makes sure all select functions have finished before rendering page
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('addHike', context);
            }
        }
    });


    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatehike.js"];
        var mysql = req.app.get('mysql');
        getHike(res, mysql, context, req.params.id, complete);
        function complete()
        {
            callbackCount++;
            if(callbackCount >= 1){
                res.render('addHike-update', context);
            }

        }
    });

    /*update data is sent to in order to update a customer */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Hikes SET hikeName=?, distance=?, elevation=?, difficulty=?, averageRating=? WHERE hikeID=?";
        var inserts = [req.body.hikeName, req.body.distance, req.body.elevation, req.body.difficulty, req.body.averageRating, req.params.id];
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

    //Insert for a hike
    router.post('/', function(req, res)
    {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Hikes (hikeID, hikeName, distance, elevation, difficulty, averageRating) VALUES (NULL,?,?,?,?,?)";
        var inserts = [req.body.hikeName, req.body.distance, req.body.elevation, req.body.difficulty, req.body.averageRating];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/addhike');
            }
        });
    });

    //Delete for a hike
    router.delete('/:hikeID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Hikes WHERE hikeID = ?";
        var inserts = [req.params.hikeID];
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