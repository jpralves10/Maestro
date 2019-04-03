import { Routes } from '@angular/router'

import { HomeComponent } from './componentes/home/home.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'conformidade', loadChildren: './componentes/conformidade/conformidade.module#ConformidadeModule' },
    { path: '**', redirectTo: '' }
]