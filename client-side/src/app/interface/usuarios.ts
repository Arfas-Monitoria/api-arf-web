export interface Icadastro {
  nome: string;
  email: string;
  telefone: string;
  funcao: string;
  departamento: string;
  senha: string;
}



export interface IResponseSecao{
  id: number;
  nome: string;
  profilePath: string;
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
