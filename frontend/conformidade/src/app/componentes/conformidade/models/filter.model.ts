import { Importador } from './importador.model';
import { Representante } from './representante.model';

export interface Filter {
  importador: Importador[];
  representante: Representante[];
  data_inicio?: string;
  data_fim?: string;
}