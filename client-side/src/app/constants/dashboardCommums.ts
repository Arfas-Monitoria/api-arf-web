import { Injectable } from '@angular/core';
import { IDepartamento, IUserData } from 'src/app/interface/comum';
import { SimuladorService } from '../services/simulador.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommums {

  constructor(private simulador: SimuladorService) {
    this.departamentos.map((dep, index) => {
      try {
        dep.cor = this.colors[index];
      } catch {
        index = 0;
      }
    })
  }

  intervalTime = 1 * 1000;

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
      checked: true,
      cor: ''
    },
    {
      nome: 'Consultoria',
      checked: true,
      cor: ''
    },
    {
      nome: 'Comercial',
      checked: true,
      cor: ''
    },
    {
      nome: 'Recepção',
      checked: true,
      cor: ''
    },
    {
      nome: 'Call Center',
      checked: true,
      cor: ''
    },
    {
      nome: 'T.I.',
      checked: true,
      cor: ''
    },
  ]

  usersData: { usuario: string, departamento: string }[] = [
    {
      usuario: 'Ricardo Alberto',
      departamento: 'Infraestrutura'
    },
    {
      usuario: 'Luiz Henrique',
      departamento: 'Infraestrutura'
    },
    {
      usuario: 'Lucia Ferreira',
      departamento: 'Infraestrutura'
    },
    {
      usuario: 'Déssia Lima',
      departamento: 'Consultoria'
    },
    {
      usuario: 'Lucas Augusto',
      departamento: 'Consultoria'
    },
    {
      usuario: 'Letícia da Silva',
      departamento: 'Recepção'
    },
    {
      usuario: 'Caique Carvalho',
      departamento: 'T.I.'
    },
    {
      usuario: 'Heloisa Brito',
      departamento: 'T.I.'
    },
    {
      usuario: 'Vinicius Roman',
      departamento: 'T.I.'
    },
    {
      usuario: 'Gabriel Martins',
      departamento: 'T.I.'
    },
    {
      usuario: 'Felipe Queiroz',
      departamento: 'T.I.'
    },
    {
      usuario: 'icaro Menezes',
      departamento: 'T.I.'
    },
    {
      usuario: 'José Ribeiro',
      departamento: 'Comercial'
    },
    {
      usuario: 'Joao Menezes',
      departamento: 'Comercial'
    },
    {
      usuario: 'Rita Sung',
      departamento: 'Comercial'
    },
    {
      usuario: 'Bruno Lee',
      departamento: 'Call Center'
    },
    {
      usuario: 'Julia Freitas',
      departamento: 'Call Center'
    },
  ]

  KPIs: { title: string, label: string }[] = [
    {
      title: 'Quantidade de CPUs com má performance',
      label: ''
    },
    {
      title: 'Quantidade de RAMs com má performance',
      label: ''
    },
    {
      title: 'Quantidade de HDDs com má performance',
      label: ''
    },
    {
      title: 'Média de uso de CPU',
      label: ''
    },
    {
      title: 'Média de uso de RAM',
      label: ''
    },
    {
      title: 'Média de uso de HDD',
      label: ''
    },
  ]
}
