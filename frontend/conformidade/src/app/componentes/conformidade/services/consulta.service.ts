import { Injectable } from '@angular/core';
import { AuthService } from '../../utilitarios/auth.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Filter } from '../models/filter.model';
import { Produto } from '../models/produto.model';
import { FilterResult } from '../models/filter-result.model';

import { EFICILOG_API } from '../../utilitarios/app.api';
import { CONFORMIDADE_API } from '../../utilitarios/app.api';

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    constructor(private httpClient: HttpClient){}

    getDadosFiltro(): Observable<Filter> {
        return this.httpClient.get<Filter>(`${EFICILOG_API}/relatorios/representacoes/filtros`);
    }

    getProdutosPorImportador(filter: FilterResult): Observable<Produto[]> {
        return this.httpClient.post<Produto[]>(
            `${ CONFORMIDADE_API }/produtos/conformidade/cnpjimportador`, filter);
    }

    getProdutosPorCodigoProduto(codigo: string): Observable<Produto[]> {
        return this.httpClient.post<Produto[]>(`${ CONFORMIDADE_API }/produtos/conformidade/codigoproduto`, codigo);
    }
}