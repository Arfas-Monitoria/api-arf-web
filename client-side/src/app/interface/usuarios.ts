import { IComputador } from "./metricas";

export interface Icadastro {
  email: string;
  senha: string;
}

export interface Ilogin {
  email: string;
  senha: string;
}

export interface IResponseGetDadosFuncionarios extends IComputador {
  registro: string;
  nomeFuncionario: string;
  usuario: string;
  email: string;
  funcao: string;
  telefone: string;
  nomeDepartamento: string;
}
