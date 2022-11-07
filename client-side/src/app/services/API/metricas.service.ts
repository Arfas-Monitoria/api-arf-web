import { IResponseGetDadosComponentes, IResponseGetLeituraDepartamentosAVG, IPayloadGetLeituraComponente, IResponseGetLeituraComponente, IPayloadGetLeituraDepartamentosAVG } from './../../interface/metricas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom, take } from 'rxjs';

const route = 'http://localhost:8080/metricas/'; // Server Route

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  constructor(private http: HttpClient) { }

  // Trazer dados dos componentes de um computador
  async getDadosComponentes(idComputador: string): Promise<IResponseGetDadosComponentes[]> {
    let response = new Subject();

    this.http.get(route + 'getDadosComponentes' + `/${idComputador}`).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result: IResponseGetDadosComponentes[] =
      await firstValueFrom(response.pipe(take<IResponseGetDadosComponentes[]>(1)));

    return result;
  }

  // Dados de um componente em determinada data
  async GetLeituraComponente(data: IPayloadGetLeituraComponente): Promise<IResponseGetLeituraComponente[]> {
    let response = new Subject();

    this.http.post(route + 'GetLeituraComponente', data).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result =
      await firstValueFrom(response.pipe(take<IResponseGetLeituraComponente[]>(1)));

    return result;
  }

  // Dados de departamentos em determinado período de datas
  async getLeituraDepartamentosAVG(data: IPayloadGetLeituraDepartamentosAVG): Promise<IResponseGetLeituraDepartamentosAVG[]> {
    let response = new Subject();

    this.http.post(route + 'getLeituraDepartamentosAVG', data).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result =
      await firstValueFrom(response.pipe(take<IResponseGetLeituraDepartamentosAVG[]>(1)));

    return result;
  }
}
