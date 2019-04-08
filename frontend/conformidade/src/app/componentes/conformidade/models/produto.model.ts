export interface Produto {

    seq: string;
    codigo: number;

    numeroDI: string;
    dataRegistro: string;
    status: string;
    
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

export class ProdutoClass implements Produto{
    seq: string;
    codigo: number;

    numeroDI: string;
    dataRegistro: string;
    status: string;
    
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