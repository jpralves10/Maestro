import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.model';
import { BehaviorSubject, Observable } from 'rxjs';
import * as DateManagement from '../../../utilitarios/date-management';

@Injectable({
  providedIn: 'root'
})
export class FilterResultService {

    private readonly defaultFilter: Filter = {
        importers: [],
        data_inicio: DateManagement.BrFormatDateFromDate(actualDateDecremented()),
        data_fim: DateManagement.BrFormatDateFromDate(new Date())
    };

    constructor() {}

    public filterResultSource: 
        BehaviorSubject<Filter> = new BehaviorSubject<Filter>(this.defaultFilter);

    public filterResult: 
        Observable<Filter> = this.filterResultSource.asObservable();

    public changeFilterResult(filter: Filter) {
        this.filterResultSource.next(filter);
    }

    public resetFilter() {
        this.filterResultSource.next(this.defaultFilter);
    }    
}

const actualDateDecremented = (): Date => {
    const actualDate = new Date();
    actualDate.setMonth(actualDate.getMonth() - 3);
    return actualDate;
};