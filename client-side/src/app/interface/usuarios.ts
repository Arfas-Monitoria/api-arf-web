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

export interface IResponseGetDadosFuncionarios {
  registro: string;
  nomeFuncionario: string;
  usuario: string;
  email: string;
  funcao: string;
  telefone: string;
  nomeDepartamento: string;
  idComputador: string;
}

export interface IResponseGetPerfilFuncionarios{
  registro: string;
  nomeFuncionario: string;
  usuario: string;
  email: string;
  funcao: string;
  telefone: string;
  nomeDepartamento: string;
  fkDepartamento: number;
  idComputador: string;
}

export interface IResponseGetDepartamentos{
  idDepartamento: number;
  nomeDepartamento: string;
}
