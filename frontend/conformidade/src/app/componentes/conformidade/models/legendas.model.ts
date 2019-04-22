
export interface Compatibilidade {
    similaridade: number;
    identicos: number;

    verde: number;
    amarelo: number;
    vermelho: number;
    cinza: number;
}

export interface Declaracao {
    importadorNome: string;
    importadorNumero: string;
    numeroDI: string;
    dataRegistro: string;
    numeroAdicao: string;
    canal: string; //canalSelecaoParametrizada
}

export interface DeclaracaoNode {
    name: string;
    cnpj: string;
    toggle: boolean;
    declaracoes?: any[];
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