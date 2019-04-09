import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filter.model';
import { FilterItem } from '../models/filter-item.model';
import * as DateManagement from '../../utilitarios/date-management';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

    constructor() {
        this.whenUpdatedSource.subscribe(p => (this.whenUpdated = p));
    }

    /** Default Filter **/

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

    /** Default Filter Result **/

    private readonly defaultFilterResult: Filter = {
        importers: [],
        data_inicio: DateManagement.BrFormatDateFromDate(actualDateDecremented()),
        data_fim: DateManagement.BrFormatDateFromDate(new Date())
    };

    public filterResultSource: 
        BehaviorSubject<Filter> = new BehaviorSubject<Filter>(this.defaultFilterResult);

    public filterResult: 
        Observable<Filter> = this.filterResultSource.asObservable();

    public changeFilterResult(filter: Filter) {
        this.filterResultSource.next(filter);
    }

    public resetFilter() {
        this.filterResultSource.next(this.defaultFilterResult);
    }
}

const actualDateDecremented = (): Date => {
    const actualDate = new Date();
    actualDate.setMonth(actualDate.getMonth() - 3);
    return actualDate;
};