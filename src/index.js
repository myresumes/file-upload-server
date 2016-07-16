var restify = require("restify");
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
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
    var folderPath = './upload';
    console.log('uploadFile: reqData body: ', req.files);
    var read = fs.createReadStream(req.files.file.path);
    var ext = path.parse(req.files.file.name).ext;
    var fName = path.basename(req.files.file.name, ext) + '_admin';
    console.log('fileName ', fName);
    var fn = req.files.file.name; //Math.floor(Math.random() * 1000000000000000) + ext;
    var fileName = path.join(folderPath, fName + ext);
    var write = fs.createWriteStream(fileName);
    // req.log.info('Saving the file : ' + fn + '(Rcvd File Name: ' + fileName + ')');
    read.pipe(write);
    write.on('finish', () => {
        /* Save file in db as you wish*/
        // reqData.database.uploadImage.create({
        //                fileName: fn,
        //                filePath: fileName
        //            }).then(function(instance) {
        //                return resolve({
        //                    id: instance.id,
        //                    fileName: reqData.file.path,
        //                    filePath: fn
        //                });
        //            });
        res.send(201, { fileName: fileName });
        return next();
    })

});


server.get('/api/test-api/:id', function create(req, res, next) {
    res.send(201, req.params);
    return next();
});

server.get('/api/test-get-all-api', function create(req, res, next) {
    res.send(201, req.params.name);
    return next();
});
