import { Component, OnInit, Input } from '@angular/core';
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

    public loading = true;
    public errored = false;

    codigoSelecionado: string = '';
    
    constructor() { }

    ngOnInit() {
        this.loading = false;
    }

    public selecionarCodigoDescricao(event: any){        
        var selectionStart = event.target.selectionStart;
        var selectionEnd = event.target.selectionEnd;

        this.codigoSelecionado = this.produto.descricaoBruta.substring(selectionStart, selectionEnd);

        if(this.produto.codigosInterno.length == 0){
            this.produto.codigosInterno.push({valor: ''});
        }
        this.produto.codigosInterno[0].valor = this.codigoSelecionado.trim();
    }

    proximaEtapa(){
        
    }
}