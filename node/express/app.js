
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , express = require('express')
  , consolidate = require('consolidate')
  , swig = require('swig'); 


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/', routes.index);
app.get('/hello', routes.hello);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
