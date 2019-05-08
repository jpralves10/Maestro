import { Request, Response } from 'express';
//import * as CatalogoProdutosData from './data';

var request = require('request');

export const form = async (req: Request, res: Response) => {

    console.log('aQUI');

    /*request('https://forms.gle/gzoCcWdQMWp6EeaH6', { json: true }, (err, res, body) => {

        if (err) { return console.log(err); }

        console.log(body.url);
        console.log(body.explanation);
    });*/

    var headers = {
        'Access-Control-Allow-Origin': '*',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'content-encoding': 'gzip',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'max-age=0',
        'upgrade-insecure-requests': '1',
        'x-client-data': 'CJG2yQEIpLbJAQjEtskBCKmdygEIqKPKAQiqpMoBCLGnygEI4qjKAQjwqcoB'
    }

    let formsResp = await request({
        headers: headers,
        uri: 'https://docs.google.com/forms/d/e/1FAIpQLScRaga2_Hptwn4Gh_4mqzn-axQoAX_Ai1b2VGuzZnSSKlQwuA/viewform',
        method: 'GET'
    }, (err, res1, body) => {
        if (err) { return console.log(err); }

        //it works!

        /*var obj = res1.headers

        Object.entries(obj).forEach(([key, value]) => {
            //console.log(key + ': ' + value);
            res.append(key, value)
        });*/

        /*req.header("Access-Control-Allow-Origin", "*");
        req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/

        res.set(res1.headers);

        //res.send({'aqui': 'a'});
        res.send(res1.body);
    });

    console.log('formsResp: ' + formsResp);
};

/*export const alterar = async (req: Request, res: Response) => {

    if (CatalogoProdutosData.atualizar(req.body)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
};

export const extrato = async (req: Request, res: Response) => {

    res.set('Content-Type', 'application/octet-stream');
    res.attachment(`Extrato-${req.query.cnpj}.csv`);
    res.status(200)
    .send(
        new Buffer(await CatalogoProdutosData.getAllIntegrados(req.query.cnpj))
    );
};*/