import { Injectable } from '@angular/core';
import { AuthService } from '../../../utilitarios/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Filter } from '../models/unificacao.filter.model';
import { Produto } from '../models/produto.model';

import { EFICILOG_API, EFICILOG_API_HOMOLOCACAO } from '../../../utilitarios/app.api';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

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

    //Teste
    serverNode(): Observable<Produto> {
        return this.httpClient.get<Produto>(
            `http://localhost:3443/teste`
        );
    }
}