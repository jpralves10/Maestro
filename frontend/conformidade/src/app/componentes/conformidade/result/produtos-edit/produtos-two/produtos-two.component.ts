import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from '../../../models/produto.model';
//import { LegendaProduto } from '../../../models/legendas.model';

@Component({
  selector: 'app-produtos-two',
  templateUrl: './produtos-two.component.html',
  styleUrls: ['./produtos-two.component.scss']
})
export class ProdutosTwoComponent implements OnInit {

    @Input() produto: Produto;

    public loading = true;
    public errored = false;

    constructor() { }

    ngOnInit() {
        this.loading = false;
    }

}