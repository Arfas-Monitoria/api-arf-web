export interface Icadastro {
  email: string;
  senha: string;
}

export interface Ilogin {
  email: string;
  senha: string;
}

export interface IDadosUsuario {
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

export interface IDadosFiltro {
  id: string;
  id_hd?: string;
  usuario: string;
  departamento: string;
  date: string;
  uso_relativo: number;
  temperatura?: number;
  isPinned?: boolean;
}

export interface IDadosDepartamento {
  id: string;
  nome: string;
}

export interface IDepartamento {
  nome: string;
  checked: boolean;
  cor: string;
}
