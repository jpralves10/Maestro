
export interface Compatibilidade {
    avaliados: number;
    identicos: number;
    similares: number;
}

export interface Declaracao {
    numeroDI: string;
    dataRegistro: string;
    sequencial: string;
    canal: string;  //canalSelecaoParametrizada
}

export interface Atributos {
    atributo: string;
    valor: string;
}

export interface Resumo {
    periodoInicial: string, 
    periodoFinal: string, 
    cnpjList: string[], 
    qtdDeclaracoes: number, 
    qtdItens: number, 
    qtdItensCadastrados: number
}