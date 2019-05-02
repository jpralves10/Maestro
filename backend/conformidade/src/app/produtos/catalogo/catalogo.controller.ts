import { Request, Response } from 'express';
//import * as CatalogoProdutosData from './data';

export const filtro = async (req: Request, res: Response) => {

    /*const produtos = await CatalogoProdutosData.filtro(req.body);
    res.json({ produtos });*/
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