import { componentes } from './../../interface/metricas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const route = 'http://localhost:8080/metricas/'; // Server Route

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  constructor(private http: HttpClient) { }

  getLeituraComponente(idPC: string, idComponente: componentes, qtdDados: string, metrica: 'temperatura' | 'uso relativo'): Observable<string> {
    return (
      this.http.get<string>(route + 'getLeituraComponente' +
        `/${idPC}/${idComponente}/${qtdDados}/${metrica}`)
    );
  }
}
