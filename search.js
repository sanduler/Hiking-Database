module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //Selects all Locations to display to user
    function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT Hikes.hikeID, Hikes.hikeName, Locations.locationID as id, Locations.hikeID, Locations.city, Locations.state, Locations.zipCode FROM Locations JOIN Hikes ON Locations.hikeID = Hikes.hikeID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations = results;
            complete();
        });
    }

    //Selects all Hikes to display to user
    function getHikes(res, mysql, context, complete){
        mysql.pool.query("SELECT hikeID, hikeName, distance, elevation, difficulty, averageRating FROM Hikes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hikes = results;
            complete();
        });
    }

    //update
    function getLocation(res, mysql, context, id, complete){
        var sql = "SELECT Hikes.hikeID, Hikes.hikeName, Locations.locationID as id, Locations.hikeID, Locations.city, Locations.state, Locations.zipCode FROM Locations JOIN Hikes ON Locations.hikeID = Hikes.hikeID WHERE locationID =?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locat = results[0];
            complete();
        });
    }

    //Router to display search page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletelocation.js", "searchhike.js"];
        var mysql = req.app.get('mysql');

        //Calling select functions
        getLocations(res, mysql, context, complete);
        getHikes(res, mysql, context, complete);

        //Complete function makes sure all select functions have finished before rendering page
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('search', context);
            }
        }
    });

    //Router to display search results
    /*router.post('/', function(req, res)
    {
        var mysql = req.app.get('mysql');
        var sql = "SELECT hikeName, distance, elevation, difficulty, averageRating FROM Hikes WHERE hikeName LIKE %?%";
        var inserts = [req.body.text_search];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/search');
            }
        });
    });*/

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatelocation.js"];
        var mysql = req.app.get('mysql');
        getLocation(res, mysql, context, req.params.id, complete);
        function complete()
        {
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-search', context);
            }

        }
    });
    
    /*update data is sent to in order to update a Locations */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Locations SET state=?, city=? zipCode=? locationID=?";
        var inserts = [req.body.state, req.body.city, req.body.zipCode, req.params.id];
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

    //Insert for a location
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Locations (locationID, hikeID, state, city, zipCode) VALUES (NULL,?,?,?,?)";
        var inserts = [req.body.hikeName, req.body.state, req.body.city, req.body.zipCode];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/search');
            }
        });
    });

    //Delete a location
    router.delete('/:id', function(req, res){
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM Locations WHERE locationID = ?";
            var inserts = [req.params.id];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields)
            {
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
