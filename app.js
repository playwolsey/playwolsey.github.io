var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var routes = require('./routes/index');
var app = express();

// view engine
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// sudo node server.js online 表示访问html里面的片段
if (process.argv[2] == 'online'){
    app.use(express.static(path.join(__dirname, 'html')));
    app.use(express.static(__dirname));
}else{
    app.use(express.static(path.join(__dirname, 'demo')));
    app.use(express.static(__dirname));
}

//app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 80);

var server = app.listen(app.get('port'), function() {
    console.log('cp page server listening on port ' + server.address().port);
});
