import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  @Output() trazerExibicao = new EventEmitter<string>();

  constructor() { }
}
