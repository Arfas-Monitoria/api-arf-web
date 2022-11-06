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

export interface IResponseGetLeituraDepartamentosAVG {
  nomeDepartamento: string;
  avgUso: number;
  avgTemperatura: number;
}
