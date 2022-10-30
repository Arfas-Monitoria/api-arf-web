import { Subject } from 'rxjs';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { IDadosFiltro } from '../interface/comum';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  @Output() chartStateEmitter = new EventEmitter<boolean>();

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

  constructor() { }
}
