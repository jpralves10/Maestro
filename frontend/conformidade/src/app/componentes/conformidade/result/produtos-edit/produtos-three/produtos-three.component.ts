import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, ProdutoClass } from '../../../models/produto.model';
import { LegendaProduto, Atributos, AtributosClass } from '../../../models/legendas.model';

@Component({
    selector: 'app-produtos-three',
    templateUrl: './produtos-three.component.html',
    styleUrls: ['./produtos-three.component.scss']
})
export class ProdutosThreeComponent implements OnInit {

    @Input() produto: Produto;
    
    thirdFormGroup: FormGroup;

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
        private _formBuilder: FormBuilder
    ) {
        this.loading = false;
        this.thirdFormGroup = this._formBuilder.group({
            firstCtrl: [ '', Validators.required ]
        });

        console.log(this.produto);
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