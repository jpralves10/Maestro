
export interface Compatibilidade {
    rating: number;
    matches: number;
}

export interface Atributos {
    atributo: string;
    valor: string;
}

export interface Resumo {
    periodoInicial: string, 
    periodoFinal: string, 
    listaCnpjs: string[], 
    qtdDeclaracoes: number, 
    qtdItens: number, 
    qtdItensCadastrados: number
};