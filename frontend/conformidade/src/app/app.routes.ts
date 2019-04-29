import { Routes } from '@angular/router'

import { HomeComponent } from './shared/home/home.component';
import { IndicadoresComponent } from './dashboard/indicadores/indicadores.component';

/*export const ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'indicadores', component: IndicadoresComponent },
    { path: 'unificacao', loadChildren: './produtos/unificacao/unificacao.module#UnificacaoModule' },
    { path: '**', redirectTo: '' }
]*/

export const ROUTES: Routes = [
    { path: '', component: IndicadoresComponent },
    { path: 'unificacao', loadChildren: './produtos/unificacao/unificacao.module#UnificacaoModule' },
    { path: '**', redirectTo: '' }
]