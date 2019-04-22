import { Component, OnInit, Inject, Input, ViewChild, Directive } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Produto } from '../../models/produto.model';
import { ProdutosListDataSource } from './produtos-list-datasource';
import { ResultItem } from '../../models/result-item.model';
import { Result } from '../../models/result.model';
import { ResultService } from '../../services/result.service';
import { ProdutosListDialog } from './produtos-list.dialog'

import { Chart } from 'chart.js';

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

    filteredData: Produto[];

    canalVerde: number = 0;
    canalAmarelo: number = 0;
    canalVermelho: number = 0;
    canalCinza: number = 0;

    eventTable: number = 0;

    selection = new SelectionModel<Produto>(true, []);

    dataSource: ProdutosListDataSource;

    displayedColumns = ['descricaoBruta', 'ncm', 'canal', 'declaracoes'];

    public filtroValue: ResultItem;
    public currentFilter: Result;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private resultService: ResultService,
        private modalService: NgbModal
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
        this.data.forEach(produto =>{
            this.agruparDeclaracoes(produto);
        });

        this.dataSource = new ProdutosListDataSource(
            this,
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

        this.setChartList(this.getVisibleData());
    }
    
    /** Filtro Mat Table **/

    updateFiltro() {
        this.resultService.changeFilter(this.filtroValue);
    }

    updateDataSource(data: Produto[]){
        this.dataSource.data = [...data];
        this.dataSource.fullData = [...data];
        this.updateFiltro();
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

    openDialogDeclaracoes(row: Produto): void {
        var modalRef = this.modalService.open(ProdutosListDialog);
        modalRef.componentInstance.produto = row;
    }

    /** Chart Doughnut **/

    setChartList(produtos: Produto[]){
        produtos.forEach(produto =>{
            let ctx = document.getElementById("list-" + produto._id);
            new Chart(ctx, this.getChartDoughnut(produto));
        });
    }

    projectContentChanged(event: any){
        if(this.eventTable == 1){
            this.setChartList(this.getVisibleData());
            this.eventTable = 0;
        }        
    }

    projectPageEvent(event: any){
        if(event != undefined){
            this.eventTable = 1;
        }
    }

    agruparDeclaracoes(produto: Produto){

        produto.declaracaoNode = [];
        produto.chartCanais = [];

        if(produto.declaracoes != null && produto.declaracoes != undefined){

            produto.declaracoes.forEach(declaracao_one =>{

                let itemExistente = false;
                for (let item of produto.declaracaoNode){
                    if(item.cnpj == declaracao_one.importadorNumero){
                        itemExistente = true;
                    }
                }
                if(!itemExistente){
    
                    let declaracaoNode = {
                        name: declaracao_one.importadorNome,
                        cnpj: declaracao_one.importadorNumero,
                        toggle: true,
                        declaracoes: []
                    }

                    produto.declaracoes.forEach(declaracao_two => {
                        if(declaracao_one.importadorNumero == declaracao_two.importadorNumero){
                            declaracaoNode.declaracoes.push({
                                numeroDI: declaracao_two.numeroDI,
                                dataRegistro: declaracao_two.dataRegistro,
                                numeroAdicao: declaracao_two.numeroAdicao,
                                canal: Number(declaracao_two.canal)
                            });
                            this.calcularQtdCanais(Number(declaracao_two.canal))
                        }
                    })

                    produto.declaracaoNode.push(declaracaoNode);
                }            
            })

            produto.chartCanais = [
                this.canalVerde,
                this.canalAmarelo,
                this.canalVermelho,
                this.canalCinza
            ]
        }
    }

    calcularQtdCanais(canal: number){
        canal == 1 ? this.canalVerde++ : 
        canal == 2 ? this.canalAmarelo++ :
        canal == 3 ? this.canalVermelho++ :
        this.canalCinza++
    }

    getChartDoughnut(produto: Produto){

        let data = {
            datasets: [
                {
                    data: produto.chartCanais, //[10, 20, 30, 40],
                    backgroundColor: [
                        "#A3E4D7",
                        "#F9E79F",
                        "#F5B7B1",
                        "#CCD1D1"
                    ]
                }
            ]
        };
    
        let options: {
            layout: {
                padding: {
                    width: 5,
                    height: 5,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }

        return {
            type: 'doughnut',
            data: data,
            options: options
        }
    }
}