import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Filter } from '../models/filter.model';
import { FilterItem } from '../models/filter.model';
import { FilterResult } from '../models/filter-result.model';

import { ConsultaService } from '../services/consulta.service';
import { FilterService } from '../services/filter.service';
import { ImportersListComponent } from './importers-list/importers-list.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    data: Filter = null;
    loading = true;
    errored = false;

    @Input() current_filtro: FilterItem = {
        importer: {cpf_cnpj: '', name: ''}
    };

    filtro: Filter = { importers: [] };

    constructor(
        private consultaService: ConsultaService,
        private filterService: FilterService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        filterService.filterResult.subscribe(f => {
            this.filtro = f;
        });
    }

    ngOnInit() {
        this.filterService.resetFilter();

        this.consultaService.getDadosFiltro().subscribe(
            data => {
                this.data = this.getDataTransformed(data);
                window.sessionStorage.setItem('filter', JSON.stringify(this.data));
                this.loading = false;
            },
            error => { this.errored = true; }
        );
        this.filterService.clearFilter();
    }

    public getDataTransformed(data: any): Filter {
        return {
            importers: Object.keys(data.importers)
                .map(key => {
                    const importer = data.importers[key];
                    return {
                        id: key,
                        cpf_cnpj: importer.cpf_cnpj,
                        name: importer.name
                    };
                })
                .sort(a => a.name)
        }
    }

    public updateFiltro() {
        this.filterService.changeFilter(this.current_filtro);
    }

    public updateFiltroFinal() {
        this.filterService.changeFilterResult(this.filtro);
    }

    public generateReport() {
        this.router.navigate([`./result`], {
            relativeTo: this.route,
            replaceUrl: true,
            queryParams: {
                filter: this.getFilterAsString()
            }
        });
    }

    public getFilterAsString(): string {

        var cnpjRaiz = this.filtro.importers.map(i => 
            i.cpf_cnpj.replace(/[/\/\-\.]/g, '').substring(0, 8)
        );

        return JSON.stringify({
            importers: cnpjRaiz,
            importadores: this.listaCNPJ(cnpjRaiz),
            status: ['Pendente'],
            start_date: this.filtro.data_inicio,
            end_date: this.filtro.data_fim
        } as FilterResult);
    }

    public listaCNPJ(cnpjRaiz: string[]): [{}]{

        let listaImporters: any = [];

        if(cnpjRaiz.length > 0){

            for(let importer of this.data.importers){
                let cpf_cnpj = importer.cpf_cnpj.replace(/[/\/\-\.]/g, '');
    
                if(cpf_cnpj.includes(cnpjRaiz[0])){
                    listaImporters.push({
                        name: importer.name, 
                        cnpj: importer.cpf_cnpj, 
                        checked: true
                    });
                }
            }
        }
        return listaImporters;
    }
}