/**
 * Module dependencies
 */
var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/**
 * Configuration
 */

// All environments
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

// Everything in the public folder as static
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// Development only
if (env === 'development') {
  app.use(errorHandler());
}

// Production only
if (env === 'production') {
  // TODO
}

/**
 * Routes
 */

// Serve index and view partials
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Redirect all others to the index (HTML5 history) - solve deep-links
app.get('*', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
