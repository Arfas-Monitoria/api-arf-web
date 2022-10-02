export interface Icadastro {
  email: string;
  senha: string;
}

export interface Ilogin {
  email: string;
  senha: string;
}

export interface IdadosUsuario {
  registro?: string;
  nomeFuncionario?: string;
  usuario?: string;
  email?: string;
  telefone?: string;
  funcao?: string;
  senha?: string;
  permissaoDashboard?: string;
  status?: string;
  fkDepartamento?: string;
}

export interface dadosDepartamento {
  id: string;
  nome: string;
}
