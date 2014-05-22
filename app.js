
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var test = require('./routes/test');
var user = require('./routes/user');
var userProp = require('./routes/userProp');
//var userWF = require('./routes/userWF');
var http = require('http');
var path = require('path');

var app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', require('ejs-locals')); 


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/',test.index);
app.get('/users', user.list);
app.post('/',routes.index); 
//app.post('/',test.index);
app.post('/users',userProp.edit);
//app.post('/userwf',userWF.edit);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
