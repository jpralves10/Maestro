import { Component, OnInit, Input } from '@angular/core';

import { Filter } from '../models/filter.model';
import { FilterItem } from '../models/filter-item.model';

import { DataService } from '../models/filter.model';
import { FilterService } from '../models/filter-item.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  data: Filter = null;
  loading = true;
  errored = false;

  @Input() current_filtro: FilterItem = {
    importador: {
      cpf_cnpj: '',
      name: ''
    },
    representante: {
      cpf_cnpj: '',
      name: ''
    }
  };

  constructor(
    private dataService: DataService,
    private filterService: FilterService
  ) { }

  ngOnInit() { }

  public updateFiltro() {
    //this.filterService.changeFilter(this.current_filtro);
  }

}
