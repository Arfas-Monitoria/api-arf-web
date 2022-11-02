export interface IPayloadGetDadosLeitura {
  idComputador: string;
  dateInicio: string;
  dateFim: string;
}

export interface IResponseGetDadosLeitura {
  CPU: {
    horaLeitura: string;
    uso: number;
    temperatura: number;
  },
  RAM: {
    horaLeitura: string;
    uso: number;
  },
  HDD: {
    horaLeitura: string;
    uso: number;
  }
}

export interface IResponseGetDadosComponentes {
  idComponente: string;
  nomeComponente: string;
  capacidade: string;
  alertCriticoUso: number;
  alertCriticoTemperatura?: number;
}
