import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterResult } from '../models/filter-result.model';
import { Produto, ProdutoClass } from '../models/produto.model';
import { ResultItem } from '../models/result-item.model';
import { Result, ResultClass } from '../models/result.model';

import { ConsultaService } from '../services/consulta.service';
import { ResultService } from '../services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

    public filter: FilterResult;
    public loading = true;
    public errored = false;

    data: Result = null;

    @Input() current_filtro: ResultItem = {
        produto: {codigo: null, descricao: '', numeroDI: null, status: ''}
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private consultaService: ConsultaService,
        private resultService: ResultService
    ) {
        this.route.queryParamMap.subscribe(paramMap => {
            this.filter = JSON.parse(paramMap.get('filter'));

            this.data = new ResultClass();

            this.data.produtos = this.getMockDados();
            window.sessionStorage.setItem('result', JSON.stringify(this.data));
            this.loading = false;            

            /*this.consultaService.getProdutosPorImportador(this.filter.importers).subscribe(adicoes =>{
                this.data.produtos = adicoes; //this.getDataTransformed(adicoes);
                window.sessionStorage.setItem('result', JSON.stringify(this.data));
                this.loading = false;
            },
            error => { this.errored = true;})*/
        });

        this.resultService.clearFilter();
    }

    ngOnInit() {

    }

    public updateFiltro() {
        this.resultService.changeFilter(this.current_filtro);
    }

    public getMockDados(): Produto[]{

        var produto: Produto = new ProdutoClass();

        produto.seq = "001";
        produto.codigo = 123;
        produto.numeroDI = "01234567"
        produto.dataRegistro = "07/04/2019";
        produto.status = "Complementar";
        produto.descricao = "Produto de Teste 123";
        produto.cnpjRaiz = "07171642925";
        produto.situacao = "ATIVADO";
        produto.modalidade = "IMPORTACAO";
        produto.ncm = "10123";
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
        produto2.descricao = "Vai Vai 456";
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

        return produtosList;
    }
}