var fs = require('fs'),
    path = require('path'),
    https = require('https'),
    express = require('express'),
    app = express();

https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
}, app).listen(1234);

app.use(express.static('build'));