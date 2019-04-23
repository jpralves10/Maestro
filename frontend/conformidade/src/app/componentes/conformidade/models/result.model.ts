import { Produto } from './produto.model';

export interface Result {
    produtos: Produto[];
    data_inicio?: Date;
    data_fim?: Date;
}

export class ResultClass implements Result{
    produtos: Produto[];
}