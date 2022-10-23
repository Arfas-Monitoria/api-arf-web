import { MetricasService } from './API/metricas.service';
import { componentes, IDadosLeitura, ILeituraDepartamentos, metricas } from './../interface/metricas';
import { DashboardCommums } from './../constants/dashboardCommums';
import { IDepartamento, IUsersData } from './../interface/usuarios';
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
    return new Date().toLocaleTimeString();
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
  }

  converterDate(date: string, outFormat: 'br' | 'us'): string {
    // 2022-10-29 yyyy-mm-dd (us)
    // 25-11-2021 dd-mm-yyyy (br)
    let splittedDate;
    let dd;
    let mm;
    let yyyy;

    if (date.includes('-')) {
      splittedDate = date.split('-');
    } else {
      splittedDate = date.split('/');
    }

    if (outFormat == 'br') {
      dd = splittedDate[2];
      mm = splittedDate[1];
      yyyy = splittedDate[0];

      return `${dd}/${mm}/${yyyy}`
    } else {
      dd = splittedDate[0];
      mm = splittedDate[1];
      yyyy = splittedDate[2];

      return `${yyyy}-${mm}-${dd}`
    }
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

  getDadosUsuarios(): IUsersData[] {
    let result: IUsersData[];

    this.usuarioService.getDadosUsuarios().subscribe({
      next: (dados) => {
        result = dados;
      }
    })

    return result;
  }

  getIdComponente(idPC: string, nomeComponente: componentes): string {
    let result;

    this.metricasService.getIdComponente(idPC, nomeComponente).subscribe({
      next: (id) => {
        result = id;
      },
      error: (err) => console.error(err)
    })

    return result;
  }

  getLeituraComponente<T = IDadosLeitura[] | IDadosLeitura>(idPC: string, idComponente: string, qtdDados, metrica: metricas): T {
    let result;

    this.metricasService.getLeituraComponente(idPC, idComponente, qtdDados, metrica).subscribe({
      next: (leitura) => {
        result = leitura;
      },
      error: (err) => console.error(err)
    })

    return result.length > 1 ? result : result[0];
  }

  getLeituraMediaDepartamentos<T = ILeituraDepartamentos[] | ILeituraDepartamentos>
    (nomeDepartamentos: string[], metrica: metricas, dateInicio: string, dateFim: string = dateInicio): T {
    let result;

    this.metricasService.getLeituraMediaDepartamentos(nomeDepartamentos, metrica, dateInicio, dateFim).subscribe({
      next: (leitura) => {
        result = leitura;
      },
      error: (err) => console.error(err)
    })

    return result.length > 1 ? result : result[0];
  }
}
