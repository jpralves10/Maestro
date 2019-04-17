import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Produto } from '../../models/produto.model';
import { ProdutosListDataSource } from './produtos-list-datasource';
import { ResultItem } from '../../models/result-item.model';
import { Result } from '../../models/result.model';
import { ResultService } from '../../services/result.service';
import { Declaracao } from '../../models/legendas.model';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    @Input() data: Produto[];
    @Input() status: string[];

    selection = new SelectionModel<Produto>(true, []);

    dataSource: ProdutosListDataSource;

    displayedColumns = ['descricaoBruta', 'ncm', 'declaracoes'];

    public filtroValue: ResultItem;
    public currentFilter: Result;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private resultService: ResultService
    ) {
        resultService.filter.subscribe(f => (this.filtroValue = f));

        resultService.filterResult.subscribe(fr => (this.currentFilter = fr));

        this.selection.changed.subscribe(() => {
            resultService.changeFilterResult({
                ...this.currentFilter,
                produtos: this.selection.selected
            });
        });
    }

    ngOnInit() {
        this.dataSource = new ProdutosListDataSource(
            this.paginator,
            this.sort,
            this.resultService,
            this.data
        );
    }

    ngAfterViewInit() {
        this.resultService.whenUpdatedSource.next([
            ...this.resultService.whenUpdated,
            this.paginator
        ]);
    }

    masterToggle() {
        const visibleData = this.getVisibleData();
        const allSelected = this.isAllSelected();

        if (allSelected) {
            this.selection.deselect(...visibleData);
        } else {
            this.selection.select(...visibleData);
        }
        return;
    }

    getVisibleData() {
        return this.dataSource.getUpdatedData();
    }

    isAllSelected() {
        const visibleData = this.dataSource.getUpdatedData();
        return !visibleData.some(
            ds => !this.selection.selected.some(s => s.descricao === ds.descricao)
        );
    }

    deselectAll() {
        this.selection.clear();
        this.paginator.firstPage();
    }

    editRowProduto(row: Produto){
        this.router.navigate([`/produtosEdit`], {
            relativeTo: this.route,
            replaceUrl: true,
            queryParams: {
                filterProduto: JSON.stringify({...row})
            }
        });
    }

    viewDeclaracoes(row: Produto){
        
    }
}