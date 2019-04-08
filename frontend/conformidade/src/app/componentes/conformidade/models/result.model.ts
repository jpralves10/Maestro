import { Produto } from './produto.model';

export interface Result {
    produtos: Produto[];
    data_inicio?: string;
    data_fim?: string;
}

export class ResultClass implements Result{
    produtos: Produto[];
}