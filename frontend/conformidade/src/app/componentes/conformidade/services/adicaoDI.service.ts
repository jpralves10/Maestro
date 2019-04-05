import { Injectable } from '@angular/core';
import { AuthService } from '../../../utilitarios/auth.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AdicaoDI } from '../models/adicaoDI.model'

import { CONFORMIDADE_API } from '../../../utilitarios/app.api'

@Injectable({
    providedIn: 'root'
})
export class DeclaracaoDIService {

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient
    ) {
        httpClient
            .get(`${CONFORMIDADE_API}/relatorios/representacoes/filtros`)
            .subscribe(data => console.log('resultado request:', data));
    }

    getDadosResult(): Observable<AdicaoDI> {
        return this.httpClient.get<AdicaoDI>(`${CONFORMIDADE_API}/relatorios/representacoes/filtros`);
    }
}