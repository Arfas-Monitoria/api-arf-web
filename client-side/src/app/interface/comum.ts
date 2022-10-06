export interface IUserData {
  id: string;
  id_hd: string;
  usuario: string;
  departamento: string;
  uso_relativo: number;
  temperatura: number;
  data: string;
}

export interface IDadosFiltro {
  exibicao: string;
  metrica: string;
  date: string;
  pesquisa: string;
  componente: string;
}
