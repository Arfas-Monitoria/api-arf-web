import { MetricasService } from './API/metricas.service';
import { componentes } from './../interface/metricas';
import { DashboardCommums } from './../constants/dashboardCommums';
import { IDepartamento } from './../interface/usuarios';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { IDadosFiltro } from '../interface/metricas';
import { UsuariosService } from './API/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor
    (
      private usuarioService: UsuariosService,
      private metricasService: MetricasService,
      private dashCommuns: DashboardCommums,
    ) {

  }

  @Output() atualizarFiltros = new EventEmitter<IDadosFiltro>();

  pegarHorarioAtual(): string {
    return new Date().toLocaleTimeString();;
  }

  pegarDataHoje(formato: 'br' | 'us'): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    if (formato == 'br') {
      return dd + '/' + mm + '/' + yyyy;
    } else {
      return yyyy + '-' + mm + '-' + dd;
    }

    // return `${yyyy}-${mm}-${dd}`
  }

  converterDate(date: string): string {
    // 2022-10-09

    let splittedDate = date.split('-');
    let dd = splittedDate[2];
    let mm = splittedDate[1];
    let yyyy = splittedDate[0];

    return `${dd}/${mm}/${yyyy}`
  }

  criarDepartamentos(): IDepartamento[] {
    let result: IDepartamento[];

    this.usuarioService.getAllDepartamentos().subscribe({
      next: (departamentos) => {
        result = departamentos.map<IDepartamento>((dep, index) => {
          // Se acabar as cores, pega do começo
          if (index > this.dashCommuns.colors.length - 1) {
            index = 0;
          }

          return {
            nome: dep.nome,
            checked: true,
            cor: this.dashCommuns.colors[index]
          }
        })
      },
      error: (err) => console.error(err)
    })

    return result;
  }

  pegarLeitura<T = number[]>
    (idPC: string, idComponente: componentes, qtdDados, metrica: 'temperatura' | 'uso relativo'): T {
    let result;
    this.metricasService.getLeituraComponente(idPC, idComponente, qtdDados, metrica).subscribe({
      next: (leitura) => {
        result = leitura;
      }
    })

    return result;
  }
}
