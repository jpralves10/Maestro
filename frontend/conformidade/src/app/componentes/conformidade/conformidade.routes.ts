import { FilterComponent } from './filter/filter.component';
import { ResultComponent } from './result/result.component';

export const CONFORMIDADE_ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: FilterComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];