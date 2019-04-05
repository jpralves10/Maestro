import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterItem } from '../models/FilterItem.model';
import { MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

    constructor() {
        this.whenUpdatedSource.subscribe(p => (this.whenUpdated = p));
    }

    private defaultFilter: FilterItem = {
        importer: {cpf_cnpj: '', name: ''}
    };

    public filterSource: 
        BehaviorSubject<FilterItem> = new BehaviorSubject<FilterItem>(this.defaultFilter);

    public filter = this.filterSource.asObservable();

    public whenUpdatedSource: 
        BehaviorSubject<Array<MatPaginator>> = new BehaviorSubject<Array<MatPaginator>>([]);

    public whenUpdated: Array<MatPaginator> = [];

    public changeFilter(filter: FilterItem): void {
        this.filterSource.next(filter);
        console.log(this.whenUpdated);
        this.whenUpdated.forEach(f2 => f2.firstPage());
    }

    public clearFilter() {
        this.changeFilter(this.defaultFilter);
    }
}