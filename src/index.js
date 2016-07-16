var restify = require("restify");
var Promise = require('bluebird');
var fs = require('fs');
var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

server.use(restify.CORS({

    // Defaults to ['*'].
    origins: ['http://localhost:8081'],

    // Defaults to false.
    credentials: true,

    // Sets expose-headers.
    headers: ['x-foo']

}));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
    //return resolve(server);
});


server.post('/api/upload-file', function create(req, res, next) {
    console.log('uploadFile: reqData body: ', req.files);
     var read = fs.createReadStream(req.files.file.path);
    res.send(201, req.files.file.path);
    return next();
});


server.get('/api/test-api/:id', function create(req, res, next) {
    res.send(201, req.params);
    return next();
});

server.get('/api/test-get-all-api', function create(req, res, next) {
    res.send(201, req.params.name);
    return next();
});
