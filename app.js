var express = require('express');
var bodyparser = require('body-parser');

var chalk = require('chalk');
var db = require('./public/javascripts/db.js'); 
var app = module.exports = express(); 
var routes = require('./routes/users.js');


app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.get('/emp', routes.showAll);
app.post('/insert', routes.insert);
app.put('/update', routes.update);
app.delete('/delete', routes.delete);

//error handling
app.use("*", function(req, res) {});

app.use(function(error, req, res, next) {
    console.log(chalk.red('Error : 500::' + error))
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log(chalk.green("Http server is listening on port [" + port + '] '));
});