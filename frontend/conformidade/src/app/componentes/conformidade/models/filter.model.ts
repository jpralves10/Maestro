import { Importer } from './importer.model';

export interface Filter {
    importers: Importer[];
    data_inicio?: string;
    data_fim?: string;
}