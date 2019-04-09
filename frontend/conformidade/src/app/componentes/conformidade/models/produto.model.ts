import { Atributos, CodigoInterno } from './legendas.model';

export interface Produto {

    codigoSistema: number;
    numeroDI: string;
    dataRegistro: string;
    status: string;
    descricaoBruta: string;
    
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
    codigosInterno: CodigoInterno[];
}

export class ProdutoClass implements Produto{

    codigoSistema: number;
    numeroDI: string;
    dataRegistro: string;
    status: string;
    descricaoBruta: string;
    
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
    codigosInterno: CodigoInterno[];
}