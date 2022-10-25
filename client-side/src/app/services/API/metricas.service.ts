import { componentes, IDadosLeitura, metricas, IGetLeituraMediaDepartamentosTR, ILeituraMediaDepartamentosTR, IGetLeituraComponente } from './../../interface/metricas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const route = 'http://localhost:8080/metricas/'; // Server Route

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  constructor(private http: HttpClient) { }

  getIdComponente(idPC: string, nomeComponente: componentes): Observable<string> {
    return this.http.get<string>(route + 'getIdComponente' + `/${idPC}/${nomeComponente}`)
  }

  getLeituraComponente<T = IDadosLeitura[] | IDadosLeitura>(data: IGetLeituraComponente): Observable<T> {
    return this.http.post<T>(route + 'getLeituraComponente', data)
  }

  getLeituraMediaDepartamentosTR
    (data: IGetLeituraMediaDepartamentosTR): Observable<ILeituraMediaDepartamentosTR[]> {
    return (
      this.http.post<ILeituraMediaDepartamentosTR[]>(route + 'getLeituraMediaDepartamentosTR', data)
    );
  }
}
