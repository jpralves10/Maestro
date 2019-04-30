import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../shared/services/produtos.service';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.scss']
})
export class ClassificacaoComponent implements OnInit {

    constructor(
        private produtoService: ProdutoService
    ) { }

    ngOnInit() { }

    click(){
        this.produtoService.serverNode().subscribe(ret => {
            console.log(ret)
        })
    }
}