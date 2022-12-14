export interface IUserDataLista {
  id_pc: string;
  id_hdd: string;
  usuario: string;
  departamento: string;
  cpu: IComponenteLista;
  ram: IComponenteLista;
  hdd: IComponenteLista;
  isPinned?: boolean;
  date: string;
}

export interface IComponenteLista {
  idComponente: string;
  uso: number;
  alertaCriticoUso: number;
  temperatura?: number;
  alertaCriticoTemperatura?: number;
  ProxAlertaCriticoTemp?: number;
  ProxAlertaCriticoUso?: number;
}

export interface ISpinnerEvent {
  state: boolean;
  card: string;
}

export interface IUserData {
  registro: string;
  nomeFuncionario: string;
  usuario: string;
  email: string;
  funcao: string;
  telefone: string;
  nomeDepartamento: string;
  idComputador: string;
  CPU: IComponenteUser;
  RAM: IComponenteUser;
  HDD: IComponenteUser;
}

export interface IComponenteUser {
  idComponente: string;
  alertaCriticoUso: number;
  alertaCriticoTemperatura?: number;
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
export interface IDepartamentoCadastro {
  nome: string;
  id: number;
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

export interface IEnvironment {
  production: boolean;
  API_PATH: string;
  containerPath: string
  storageName: string;
  containerName: string;
  connectionString: string;
  sasContainerToken: string;
}

export interface compData {
  nomeFuncionario: string;
  usuario: string;
  marca: string;
  modelo: string;
  idPC: string;
  idDispositivo: string;
  cpu: { alertaCriticoTempCPU: string | number, alertaCriticoUsoCPU: string | number, idComponente: string };
  ram: { alertaCriticoUsoRAM: string | number, idComponente: string };
  alertasHDDs: { nome: string, alertaCriticoUsoHDD: string | number, idComponente: string }[];
}
