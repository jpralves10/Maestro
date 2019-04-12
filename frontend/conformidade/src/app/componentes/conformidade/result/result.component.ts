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

            this.data = new ResultClass();

            //this.data.produtos = this.getMockDados();

            this.consultaService
                .getProdutosPorImportador(this.filter)
                .subscribe(adicoes => {
                    this.data.produtos = (adicoes as any).produtos; //this.getDataTransformed(adicoes);
                    window.sessionStorage.setItem('result', JSON.stringify(this.data));
                    this.loading = false;
            },
            error => { this.errored = true;})
        });

        this.resultService.clearFilter();
    }

    ngOnInit() {

    }

    public updateFiltro() {
        this.resultService.changeFilter(this.current_filtro);
    }

    public getMockDados(): Produto[]{

        /*
        Pendente
        Completo
        Inativo
        Aprovado
        Integrado
        */

        var produto: Produto = new ProdutoClass();

        produto.seq = "001";
        produto.codigo = null;
        produto.numeroDI = "01234567891"
        produto.dataRegistro = "20190403";
        produto.status = "Pendente";
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
        produto.dataCriacao = null;
        produto.dataAtualizacao = null;
        produto.usuarioAtualizacao = null;

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