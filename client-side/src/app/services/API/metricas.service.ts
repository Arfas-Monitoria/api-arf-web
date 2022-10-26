import { componentes, IPayloadGetLeituraComponente, IPayloadLeituraMediaDepartamentos, IResponseGetLeituraComponente, IResponseLeituraMediaDepartamentos } from './../../interface/metricas';
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

  getLeituraComponente<T = IResponseGetLeituraComponente[] | IResponseGetLeituraComponente>(data: IPayloadGetLeituraComponente): Observable<T> {
    return this.http.post<T>(route + 'getLeituraComponente', data)
  }

  getLeituraMediaDepartamentos
    (data: IPayloadLeituraMediaDepartamentos): Observable<IResponseLeituraMediaDepartamentos[]> {
    return (
      this.http.post<IResponseLeituraMediaDepartamentos[]>(route + 'getLeituraMediaDepartamentos', data)
    );
  }
}
