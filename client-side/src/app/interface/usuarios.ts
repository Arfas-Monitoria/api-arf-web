export interface Icadastro {
  email: string;
  senha: string;
}

export interface Ilogin {
  email: string;
  senha: string;
}

export interface IUsersData {
  idComputador: string;
  idCPU: string;
  idRAM: string;
  idsHDDs: string[];
  nomeFuncionario: string;
  nomeDepartamento: string;
}

// export interface IDadosFuncionario {
//   registro?: string;
//   nomeFuncionario?: string;
//   usuario?: string;
//   email?: string;
//   telefone?: string;
//   funcao?: string;
//   senha?: string;
//   permissaoDashboard?: string;
//   status?: string;
//   fkDepartamento?: string;
//   fkMaquina: string
// }

export interface IListaFiltros {
  idComputador: string;
  nomeFuncionario: string;
  nomeDepartamento: string;
  date: string;
  uso_relativo: number;
  temperatura?: number;
  isPinned?: boolean;
  idCPU: string;
  idRAM: string;
  idHDD: string;
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
