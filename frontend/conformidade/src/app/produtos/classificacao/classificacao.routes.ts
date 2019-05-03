import { ClassificacaoComponent } from './classificacao.component';
import { ComentariosComponent } from './comentarios/comentarios.component';

export const CLASSIFICACAO_ROUTES = [
    { path: '', component: ClassificacaoComponent },
    { path: 'comentarios-edit', component: ComentariosComponent },
    { path: '**', redirectTo: '' }
];