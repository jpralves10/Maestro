import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from '../../../models/produto.model';
import { LegendaProduto, Atributos, CodigoInterno, PaisOrigemList } from '../../../models/legendas.model';

@Component({
    selector: 'app-produtos-three',
    templateUrl: './produtos-three.component.html',
    styleUrls: ['./produtos-three.component.scss']
})
export class ProdutosThreeComponent implements OnInit {

    @Input() produto: Produto;
    @Output() produtoAlterado = new EventEmitter();

    public loading = true;
    public errored = false;

    atributoDataSource = new MatTableDataSource<Atributos>();
    codigoInternoDataSource = new MatTableDataSource<CodigoInterno>();

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

    paisOrigemList: LegendaProduto[] = PaisOrigemList;

    atributosColumns: string[] = ['atributo', 'valor', 'operacao'];
    atributo_form: Atributos = {atributo: '', valor: ''};

    codigoInternoColumns: string[] = ['valor', 'operacao'];
    codigointerno_form: CodigoInterno = {valor: ''};

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.loading = false;
        console.log(PaisOrigemList)
        this.initDatasSources();
    }

    private initDatasSources(){
        if(this.produto.atributos == null){
            this.produto.atributos = [];
            this.atributoDataSource.data = [];
        }else{
            this.atributoDataSource.data = [...this.produto.atributos];
        }

        if(this.produto.codigosInterno == null){
            this.produto.codigosInterno = [];
            this.codigoInternoDataSource.data = [];
        }else{
            this.codigoInternoDataSource.data = [...this.produto.codigosInterno];
        }
    }

    public adicionarAtributo(){
        this.produto.atributos.push(this.atributo_form)
        this.atributo_form = {atributo: '', valor: ''};
        this.updateAtributos();
    }

    public removeRowAtributo(row: Atributos){
        this.produto.atributos.splice(this.produto.atributos.indexOf(row), 1);
        this.updateAtributos();
    }

    public updateAtributos(){
        this.atributoDataSource.data = [...this.produto.atributos];
    }

    public adicionarCodigoInterno(){
        this.produto.codigosInterno.push(this.codigointerno_form)
        this.codigointerno_form = {valor: ''};
        this.updateCodigoInterno();
    }

    public removeRowCodigoInterno(row: CodigoInterno){
        this.produto.codigosInterno.splice(this.produto.codigosInterno.indexOf(row), 1);
        this.updateCodigoInterno();
    }

    public updateCodigoInterno(){
        this.codigoInternoDataSource.data = [...this.produto.codigosInterno];
    }

    public finalizarPreenchimento(){
        this.produto.etapaConformidade++;
        this.produtoAlterado.emit(this.produto);
    }

    public voltarEtapa(){
        this.produto.etapaConformidade--;
        this.produtoAlterado.emit(this.produto);
    }
}