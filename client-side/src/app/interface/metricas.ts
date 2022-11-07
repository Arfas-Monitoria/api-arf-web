export interface IResponseGetDadosComponentes {
  idComponente: string;
  nomeComponente: string;
  capacidade: string;
  alertaCriticoUso: number;
  alertaCriticoTemperatura?: number;
}

export interface IPayloadGetLeituraComponente {
  idComponente: string;
  data: string;
}

export interface IResponseGetLeituraComponente {
  nomeComponente: string;
  uso: number;
  temperatura?: number;
}
export interface IPayloadGetLeituraDepartamentosAVG {
  nomeDepartamento: string;
  nomeComponente: string;
  dataInicio: string;
  dataFim: string;
}
export interface IResponseGetLeituraDepartamentosAVG {
  nomeComponente: string;
  horaLeitura: string;
  avgUso: number;
  avgTemperatura: number;
}
