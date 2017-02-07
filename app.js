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

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false, limit: 2 * 1024 * 1024 }));
//app.use(bodyParser.json({ limit: 2 * 1024 * 1024 }));
app.use(bodyParser.json({
    verify(req, res, buf) {
        req.rawBody = buf
    }
}))

var routerobj = require('./scripts/registrouter.js');
routerobj.registRouter(app);

var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log('%s listening at %s port %s', app.name, app.url, port);
});
