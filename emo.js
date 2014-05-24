/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path');



var app = express();

// Twig init
var Twig = require('twig'),
	twig_ob = require('twig_obj');
Twig.extend(twig_ob);

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
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

////////////
// Routes //
////////////


var express_routes = require('./routes/express');
express_routes(app);


////////////////
// End Routes //
////////////////


var server = http.createServer(app);

// express
server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

// socket.io
var socket_io = require('socket.io'),
	io = socket_io.listen(server);
require('./routes/socket.io')();

