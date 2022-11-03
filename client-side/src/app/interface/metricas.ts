export interface IPayloadGetDadosLeitura {
  idComponente: string;
  dateInicio: string;
  dateFim: string;
}

export interface IResponseGetDadosLeitura {
  nomeComponente: string;
  horaLeitura: string;
  uso: number;
  temperatura?: number;
}

export interface IResponseGetDadosComponentes {
  idComponente: string;
  nomeComponente: string;
  capacidade: string;
  alertaCriticoUso: number;
  alertaCriticoTemperatura?: number;
}
