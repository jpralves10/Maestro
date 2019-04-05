import { Injectable } from '@angular/core';
import { AuthService } from '../../../utilitarios/auth.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Filter } from '../models/filter.model'

import {EFICILOG_API} from '../../../utilitarios/app.api'

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient
    ) {
        httpClient
            .get(`${EFICILOG_API}/relatorios/representacoes/filtros`)
            .subscribe(data => console.log('resultado request:', data));
    }

    getDadosFiltro(): Observable<Filter> {
        return this.httpClient.get<Filter>(`${EFICILOG_API}/relatorios/representacoes/filtros`);
    }
}