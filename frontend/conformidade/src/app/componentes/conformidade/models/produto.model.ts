import { Atributos, CodigoInterno, Compatibilidade } from './legendas.model';

export interface Produto {

    /** Controle Interno **/
    _id: string;
    numeroDI: string;
    dataRegistro: string;
    status: string;
    descricaoBruta: string;
    compatibilidade: Compatibilidade;
    etapaConformidade: number;
    versoesProduto: Produto[];

    /** Histórico **/
    dataCriacao: Date;
    dataAtualizacao: Date;
    usuarioAtualizacao: string;

    /** Integração API **/
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

    _id: string;
    numeroDI: string;
    dataRegistro: string;
    status: string;
    descricaoBruta: string;
    compatibilidade: Compatibilidade;
    etapaConformidade: number;
    versoesProduto: Produto[];

    dataCriacao: Date;
    dataAtualizacao: Date;
    usuarioAtualizacao: string;
    
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