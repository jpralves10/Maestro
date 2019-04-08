import { FilterComponent } from './filter/filter.component';
import { ResultComponent } from './result/result.component';
import { ProdutosEditComponent } from './result/produtos-edit/produtos-edit.component';

export const CONFORMIDADE_ROUTES = [
    { path: '', pathMatch: 'full', component: FilterComponent },
    { path: 'result', component: ResultComponent },
    { path: 'produtosEdit', component: ProdutosEditComponent },
    { path: '**', redirectTo: '' }
];