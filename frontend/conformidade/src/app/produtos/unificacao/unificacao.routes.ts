import { FilterComponent } from './filter/filter.component';
import { ResultComponent } from './result/result.component';
import { ProdutosEditComponent } from './result/produtos-edit/produtos-edit.component';
import { IndicadoresComponent } from 'src/app/dashboard/indicadores/indicadores.component';

export const UNIFICACAO_ROUTES = [
    { path: '', component: FilterComponent },
    { path: 'result', component: ResultComponent },
    { path: 'produtos-edit', component: ProdutosEditComponent },
    { path: '**', redirectTo: '' }
];