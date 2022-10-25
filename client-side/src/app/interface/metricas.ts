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

export interface IDadosLeitura {
  data: string,
  hora: string,
  uso: number,
  temperatura?: number,
}

export interface IDateInputs {
  chartRealTime: boolean;
  dataInicio: string;
  dataFim: string;
}

export interface IGetLeituraMediaDepartamentosTR {
  nomeDepartamentos: string[],
  nomeComponente: componentes,
  metrica: metricas,
}

export interface ILeituraMediaDepartamentosTR {
  dados: number[],
  hora: string
}

export interface IGetLeituraComponente {
  idPC: string;
  idComponente: string;
  qtdDados: string;
  metrica: metricas;
}

export type componentes = 'CPU' | 'HDD' | 'RAM';

export type metricas = 'temperatura' | 'uso_relativo';
