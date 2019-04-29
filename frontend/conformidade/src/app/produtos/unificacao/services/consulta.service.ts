import { Injectable } from '@angular/core';
import { AuthService } from '../../../utilitarios/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Filter } from '../models/filter.model';
import { Produto } from '../models/produto.model';
import { FilterResult } from '../models/filter-result.model';

import { EFICILOG_API, EFICILOG_API_HOMOLOCACAO } from '../../../utilitarios/app.api';
import { Declaracao } from '../models/legendas.model';

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    constructor(private httpClient: HttpClient){}

    getDadosFiltro(): Observable<Filter> {
        return this.httpClient.get<Filter>(
            `${ EFICILOG_API }/relatorios/representacoes/filtros`
        );
    }

    getProdutosGenerico(filtro: any): Observable<Produto[]> {
        return this.httpClient.post<Produto[]>(
            `${ EFICILOG_API_HOMOLOCACAO }/catalogo-produtos/filtro`, filtro
        );
    }

    setAlterarProdutos(produto: Produto): Observable<Produto> {
        return this.httpClient.post<Produto>(
            `${ EFICILOG_API_HOMOLOCACAO }/catalogo-produtos/alterar`, produto
        );
    }

    setProdutosInativos(inativos: Produto[]): Observable<Produto[]> {
        return this.httpClient.post<Produto[]>(
            `${ EFICILOG_API }/produtos/unificacao/inativos`, inativos
        );
    }    
}