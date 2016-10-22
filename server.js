//var http = require('http');
//var port = process.env.port || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);

var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

// var env = process.env.NODE_ENV = process.env.NODE_ENV | 'development';
var env = process.env.NODE_ENV || 'development';
console.log('Environment: ' + env);
var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}
));

if ('development' == env) {
   // configure stuff here
    app.use(express.static(__dirname + '/public'));   
} else {
    app.use(express.static(__dirname + '/public'));
}

app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

// ideally these should match with ng-routes for favicon etc., as a good practice
app.get('*', function (req, res) {
    res.render('index');
});

console.log('Getting Port ...')
app.listen(process.env.PORT || 3030, function () {
  console.log('Example app listening');
});
console.log(port)