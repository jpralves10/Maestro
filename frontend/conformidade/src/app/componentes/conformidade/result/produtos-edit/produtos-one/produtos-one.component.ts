import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from '../../../models/produto.model';
import { CodigoInterno } from '../../../models/legendas.model';
//import { LegendaProduto } from '../../../models/legendas.model';

@Component({
    selector: 'app-produtos-one',
    templateUrl: './produtos-one.component.html',
    styleUrls: ['./produtos-one.component.scss']
})
export class ProdutosOneComponent implements OnInit {

    @Input() produto: Produto;
    @Output() produtoAlterado = new EventEmitter();

    public loading = true;
    public errored = false;

    descricaoBruta: string = '';
    codigoSelecionado: string = '';
    
    constructor() { }

    ngOnInit() {
        this.loading = false;

        this.descricaoBruta = this.produto.descricaoBruta;

        if(this.produto.codigosInterno !== null && this.produto.codigosInterno !== undefined){
            if(this.produto.codigosInterno.length > 0){
                this.codigoSelecionado = this.produto.codigosInterno[0].valor;
            }
        }
    }

    public selecionarCodigoDescricao(event: any){        
        var selectionStart = event.target.selectionStart;
        var selectionEnd = event.target.selectionEnd;

        this.codigoSelecionado = this.descricaoBruta.substring(selectionStart, selectionEnd);

        if(this.produto.codigosInterno == null || this.produto.codigosInterno.length == 0){
            this.produto.codigosInterno = [];
            this.produto.codigosInterno.push({valor: ''});
        }
        this.produto.codigosInterno[0].valor = this.codigoSelecionado.trim();
    }

    proximaEtapa(){
        this.produto.etapaConformidade++;
        this.produtoAlterado.emit(this.produto);
    }
}