import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material';
import { ResultItem } from '../models/result-item.model';
import { Result } from '../models/result.model';
import * as DateManagement from '../../../utilitarios/date-management';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

    constructor() {
        this.whenUpdatedSource.subscribe(p => (this.whenUpdated = p));
    }

    /** Default Filter **/

    private defaultFilter: ResultItem = {
        produto: {numeroDI: '', descricaoBruta: '', ncm: '', status: ''}
    };

    public filterSource: 
        BehaviorSubject<ResultItem> = new BehaviorSubject<ResultItem>(this.defaultFilter);

    public filter = this.filterSource.asObservable();

    public whenUpdatedSource: 
        BehaviorSubject<Array<MatPaginator>> = new BehaviorSubject<Array<MatPaginator>>([]);

    public whenUpdated: Array<MatPaginator> = [];

    public changeFilter(filter: ResultItem): void {
        this.filterSource.next(filter);
        //console.log(this.whenUpdated);
        this.whenUpdated.forEach(f2 => f2.firstPage());
    }

    public clearFilter() {
        this.changeFilter(this.defaultFilter);
    }

    /** Default Filter Result **/

    private readonly defaultFilterResult: Result = {
        produtos: [],
        data_inicio: DateManagement.BrFormatDateFromDate(actualDateDecremented()),
        data_fim: DateManagement.BrFormatDateFromDate(new Date())
    };

    public filterResultSource: 
        BehaviorSubject<Result> = new BehaviorSubject<Result>(this.defaultFilterResult);

    public filterResult: 
        Observable<Result> = this.filterResultSource.asObservable();

    public changeFilterResult(filter: Result) {
        this.filterResultSource.next(filter);
    }

    public resetFilter() {
        this.filterResultSource.next(this.defaultFilterResult);
    }
}

const actualDateDecremented = (): Date => {
    const actualDate = new Date();
    actualDate.setMonth(actualDate.getMonth() - 12);
    return actualDate;
};