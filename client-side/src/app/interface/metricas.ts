export interface IPayloadGetDadosLeitura {
  idComputador: string;
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
  alertCriticoUso: number;
  alertCriticoTemperatura?: number;
}
