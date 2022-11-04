import { IResponseGetDadosComponentes } from './../../interface/metricas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom, take } from 'rxjs';
import { IPayloadGetDadosLeitura, IResponseGetDadosLeitura } from 'src/app/interface/metricas';

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

  // Trazer dados de leitura de todos os componentes de um computador
  async getDadosLeitura(payload: IPayloadGetDadosLeitura): Promise<IResponseGetDadosLeitura> {
    let response = new Subject();

    this.http.post(route + 'getDadosLeitura', payload).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result =
      await firstValueFrom(response.pipe(take<IResponseGetDadosLeitura>(1)));

    return result;
  }
}
