import { Atributos, Compatibilidade, Declaracao, DeclaracaoNode } from './legendas.model';

export interface Produto {

    /** Controle Interno **/
    _id: string;
    status: string;
    descricaoBruta: string;
    etapaConformidade: number;

    /** Informações Declaracao **/
    numeroDI: string, 
    dataRegistro: string, 
    declaracoes: Declaracao[];
    declaracaoNode: DeclaracaoNode[];
    chartCanais: number[];

    /** Versões Produto **/
    versoesProduto: Produto[];
    compatibilidade: Compatibilidade;

    /** Histórico **/
    dataCriacao: string;
    dataAtualizacao: string;
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
    fabricanteConhecido: any;
    cpfCnpjFabricante: string;
    codigoOperadorEstrangeiro: string;
    atributos: Atributos[];
    codigosInterno: string[];
}

export class ProdutoClass implements Produto{

    /** Controle Interno **/
    _id: string;
    status: string;
    descricaoBruta: string;
    etapaConformidade: number;

    /** Informações Declaracao **/
    numeroDI: string;
    dataRegistro: string;
    declaracoes: Declaracao[];
    declaracaoNode: DeclaracaoNode[];
    chartCanais: number[];

    /** Versões Produto **/
    versoesProduto: Produto[];
    compatibilidade: Compatibilidade;

    /** Histórico **/
    dataCriacao: string;
    dataAtualizacao: string;
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
    fabricanteConhecido: any;
    cpfCnpjFabricante: string;
    codigoOperadorEstrangeiro: string;
    atributos: [
        {
            atributo: string;
            valor: string
        }
    ];
    codigosInterno: string[];
}