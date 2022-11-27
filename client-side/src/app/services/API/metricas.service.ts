import { IResponseGetDadosComponentes, IResponseGetLeituraDepartamentosAVG, IPayloadGetLeituraComponente, IResponseGetLeituraComponente, IPayloadGetLeituraDepartamentosAVG, IResponsegetKPIsDepartamento, IResponseGetDadosMaquinas, IPayloadPutDadosMaquina, IPayloadPutAlertaCritico } from './../../interface/metricas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom, take } from 'rxjs';
import { environment } from 'src/environments/environment';

const route = `${environment.API_PATH}/metricas/`; // Server Route

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

  // KPIs dos componentes de um departamento em determinada data
  async getKPIsDepartamento(data: { departamento: string, mes: string }): Promise<IResponsegetKPIsDepartamento> {
    let response = new Subject();

    this.http.post(route + 'getKPIsDepartamento', data).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result =
      await firstValueFrom(response.pipe(take<IResponsegetKPIsDepartamento>(1)));

    return result;
  }

  // KPIs dos componentes de um departamento em determinada data
  async putAlertaCritico
    (data: IPayloadPutAlertaCritico): Promise<any> {

    let response = new Subject();

    this.http.put(route + 'putAlertaCritico', data).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result =
      await firstValueFrom(response.pipe(take(1)));

    return result;
  }

  async putDadosMaquina(data: IPayloadPutDadosMaquina): Promise<any> {
    let response = new Subject();

    this.http.put(route + 'putDadosMaquina', data).subscribe({
      next: data => response.next(data),
      error: (err) => {
        response.error(data)
        console.warn(err)
      }
    });

    let result =
      await firstValueFrom(response.pipe(take(1)));

    return result;
  }

  // Trás todos os dados dos departamentos, funcionarios e computadores, onde os computadores têm dono e os computadores sem dono (fkFuncionario == null).
  async getDadosMaquinas(onlyNotOwned = false): Promise<IResponseGetDadosMaquinas[]> {
    let response = new Subject();

    this.http.get(route + 'getDadosMaquinas' + `/${onlyNotOwned}`).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result =
      await firstValueFrom(response.pipe(take<IResponseGetDadosMaquinas[]>(1)));

    return result;
  }
}
