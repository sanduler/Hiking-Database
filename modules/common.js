
var methods = {
  getLocations: function(req, res, complete){
    var query = 'SELECT r.locationID, r.state, r.city, r.zipCode FROM `Locations` r ORDER BY r.state, r.city, r.zipCode';
    var mysql = req.app.get('mysql');
    var regions = {};

    function renderLocations(err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }
        var queryOut = [];
        for (var row in rows) {
            var item = {
                locationID: rows[row].locationID,
                state: rows[row].state,
                city: rows[row].city,
                zipCode: rows[row].zipCode
            };
            queryOut.push(item);
        }
        Locations = queryOut;
        //pass it to handlebars to put inside a file
        complete(locations);
    }
    //execute the sql query
    mysql.pool.query(query, renderRegions)
  },  
  
  getHikes: function(req, res, complete){
    var query = 'SELECT r.hikeID, r.distance, r.elevation, r.difficulty FROM `Hikes` r ORDER BY r.hikeID, r.distance, r.elevation, r.difficulty';
    var mysql = req.app.get('mysql');
    var regions = {};

    function renderLocations(err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }
        var queryOut = [];
        for (var row in rows) {
            var item = {
                hikeID: rows[row].hikeID,
                distance: rows[row].distance,
                elevation: rows[row].elevation,
                difficulty: rows[row].difficulty
            };
            queryOut.push(item);
        }
        Hikes = queryOut;
        //pass it to handlebars to put inside a file
        complete(hikes);
    }
    //execute the sql query
    mysql.pool.query(query, renderHikes)
  },  

  getCategories: function(req, res, complete){
    var getCategories = 'SELECT c.ratingID, c.ratingScore, ratingTime FROM Ratings c Order By ratingScore';
    var mysql = req.app.get('mysql');
    var categories = {};

    function returnRatings(err, rows, fields) {
        if (err) {
            console.log(err);
            return;
          }
          var queryOut = [];
          for (var row in rows) {
            var item = {
              ratingID: rows[row].Id,
              RatingsName: rows[row].CategoryName
            };
            queryOut.push(item);
          }
          ratings = queryOut;
          complete(ratings);
    }
    mysql.pool.query(getratings, returnRatings);
  },

  deleteFiles: function(files, callback){
    //This is referenced from stackoverflow: https://stackoverflow.com/questions/14295878/delete-several-files-in-node-js
    var fs = require('fs');
    var i = files.length;
    files.forEach(function(filepath){
        fs.unlink(filepath, function(err) {
          i--;
          if (err) {
              callback(err);
              return;
          } else if (i <= 0) {
              callback(null);
          }
        });
    });
  }
}

module.exports.data = methods;