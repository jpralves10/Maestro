import { Injectable } from '@angular/core';
import { AuthService } from '../../utilitarios/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Filter } from '../models/filter.model';
import { Produto } from '../models/produto.model';
import { FilterResult } from '../models/filter-result.model';

import { EFICILOG_API, EFICILOG_API_HOMOLOCACAO } from '../../utilitarios/app.api';
import { CONFORMIDADE_API } from '../../utilitarios/app.api';

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

    getProdutosPorImportador(filter: FilterResult): Observable<Produto[]> {
        return this.httpClient.get<Produto[]>(
            `${ EFICILOG_API_HOMOLOCACAO }/catalogo-produtos/busca`,  {
                params: {
                    'cnpjRaiz': filter.importers[0],
                    'dataInicial': filter.start_date,
                    'dataFinal': filter.end_date
                }
            }
        );
    }

    getProdutosPorCodigoProduto(cnpjRaiz: string, codigo: string): Observable<Produto[]> {
        return this.httpClient.get<Produto[]>(
            `${ EFICILOG_API_HOMOLOCACAO }/catalogo-produtos/busca-expressao`, {
                params: {
                    'cnpjRaiz': cnpjRaiz,
                    'expressao': codigo
                }
            }
        );
    }

    setProdutosInativos(inativos: Produto[]): Observable<Produto[]> {
        return this.httpClient.post<Produto[]>(
            `${ EFICILOG_API }/produtos/conformidade/inativos`, inativos
        );
    }    
}