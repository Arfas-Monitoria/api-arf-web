import { Injectable } from '@angular/core';
import { IDepartamento, IListaFiltros } from '../interface/usuarios';
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

  departamentos: IDepartamento[] = []

  usersData: IListaFiltros[] = [
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
