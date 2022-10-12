export interface IUserData {
  id: string;
  id_hd?: string;
  usuario: string;
  departamento: string;
  date: string;
  uso_relativo: number;
  temperatura?: number;
}

export interface IDadosFiltro {
  exibicao: string;
  departamentosSelecionados: IDepartamento[];
  metrica: string;
  date: string;
  pesquisa: string;
  componente: string;
}

export interface IDepartamento {
  nome: string;
  checked: boolean;
  cor: string;
}
