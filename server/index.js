var fs = require('fs'),
    path = require('path'),
    https = require('https'),
    express = require('express'),
    compression = require('compression'),
    colors = require('colors/safe'),
    app = express();

https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
}, app).listen(1234);

console.log(colors.green('*** Serving:', process.argv[2] + '/build'));

app.use(compression());
app.use(express.static(process.argv[2] + '/build'));