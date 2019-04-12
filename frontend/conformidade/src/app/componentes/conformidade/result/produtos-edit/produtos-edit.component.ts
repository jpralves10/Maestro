import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, ProdutoClass } from '../../models/produto.model';
import { LegendaProduto, Atributos } from '../../models/legendas.model';
import * as DateManagement from '../../../utilitarios/date-management';
import $ from "jquery";

@Component({
  selector: 'app-produtos-edit',
  templateUrl: './produtos-edit.component.html',
  styleUrls: ['./produtos-edit.component.scss']
})
export class ProdutosEditComponent implements OnInit {

    isLinear = true;
    etapaIndex = 0;

    @Input() produto: Produto = null;
    public loading = true;
    public errored = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.queryParamMap.subscribe(paramMap => {
            this.produto = JSON.parse(paramMap.get('filterProduto'));

            this.produto.dataRegistro = DateManagement.DateFromBrString(this.produto.dataRegistro),
            this.produto.etapaConformidade = 1;

            if(this.produto.descricao == null || this.produto.descricao == undefined){
                this.produto.descricao = '';
            }

            this.loading = false;
        });
    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {  
        $( "mat-step-header" ).attr("style","pointer-events: none !important");
    }

    reciverProduto(produtoAlterado: Produto){
        this.produto = produtoAlterado;
    }

    stepClick(event: any){
        if(event.selectedIndex == 0){
            this.etapaIndex = 1;
        }else if(event.selectedIndex == 1){
            this.etapaIndex = 2;
        }else if(event.selectedIndex == 2){
            this.etapaIndex = 3;
        }
    }
}