import { EventEmitter, Injectable, Output } from '@angular/core';
import { IDadosFiltro } from '../interface/comum';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  @Output() atualizarFiltros = new EventEmitter<IDadosFiltro>();

  constructor() {}
}
