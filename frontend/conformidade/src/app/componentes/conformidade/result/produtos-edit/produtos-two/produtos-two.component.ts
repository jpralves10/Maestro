import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import $ from "jquery";

import { msg_produtos_two } from '../../../../../utilitarios/mensagens.module';

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
 
    mensagem: any = {id: 0, tipo: '', class: '', lista: []};

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
    }

    ngOnInit() {
        if(this.produto !== null && this.produto !== undefined){

            if(this.produto.descricao.length <= 0){
                this.produto.descricao = this.produto.descricaoBruta;
            }

            if(this.produto.codigosInterno.length > 0){

                this.consultaService.getProdutosGenerico(
                    {
                        cnpjRaiz: this.produto.cnpjRaiz,
                        status: this.produto.status,
                        codigoInterno: this.produto.codigosInterno[0],
                        descricaoBruta: this.produto.descricaoBruta,
                        ncm: this.produto.ncm
                    }
                ).subscribe(versoes => {
                    var produtos: Produto[] = (versoes as any).produtos;

                    produtos.forEach(produto => {
                        if(this.produto._id !== produto._id){
                            this.produto.versoesProduto.push(produto);
                        }
                    });

                    window.sessionStorage.setItem('mercadorias', JSON.stringify(this.data));
                    this.setDataSource();
                },
                error => { this.errored = true;})
            }

            this.produto.versoesProduto = [];
            this.setDataSource();
            this.loading = false;

            /*if(this.produto.versoesProduto === null || this.produto.versoesProduto === undefined){
                this.produto.versoesProduto = this.getMockDados();
            }*/
        }
    }

    setDataSource(){
        this.dataSource = new ProdutosTwoDataSource(
            this.paginator,
            this.sort,
            this.resultService,
            this.produto.versoesProduto
        );
    }

    updateFiltro() {
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
                s => s._id === ds._id
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

    public validaDescricao(event: any){
        if(this.produto.descricao.length <= 0){
            
            this.setMensagem('message-alert-warning');

            $( "#next-two" ).prop("disabled", true);
            $( "#next-two" ).attr("style", "background-color:#673AB7; color:#fff;");
        }else{
            this.mensagem = null;
            $( "#next-two" ).prop("disabled", false);
        }
    }

    public setMensagem(tpMensagem: string){
        for(let msg of msg_produtos_two) {
            msg.tipo == tpMensagem ? this.mensagem = msg : this.mensagem = null;
        }
    }

    public voltarEtapa(){
        this.produto.etapaConformidade--;
        this.produtoAlterado.emit(this.produto);
    }

    public getMockDados(): Produto[]{

        var produto: Produto = new ProdutoClass();

        produto.seq = "001";
        produto.codigo = null;
        produto.numeroDI = "01234567891"
        produto.dataRegistro = "18042019";
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
        produto.fabricanteConhecido = 'FALSE';
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
            produto._id = ++codigo + '';
        })

        return produtosList;
    }
}