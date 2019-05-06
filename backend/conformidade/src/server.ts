import Express from 'express';
import Cors from 'cors';

import Https from 'https';
import fs from 'fs';

import BodyParser from 'body-parser';
import Auth from './config/auth';

import RouterProdutos from './app/produtos/router';

var server = Express();

/* Middleware */

server.use(Cors());
server.use(BodyParser.json());
server.use(Auth);

server.use(
  BodyParser.urlencoded({
    extended: true
  })
);

/* Rotas */

server.get("/", function(req, res){ res.send("<h1>Hello World 123456<h2>"); });

server.use('/produtos/catalogo', RouterProdutos);

//server.get('*', (req, res) => { res.sendStatus(404); });

server.use(function(err, req, res, next) { res.status(500).json(err); });

/* Server Start */

var options = {
	key: fs.readFileSync("./keys/key.key"),
	cert: fs.readFileSync("./keys/cert.crt")
}

var serverHttps = Https.createServer(options, server).listen(3443, function () {
    console.log('Server is running on http://localhost:3443');
})
.on('error', err => console.log(err));

/* Close Server */

/*serverHttps.close(() =>{
    console.log('Finish Server!')
})

process.on('SIGTERM', () => {
    console.log('Closing http server.');
    serverHttps.close(() => {
        console.log('Http server closed.');
    });
});*/