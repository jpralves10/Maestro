import { Component, OnInit, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterResult } from '../models/filter-result.model';
import { Produto, ProdutoClass } from '../models/produto.model';
import { Declaracao } from '../models/legendas.model';
import { ResultItem } from '../models/result-item.model';
import { Result, ResultClass } from '../models/result.model';
import { Resumo } from '../models/legendas.model';

import { ConsultaService } from '../services/consulta.service';
import { ResultService } from '../services/result.service';

import { ProdutosListComponent } from './produtos-list/produtos-list.component';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit {

    @ViewChild(ProdutosListComponent) childProdutosList:ProdutosListComponent;

    public filter: FilterResult;
    public loading = true;
    public errored = false;

    produtos: Produto[];
    data: Result = null;
    status: string[] = [];
    
    resumo: Resumo = {
        periodoInicial: '', 
        periodoFinal: '', 
        cnpjList: [], 
        qtdDeclaracoes: 0, 
        qtdItens: 0, 
        qtdItensCadastrados: 0
    };

    @Input() current_filtro: ResultItem = {
        produto: {numeroDI: '', descricaoBruta: '', ncm: '', status: ''}
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private consultaService: ConsultaService,
        private resultService: ResultService
    ) {
        this.route.queryParamMap.subscribe(paramMap => {
            this.filter = JSON.parse(paramMap.get('filter'));
            this.status = this.filter.status;

            this.produtos = this.getMockDados();  
            this.setDadosResult();
        });

        this.resultService.clearFilter();
    }

    ngOnInit() {

    }

    ngAfterViewInit(){
        console.log(this.childProdutosList.print());
    }

    setDadosResult(){

        this.data = new ResultClass();
        this.data.produtos = [];

        this.produtos.forEach(produto => {
            if(this.status.includes(produto.status)){
                produto.declaracoes = this.getMockDeclaracoes();
                this.data.produtos.push(produto);
            }
        })
        
        this.childProdutosList.updateFiltro();
        this.setResumoCards();
        this.loading = false;

        /*this.consultaService.getProdutosGenerico(
            {
                cnpjRaiz: this.filter.importers[0],
                dataInicial: this.filter.start_date,
                dataFinal: this.filter.end_date,
                status: this.status
                //dataRegistro: {$gte: '2018-04-15T11:46:31.822Z', $lte: '2019-04-15T11:46:31.822Z'},
                //status: {$in: this.status}
            }
        ).subscribe(adicoes => {
            this.data.produtos = (adicoes as any).produtos;

            this.data.produtos.forEach(produto => {
                produto.declaracoes = this.getMockDeclaracoes();
            });

            this.setResumoCards();
            this.loading = false;
        },
        error => { this.errored = true;})*/
    }

    public updateFiltro() {
        this.resultService.changeFilter(this.current_filtro);
    }

    public setResumoCards(){
        this.resumo.periodoInicial = this.filter.start_date;
        this.resumo.periodoFinal = this.filter.end_date;
        this.resumo.cnpjList = this.filter.cnpjList;
        this.resumo.qtdDeclaracoes = this.getQtdDeclaracoes();
        this.resumo.qtdItens = this.getQtdItens(true);
        this.resumo.qtdItensCadastrados = this.getQtdItens(false);
    }

    public getQtdDeclaracoes(): number{
        let setDeclaracoes = new Set();
        for(let produto of this.produtos){
            setDeclaracoes.add(produto.numeroDI);
        }
        return setDeclaracoes.size
    }

    public getQtdItens(total: boolean): number{
        let statusTotal = ['Pendente', 'Completo', 'Aprovado', 'Integrado'];
        let statusCadastrados = ['Completo', 'Aprovado', 'Integrado'];
        let countItens: number = 0;
        
        for(let produto of this.produtos){
            if(total && statusTotal.includes(produto.status)){
                countItens++;
            }
            if(!total && statusCadastrados.includes(produto.status)){
                countItens++;
            }
        }
        return countItens;
    }

    public setStatusFiltro(event: any, status: string){
        if(event.checked){
            this.status.push(status)
            this.setDadosResult();
        }
        if(!event.checked){
            this.status.splice(this.status.indexOf(status), 1);
            this.setDadosResult();
        }
    }

    public addMercadoria(){

    }

    //https://jtblin.github.io/angular-chart.js/
    //https://www.jqwidgets.com/angular/angular-chart/#https://www.jqwidgets.com/angular/angular-chart/angular-chart-donutlabels.htm

    /** Mock Dados **/

    public getMockDeclaracoes(): Declaracao[]{
        return [
            {
                importadorNome: 'RENAULT DO BRASIL S.A',
                importadorNumero: '00913443000173',
                numeroDI: '12345678',
                dataRegistro: '10/12/2001',
                numeroAdicao: '001',
                canal: '002'
            },
            {
                importadorNome: 'RENAULT DO BRASIL S.A',
                importadorNumero: '00913443000173',
                numeroDI: '32145678',
                dataRegistro: '10/12/2010',
                numeroAdicao: '001',
                canal: '002'
            },
            {
                importadorNome: 'RENAULT DO BRASIL S.A',
                importadorNumero: '00913443000173',
                numeroDI: '87945678',
                dataRegistro: '10/12/2012',
                numeroAdicao: '001',
                canal: '001'
            },
            {
                importadorNome: 'RENAULT DO BRASIL S.A',
                importadorNumero: '00913443000173',
                numeroDI: '56445678',
                dataRegistro: '10/12/2017',
                numeroAdicao: '001',
                canal: '004'
            }
        ]
    }

    public getMockDados(): Produto[]{

        /*
        Pendente
        Completo
        Inativo
        Aprovado
        Integrado
        */

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
            compatibilidade: null            
        }

        var produto2 = {...produto};
        produto2.numeroDI = "09999967891";
        produto2.descricaoBruta = "410004800R PINCA DO FREIO DIANTEIRO PARA VEICULO AUTOMOVEL";
        produto2.ncm = "87083090";
        produto2.status = "Completo";
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