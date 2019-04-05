import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Filter } from '../models/filter.model';
import { FilterItem } from '../models/FilterItem.model';
import { FilterResult } from '../models/filterResult.model';

import { DataService } from '../services/dados.service';
import { FilterService } from '../services/filter.service';
import { DeclaracaoDIService } from '../services/adicaoDI.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    data: Filter = null;
    loading = false;
    errored = false;
    declaracaoDI = false;

    @Input() current_filtro: FilterItem = {
        importer: {cpf_cnpj: '', name: ''}
    };

    filtro: Filter = {
        importers: []
    };

    constructor(
        private dataService: DataService,
        private filterService: FilterService,
        private declaracaoDIService: DeclaracaoDIService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        //this.filterResultService.resetFilter();
        this.dataService.getDadosFiltro().subscribe(
            data => {
                this.data = this.getDataTransformed(data);
                window.sessionStorage.setItem('filter', JSON.stringify(this.data));
                this.loading = false;
            },
            error => { this.errored = true;}
        );
        this.filterService.clearFilter();
    }

    public updateFiltro() {
        this.filterService.changeFilter(this.current_filtro);
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
        return JSON.stringify({
            importers: this.filtro.importers.map(i => parseInt(i.id, 10)),
            start_date: this.filtro.data_inicio,
            end_date: this.filtro.data_fim
        } as FilterResult);
    }
}