
/**
 * Dependencies
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var consolidate = require('consolidate');
var swig = require('swig');

var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore(); 


/**
 * Config
 */

var http_port = '8080';
var https_port = '8443';
var private_key_file = 'cert/server.key';
var certificate_file = 'cert/server.crt';


/** 
 * Create Express application 
 */

var app = express();


/** 
 * Configure Express
 */

app.configure(function(){
  app.set('port', process.env.PORT || http_port);
  app.set('https_port', process.env.HTTPS_PORT || https_port);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);  
  app.use(express.static(path.join(__dirname, 'public')));
  // app.use(express.cookieParser());
  // app.use(express.session({ 
  //   store: sessionStore, 
  //   secret: 'topsecret',
  //   key: 'cookie.sid' }));

  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false });
  app.set('view engine', 'html');
  app.engine('html', consolidate.swig);

  swig.init({ root: 'views', cache: false, allowErrors: true });

  app.use(express.errorHandler()); 
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


/** 
 * Basic authentication 
 */

var auth = express.basicAuth(function(user, pass) {
 return user === 'admin' && pass === 'secret';
});


/**
 * Configure routes 
 */
app.get('/', routes.index);
app.get('/hello', routes.hello);
app.get('/cookies', routes.cookies);

// protected by basic auth
app.get('/admin', auth, function(request, response) {
 response.send('Welcome, admin');
});


/** 
 * Start HTTP server
 */

var http_server = http.createServer(app);

http_server.listen(app.get('port'), function() {
  console.log("HTTP server listening on port " + app.get('port'));
});


/** 
 * Start HTTPS server
 */
var https = require('https');

var privateKey = fs.readFileSync(private_key_file).toString();
var certificate = fs.readFileSync(certificate_file).toString();

var options = {
  key : privateKey,
  cert: certificate
}

var https_server = https.createServer(options, app);

https_server.listen(app.get('https_port'), function() {
  console.log("HTTPS server listening on port " + app.get('https_port'));
});



