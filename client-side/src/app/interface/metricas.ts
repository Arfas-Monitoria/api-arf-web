import { IDepartamento } from "./usuarios";

export interface IDadosFiltro {
  exibicao: string;
  departamentosSelecionados: IDepartamento[];
  departamentos: IDepartamento[];
  metrica: string;
  date: string;
  pesquisa: string;
  componente: string;
}

