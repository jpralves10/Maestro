import { Atributos } from './legendas.model';

export interface Produto {

    codigoSistema: number;
    numeroDI: string;
    dataRegistro: string;
    status: string;
    
    seq: string;
    codigo: number;
    descricao: string;
    cnpjRaiz: string;
    situacao: string;
    modalidade: string;
    ncm: string;
    codigoNaladi: number;
    codigoGPC: number;
    codigoGPCBrick: number;
    codigoUNSPSC: number;
    paisOrigem: string;
    fabricanteConhecido: boolean;
    codigoOperadorEstrangeiro: string;
    atributos: Atributos[];
    codigosInterno: string[];
}

export class ProdutoClass implements Produto{

    codigoSistema: number;
    numeroDI: string;
    dataRegistro: string;
    status: string;
    
    seq: string;
    codigo: number;
    descricao: string;
    cnpjRaiz: string;
    situacao: string;
    modalidade: string;
    ncm: string;
    codigoNaladi: number;
    codigoGPC: number;
    codigoGPCBrick: number;
    codigoUNSPSC: number;
    paisOrigem: string;
    fabricanteConhecido: boolean;
    codigoOperadorEstrangeiro: string;
    atributos: [
        {
            atributo: string;
            valor: string
        }
    ];
    codigosInterno: string[]
}