import { DashboardService } from 'src/app/services/dashboard.service';
import { IUsersData } from './../interface/usuarios';
import { Injectable } from '@angular/core';
import { IDepartamento, IDadosDepartamento, IListaFiltros } from '../interface/usuarios';
import { UsuariosService } from '../services/API/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommums {

  constructor(
    private usuarioService: UsuariosService,
    private dashServices: DashboardService
  ) {

  }

  intervalTime = 3 * 1000;

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

  usersData: IUsersData[] = this.dashServices.getDadosUsuarios();

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
