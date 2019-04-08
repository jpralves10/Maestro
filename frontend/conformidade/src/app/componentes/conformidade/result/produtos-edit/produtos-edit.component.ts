import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, ProdutoClass } from '../../models/produto.model';
import { LegendaProduto, Atributos, AtributosClass } from '../../models/legendas.model';
import * as DateManagement from '../../../../utilitarios/date-management';

@Component({
  selector: 'app-produtos-edit',
  templateUrl: './produtos-edit.component.html',
  styleUrls: ['./produtos-edit.component.scss']
})
export class ProdutosEditComponent implements OnInit {

    public produto: Produto;
    public loading = true;
    public errored = false;

    public situacoes: LegendaProduto[] = [
        {value: 'ATIVADO', viewValue: 'Ativado'},
        {value: 'DESATIVADO', viewValue: 'Desativado'},
        {value: 'RASCUNHO', viewValue: 'Rascunho'}
    ];

    public modalidades: LegendaProduto[] = [
        {value: 'AMBOS', viewValue: 'Ambos'},
        {value: 'EXPORTACAO', viewValue: 'Exportação'},
        {value: 'IMPORTACAO', viewValue: 'Importação'}
    ];

    public fabricanteConhecido: LegendaProduto[] = [
        {value: 'FALSE', viewValue: 'Não'},
        {value: 'TRUE', viewValue: 'Sim'}
    ];

    public atributos: Atributos[] = [
        {atributo: 'ATT_1', valor: 'teste'},
        {atributo: 'ATT_2', valor: 'teste 22'}
    ];

    atributosColumns: string[] = ['atributo', 'valor', 'operacao'];

    atributo_form: Atributos = new AtributosClass;

    codigoInternoColumns: string[] = ['valor', 'operacao'];

    codigointerno_form: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.queryParamMap.subscribe(paramMap => {
            this.produto = JSON.parse(paramMap.get('filterProduto'));
            this.produto.dataRegistro = DateManagement.DateFromBrString(this.produto.dataRegistro),
            this.loading = false;


            /*this.data = new ResultClass();

            this.data.produtos = this.getMockDados();
            window.sessionStorage.setItem('result', JSON.stringify(this.data));
                        

            /*this.consultaService.getProdutosPorImportador(this.filter.importers).subscribe(adicoes =>{
                this.data.produtos = adicoes; //this.getDataTransformed(adicoes);
                window.sessionStorage.setItem('result', JSON.stringify(this.data));
                this.loading = false;
            },
            error => { this.errored = true;})*/
        });
    }

    ngOnInit() {
    }

    public adicionarAtributo(){
        this.atributos.push(this.atributo_form);
        this.atributo_form = new AtributosClass;

        this.produto.atributos = this.atributos;
    }

    public removeRowAtributo(){

    }
}