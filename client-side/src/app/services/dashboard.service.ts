import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  @Output() atualizarExibicao = new EventEmitter<{
    exibicao: string;
    componente: string;
  }>();

  constructor() {}
}
