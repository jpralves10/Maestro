import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { Produto, ProdutoClass } from '../../../models/produto.model';
import { ProdutosTwoDataSource } from './produtos-two-datasource';
import { ResultItem } from '../../../models/result-item.model';
import { Result } from '../../../models/result.model';

import { ConsultaService } from '../../../services/consulta.service';
import { ResultService } from '../../../services/result.service';

@Component({
  selector: 'app-produtos-two',
  templateUrl: './produtos-two.component.html',
  styleUrls: ['./produtos-two.component.scss']
})
export class ProdutosTwoComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() produto: Produto;
    @Output() produtoAlterado = new EventEmitter();

    inativos: Produto[] = [];

    data: Produto[];
    public loading = true;
    public errored = false;

    selection = new SelectionModel<Produto>(true, []);

    dataSource: ProdutosTwoDataSource;

    current_filtro: ResultItem = {
        produto: {numeroDI: '', descricaoBruta: '', ncm: '', status: ''}
    };

    displayedColumns = ['select', 'descricaoBruta', 'operacoes'];

    public filtroValue: ResultItem;
    public currentFilter: Result;

    constructor(
        private consultaService: ConsultaService,
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

        /*this.consultaService.getProdutosPorCodigoProduto(this.produto.codigosInterno[0].valor).subscribe(mercadorias =>{
            this.data = mercadorias; //this.getDataTransformed(adicoes);
            window.sessionStorage.setItem('mercadorias', JSON.stringify(this.data));

            this.loading = false;
        },
        error => { this.errored = true;})*/        
    }

    ngOnInit() {
        this.loading = false;

        if(this.produto.versoesProduto === null || this.produto.versoesProduto === undefined){
            this.produto.versoesProduto = this.getMockDados();
        }

        if(this.produto.descricao !== null && this.produto.descricao.length <= 0){
            this.produto.descricao = this.produto.descricaoBruta;
        }

        this.dataSource = new ProdutosTwoDataSource(
            this.paginator,
            this.sort,
            this.resultService,
            this.produto.versoesProduto
        );
    }

    public updateFiltro() {
        this.resultService.changeFilter(this.current_filtro);
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
            ds => !this.selection.selected.some(
                s => s.codigoSistema === ds.codigoSistema
            )
        );
    }

    deselectAll() {
        this.selection.clear();
        this.paginator.firstPage();
    }

    inativarProduto(row: Produto) {
        this.produto.versoesProduto.splice(this.produto.versoesProduto.indexOf(row), 1);
        this.dataSource.data = [...this.produto.versoesProduto];
        this.dataSource.fullData = [...this.produto.versoesProduto];

        row.status = 'Inativo';
        this.inativos.push(row);

        setTimeout(() => {
            this.selection.toggle(row);
            this.dataSource.getUpdatedData();
            this.updateFiltro();
        }, 500);
    }

    inativarTodos(){
        const visibleData = this.getVisibleData();
        visibleData.forEach(row =>{
            this.inativarProduto(row)
        })
    }

    proximaEtapa(){
        /*this.consultaService.setProdutosInativos(this.inativos).subscribe(inativos =>{
            return
        },
        error => { this.errored = true;})*/

        this.produto.etapaConformidade++;
        this.produtoAlterado.emit(this.produto);
    }

    public voltarEtapa(){
        this.produto.etapaConformidade--;
        this.produtoAlterado.emit(this.produto);
    }

    public getMockDados(): Produto[]{

        var produto: Produto = new ProdutoClass();

        produto.seq = "001";
        produto.codigo = 123;
        produto.numeroDI = "01234567891"
        produto.dataRegistro = "20190403";
        produto.status = "Complementar";
        produto.etapaConformidade = 0;
        produto.descricaoBruta = "410102469R PINCA DO FREIO DIANTEIRO PARA VEICULO AUTOMOVEL";
        produto.descricao = "";
        produto.cnpjRaiz = "00913443000173";
        produto.situacao = "ATIVADO";
        produto.modalidade = "IMPORTACAO";
        produto.ncm = "77083999";
        produto.codigoNaladi = null;
        produto.codigoGPC = null;
        produto.codigoGPCBrick = null;
        produto.codigoUNSPSC = null;
        produto.paisOrigem = "FR";
        produto.fabricanteConhecido = false;
        produto.codigoOperadorEstrangeiro = null;
        produto.atributos = null;
        produto.codigosInterno = null
        

        var produto2 = {...produto};
        produto2.numeroDI = "09999967891";
        produto2.descricaoBruta = "410004800R PINCA DO FREIO DIANTEIRO PARA VEICULO AUTOMOVEL";
        produto2.ncm = "87083090";
        produto2.status = "Em Conformidade";
        var produto3 = {...produto};
        var produto4 = {...produto};
        var produto5 = {...produto};
        var produto6 = {...produto};
        var produto7 = {...produto};
        var produto8 = {...produto};
        var produto9 = {...produto};
        var produto10 = {...produto};
        var produto11 = {...produto};

        var produtosList: Produto[] = [];
        produtosList.push(
            produto,
            produto2,
            produto3,
            produto4,
            produto5,
            produto6,
            produto7,
            produto8,
            produto9,
            produto10,
            produto11
        );

        let codigo = 0;

        produtosList.forEach(produto =>{
            produto.codigoSistema = ++codigo;
        })

        return produtosList;
    }
}