export interface FilterResult {
    importers: string[];
    importadores: [{
        name: string,
        cnpj: string,
        checked: boolean
    }];
    status: string[];
    start_date: Date;
    end_date: Date;
}