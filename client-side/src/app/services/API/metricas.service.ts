import { componentes, IDadosLeitura, metricas, ILeituraDepartamentos } from './../../interface/metricas';
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

  getLeituraComponente<T = IDadosLeitura[] | IDadosLeitura>(idPC: string, idComponente: string, qtdDados: string, metrica: metricas): Observable<T> {
    return (
      this.http.get<T>(route + 'getLeituraComponente' + `/${idPC}/${idComponente}/${qtdDados}/${metrica}`)
    );
  }

  getLeituraMediaDepartamentos
    (nomeDepartamentos: string[], metrica: metricas, dateInicio: string, dateFim: string = dateInicio): Observable<ILeituraDepartamentos[]> {
    return (
      this.http.get<ILeituraDepartamentos[]>(route + 'getLeituraMediaDepartamentos' +
        `/${nomeDepartamentos}/${metrica}/${dateInicio}/${dateFim}`)
    );
  }
}
