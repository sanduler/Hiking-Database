module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //Selects all People to display to user
    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT peopleID as id, username, firstName, lastName FROM People", function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.hiker = results;
                complete();
        });
    }

    //update
    function getPerson(res, mysql, context, id, complete){
        var sql = "SELECT peopleID as id, username, firstName, lastName FROM People WHERE peopleID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }


    //Router to display user page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');

        //Calling select functions
        getPeople(res, mysql, context, complete);

        //Complete function makes sure all select functions have finished before rendering page
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('user', context);
            }
        }
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateperson.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        function complete()
        {
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-user', context);
            }

        }
    });

    /*update data is sent to in order to update a customer */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE People SET username=?, firstName=?, lastName=? WHERE peopleID=?";
        var inserts = [req.body.username, req.body.firstName, req.body.lastName, req.params.id];
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

    //Insert for a person
    router.post('/', function(req, res)
    {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO People (peopleID, username, password, firstName, lastName) VALUES (NULL,?,?,?,?)";
        var inserts = [req.body.username, req.body.password, req.body.firstName, req.body.lastName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/user');
            }
        });
    });


    //Delete for a person
    router.delete('/:id', function(req, res)
    {
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM People WHERE peopleID = ?";
            var inserts = [req.params.id];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields)
            {
                if(error){
                    console.log(error)
                    res.write(JSON.stringify(error));
                    res.status(400);
                    res.end();
                }
                else
                {
                    res.status(202).end();
                }
            })
        })
    return router;
    }();