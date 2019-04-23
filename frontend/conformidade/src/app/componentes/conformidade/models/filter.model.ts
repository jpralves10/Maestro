import { Importer } from './importer.model';

export interface Filter {
    importers: Importer[];
    data_inicio?: Date;
    data_fim?: Date;
}