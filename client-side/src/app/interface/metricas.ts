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

export interface IDateInputs {
  chartRealTime: boolean;
  dataInicio: string;
  dataFim: string;
}


export interface IPayloadGetLeituraComponente {
  idPC: string;
  idComponente: string;
  date: string;
  qtdDados: number;
  metrica: metricas;
}

export interface IResponseGetLeituraComponente {
  data: string,
  hora: string,
  uso: number,
  temperatura?: number,
}

export interface IPayloadLeituraMediaDepartamentos {
  nomeDepartamentos: string[],
  nomeComponente: componentes,
  metrica: metricas,
  dataInicio: string,
  dataFim: string
}

export interface IResponseLeituraMediaDepartamentos {
  dados: number[],
  hora: string
}

export type componentes = 'CPU' | 'HDD' | 'RAM';

export type metricas = 'temperatura' | 'uso_relativo';
