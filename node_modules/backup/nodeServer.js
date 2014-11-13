var express = require('express'),
    pics = require('./routes/pics'),
    path = require('path'),
    http = require('http'),
    tags = require('./routes/tags');
 
var app = express();
 
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/pics', pics.findAll);
app.get('/pics/:id', pics.findById);


app.get('/tags', tags.findAll);
app.get('/tags/:id', tags.findById);
app.post('/tags', tags.addTag);
app.put('/tags/:id', tags.updateTag);
app.delete('/tags/:id', tags.deleteTag);
 

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});