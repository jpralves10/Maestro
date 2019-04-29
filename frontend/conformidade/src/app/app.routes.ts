import { Routes } from '@angular/router'

import { IndicadoresComponent } from './dashboard/indicadores/indicadores.component';
import { ImportacaoComponent } from './produtos/importacao/importacao.component';
import { CatalogoComponent } from './produtos/catalogo/catalogo.component';
import { ClassificacaoComponent } from './produtos/classificacao/classificacao.component';

export const ROUTES: Routes = [
    { path: '', component: IndicadoresComponent },
    { path: 'importacao', component: ImportacaoComponent },
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'classificacao', component: ClassificacaoComponent },
    { path: 'unificacao', loadChildren: './produtos/unificacao/unificacao.module#UnificacaoModule' },
    { path: '**', redirectTo: '' }
]