export interface IResponseGetDadosComponentes {
  idComponente: string;
  nomeComponente: string;
  capacidade: string;
  alertaCriticoUso: number;
  alertaCriticoTemperatura?: number;
}

export interface IResponseGetLeituraComponenteTR {
  nomeComponente: string;
  horaLeitura: string;
  usoRT: number;
  temperaturaRT?: number;
}

export interface IResponseGetLeituraComponenteAVG {
  nomeComponente: string;
  avgUso: number;
  avgTemperatura: number;
}

export interface IPayloadGetLeituraDepartamentosAVG {
  departamentos: string[],
  dataInicio: string;
  dataFim: string;
}

export interface IResponseGetLeituraDepartamentosAVG {
  nomeDepartamento: string;
  avgUso: number;
  avgTemperatura: number;
}
