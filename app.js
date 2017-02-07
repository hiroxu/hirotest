var bodyParser = require('body-parser');
var restify = require('restify');

var type = 'http';
var app = null;

if (type == "http") {
    app = restify.createServer();
} else {
    var https_options = {
        key: fs.readFileSync('./ssl/privkey.pem'),
        cert: fs.readFileSync('./ssl/cert.pem')
    };
    app = restify.createServer(https_options);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routerobj = require('./scripts/registrouter.js');
routerobj.registRouter(app);

var server = app.listen(process.env.port || 8080, function () {
    var port = server.address().port;
    console.log('%s listening at %s port %s', app.name, app.url, port);
});
