import { MetricasService } from './API/metricas.service';
import { componentes, IPayloadGetLeituraComponente, IPayloadLeituraMediaDepartamentos, IResponseGetLeituraComponente, IResponseLeituraMediaDepartamentos, metricas } from './../interface/metricas';
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
}