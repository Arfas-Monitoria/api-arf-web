import { Injectable } from '@angular/core';
import { IDepartamento, IDadosDepartamento } from '../interface/usuarios';
import { UsuariosService } from '../services/API/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommums {

  constructor(private usuarioService: UsuariosService) {

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

  criarDepartamentos(departamentos: IDadosDepartamento[]): IDepartamento[] {
    return departamentos.map<IDepartamento>((dep, index) => {
      // Se acabar as cores, pega do começo
      if (index > this.colors.length - 1) {
        index = 0;
      }

      return {
        nome: dep.nome,
        checked: true,
        cor: this.colors[index]
      }
    })
  }

  departamentos = this.usuarioService.getAllDepartamentos().subscribe({
    next: departamentos => {
      return this.criarDepartamentos(departamentos);
    }
  })

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
