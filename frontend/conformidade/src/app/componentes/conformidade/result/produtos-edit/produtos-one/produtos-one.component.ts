import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from '../../../models/produto.model';
//import { LegendaProduto } from '../../../models/legendas.model';

@Component({
    selector: 'app-produtos-one',
    templateUrl: './produtos-one.component.html',
    styleUrls: ['./produtos-one.component.scss']
})
export class ProdutosOneComponent implements OnInit {

    //https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text

    @Input() produto: Produto;

    public loading = true;
    public errored = false;
    
    constructor() { }

    ngOnInit() {
        this.loading = false;
    }

    stepIndex: number = 0;
    
    cambiaStep(e) {
        this.stepIndex = e.selectedIndex;
    }

    selecionarTexto(){
        console.log("Teste")
    }
}