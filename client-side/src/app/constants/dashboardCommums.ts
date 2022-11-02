import { Subject, take, firstValueFrom } from 'rxjs';
import { MetricasService } from 'src/app/services/API/metricas.service';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { Injectable } from '@angular/core';
import { IDepartamento, IUserData, IUserDataLista } from 'src/app/interface/comum';
import { SimuladorService } from '../services/simulador.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommums {

  constructor(
    private simulador: SimuladorService,
    private UsuariosService: UsuariosService,
    private metricasService: MetricasService
  ) {
    this.departamentos.map((dep, index) => {
      try {
        dep.cor = this.colors[index];
      } catch {
        index = 0;
      }
    })
  }

  intervalTime = 2 * 1000;

  colors: string[] = [
    "#16a0ff",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857"]

  departamentos: IDepartamento[] = [
    {
      nome: 'Infraestrutura',
      cor: ''
    },
    {
      nome: 'Consultoria',
      cor: ''
    },
    {
      nome: 'Comercial',
      cor: ''
    },
    {
      nome: 'Recepção',
      cor: ''
    },
    {
      nome: 'Call Center',
      cor: ''
    },
    {
      nome: 'T.I.',
      cor: ''
    },
  ]

  KPIs: { title: string, label: string }[] = [
    {
      title: 'CPUs com má performance',
      label: ''
    },
    {
      title: 'RAMs com má performance',
      label: ''
    },
    {
      title: 'HDDs com má performance',
      label: ''
    },
  ]

  // usersData: { usuario: string, departamento: string }[] = [
  //   {
  //     usuario: 'Ricardo Alberto',
  //     departamento: 'Infraestrutura'
  //   },
  //   {
  //     usuario: 'Luiz Henrique',
  //     departamento: 'Infraestrutura'
  //   },
  //   {
  //     usuario: 'Lucia Ferreira',
  //     departamento: 'Infraestrutura'
  //   },
  //   {
  //     usuario: 'Déssia Lima',
  //     departamento: 'Consultoria'
  //   },
  //   {
  //     usuario: 'Lucas Augusto',
  //     departamento: 'Consultoria'
  //   },
  //   {
  //     usuario: 'Letícia da Silva',
  //     departamento: 'Recepção'
  //   },
  //   {
  //     usuario: 'Caique Carvalho',
  //     departamento: 'T.I.'
  //   },
  //   {
  //     usuario: 'Heloisa Brito',
  //     departamento: 'T.I.'
  //   },
  //   {
  //     usuario: 'Vinicius Roman',
  //     departamento: 'T.I.'
  //   },
  //   {
  //     usuario: 'Gabriel Martins',
  //     departamento: 'T.I.'
  //   },
  //   {
  //     usuario: 'Felipe Queiroz',
  //     departamento: 'T.I.'
  //   },
  //   {
  //     usuario: 'icaro Menezes',
  //     departamento: 'T.I.'
  //   },
  //   {
  //     usuario: 'José Ribeiro',
  //     departamento: 'Comercial'
  //   },
  //   {
  //     usuario: 'Joao Menezes',
  //     departamento: 'Comercial'
  //   },
  //   {
  //     usuario: 'Rita Sung',
  //     departamento: 'Comercial'
  //   },
  //   {
  //     usuario: 'Bruno Lee',
  //     departamento: 'Call Center'
  //   },
  //   {
  //     usuario: 'Julia Freitas',
  //     departamento: 'Call Center'
  //   },
  // ]

}
