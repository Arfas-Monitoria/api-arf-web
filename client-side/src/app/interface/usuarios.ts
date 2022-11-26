import { IComputador } from "./metricas";

export interface Icadastro {
  nome: string;
  usuario: string;
  email: string;
  telefone: string;
  funcao: string;
  departamento: number;
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

export interface IResponseGetPerfilFuncionarios {
  idFuncionario: string;
  nomeFuncionario: string;
  usuario: string;
  email: string;
  funcao: string;
  telefone: string;
  nomeDepartamento: string;
  statusFuncionario: string;
  profileImgPath: string;
  acesso: string;
  fkDepartamento: number;
  idComputador: string;
}

export interface IResponseGetDepartamentos {
  idDepartamento: number;
  nomeDepartamento: string;
}

export interface IResponseGetAllFuncionariosAtivos {
  idFuncionario: string;
  nomeFuncionario: string;
  usuario: string;
}
