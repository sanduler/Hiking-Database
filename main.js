//Adding all required modules
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
//var path = require('path');

//Starting express and handlebars
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main',});

//Handlebar engines and port number
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8674);
app.set('mysql', mysql);

//Parsing for urls and JSON
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//For using static express files
//app.use(express.static(path.join(__dirname, '/public')));
app.use('/static', express.static('public'));
app.use('/', express.static('public'));

//Index page
app.get('/index', function(req, res, next){
    var context = {};
    res.render('index.handlebars', context);
})

//Home page
app.get('/home', function(req, res, next){
    var context = {};
    res.render('home.handlebars', context);
})

//Add hike page
app.use('/addhike', require('./hike.js'));

//Search page
app.use('/search', require('./search.js'));

//User page
app.use('/user', require('./user.js'));

//Ratings page
app.use('/ratings', require('./ratings.js'));


//404 error page
app.use(function(req, res){
    res.status(404);
    res.render('404.handlebars');
})

//500 error page
app.use(function(err, req, res, next){
    res.type('plain/text');
    res.status(500);
    res.render('500.handlebars');
})

//Starting website
app.listen(app.get('port'), function(){
    console.log("Express started on http://flip3.engr.oregonstate.edu:" + app.get("port") + "; press Ctrl-C to terminate.");
})