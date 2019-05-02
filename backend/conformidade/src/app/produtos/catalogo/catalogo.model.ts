export interface Atributo {
    atributo: string;
    valor: string;
}

export interface CodigoInterno {
    valor: string;
}

export interface Compatibilidade {
    similaridade: number;
    identicos: number;

    verde: number;
    amarelo: number;
    vermelho: number;
    cinza: number;
}

export interface Declaracao {
    numeroDI: string;
    dataRegistro: Date;
    importadorNome: string;
    importadorNumero: string;
    numeroAdicao: string;
    canal: string; //canalSelecaoParametrizada
}

export interface Produto {
    /** Controle Interno **/
    _id: string;
    status: string;
    descricaoBruta: string;
    etapaConformidade?: number;
  
    /** Informações Declaracao **/
    numeroDI: string;
    dataRegistro: Date;
    importadorNome: string;
    importadorNumero: string;
    numeroAdicao: string;
    canal: string;
  
    // lista caso estejam unidos
    declaracoes?: Declaracao[];
  
    /** Versões Produto **/
    versoesProduto: Produto[];
    compatibilidade: Compatibilidade;

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
    cpfCnpjFabricante: string;
    codigoOperadorEstrangeiro: string;
    atributos: Array<Atributo>;
    codigosInterno: Array<string>;
}