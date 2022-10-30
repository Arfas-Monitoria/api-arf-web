export interface IUserData {
  id_pc: string;
  id_hdd: string;
  usuario: string;
  departamento: string;
  date: string;
  uso_cpu: number;
  temp_cpu: number;
  uso_ram: number;
  uso_hdd: number;
  isPinned?: boolean;
}

export interface IDadosFiltro {
  departamentosSelecionados: IDepartamento[];
  componentesSelecionados: IComponente
  componenteSelecionado: string,
  departamentos: IDepartamento[];
  metrica: string;
  date: string;
  pesquisa: string;
  card: string;
}

export interface IDepartamento {
  nome: string;
  cor: string;
  checked?: boolean;
}

export interface IComponente {
  cpu: {
    nome: string;
    checked: boolean;
  };
  ram: {
    nome: string;
    checked: boolean;
  };
  hdd: {
    nome: string;
    checked: boolean;
  };
}
