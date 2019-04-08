export interface LegendaProduto {
    value: string;
    viewValue: string;
}

export interface Atributos {
    atributo: string;
    valor: string;
}

export class AtributosClass implements Atributos {
    atributo: string;
    valor: string;
}