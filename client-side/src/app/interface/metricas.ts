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

export interface IPayloadPutDadosMaquina {
  idFuncionario: string;
  idPC: string;
  statusPC: string;
  dtEntrega: string;
  dtDevolucao: string;
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
  avgUso: number;
}
export interface IPayloadPutAlertaCritico {
  idComponente: string;
  alertaCriticoUso: number;
  alertaCriticoTemp?: number
}

export interface IResponsegetKPIsDepartamento {
  CPU: {
    porcentagem: number,
    diferenca: number,
    fracao: number
  },
  RAM: {
    porcentagem: number,
    diferenca: number,
    fracao: number
  },
  HDD: {
    porcentagem: number,
    diferenca: number,
    fracao: number
  }
}

export interface IResponseGetDadosMaquinas {
  idComputador: string;
  idFuncionario: string;
  nomeFuncionario: string;
  usuario: string;
  marca: string;
  modelo: string;
  idProduto: string;
  idDispositivo: string;
  hostname: string;
  dtEntrega: string;
  dtDevolucao: string;
  statusComputador: string;
}

export interface IComputador {
  idComputador: string,
  fkFuncionario: string,
  marca: string,
  modelo: string,
  idProduto: string,
  idDispositivo: string,
  hostname: string,
  dtEntrega: string,
  dtDevolucao: string,
  statusComputador: string
}
