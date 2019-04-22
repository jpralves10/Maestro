import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import $ from "jquery";

import { msg_produtos_two } from '../../../../../utilitarios/mensagens.module';

import { Produto } from '../../../models/produto.model';
import { Compatibilidade } from '../../../models/legendas.model';
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
    loading = true;
    errored = false;
 
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
                        status: ['Pendente', 'Completo', 'Aprovado', 'Integrado'],
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
            this.loading = false;
            this.setDataSource();

            /*if(this.produto.versoesProduto != null || this.produto.versoesProduto != undefined){
                this.produto.versoesProduto = this.getMockDados();
                this.setDataSource();
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

        var compatibilidade: Compatibilidade = {
            similaridade: 7,
            identicos: 4,
            verde: 5,
            amarelo: 3,
            vermelho: 2,
            cinza: 1
        }

        var produto: Produto = {
            _id: null,
            seq: "001",
            codigo: null,
            numeroDI: "01234567891",
            dataRegistro: "18042019",
            status: "Pendente",
            etapaConformidade: 0,
            descricaoBruta: "410102469R PINCA DO FREIO DIANTEIRO PARA VEICULO AUTOMOVEL",
            descricao: "",
            cnpjRaiz: "00913443000173",
            situacao: null, //"ATIVADO",
            modalidade: undefined, //"IMPORTACAO",
            ncm: "77083999",
            codigoNaladi: null,
            codigoGPC: null,
            codigoGPCBrick: null,
            codigoUNSPSC: null,
            paisOrigem: "FR",
            fabricanteConhecido: "FALSE",
            cpfCnpjFabricante: null,
            codigoOperadorEstrangeiro: null,
            atributos: null,
            codigosInterno: null,
            dataCriacao: null,
            dataAtualizacao: null,
            usuarioAtualizacao: null,
            declaracoes: [],
            versoesProduto: [],
            compatibilidade: compatibilidade,
            declaracaoNode: [],
            chartCanais: []  ,
            canalDominante: 0      
        }
        

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