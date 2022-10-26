import { componentes, IPayloadGetLeituraComponente, IPayloadLeituraMediaDepartamentos, IResponseGetLeituraComponente, IResponseLeituraMediaDepartamentos } from './../../interface/metricas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject, take } from 'rxjs';

const route = 'http://localhost:8080/metricas/'; // Server Route

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  constructor(private http: HttpClient) { }

  async getLeituraComponente<T = IResponseGetLeituraComponente[] | IResponseGetLeituraComponente>(data: IPayloadGetLeituraComponente): Promise<T> {
    // Getting response
    let response = new Subject();

    this.http.post<T>(route + 'getLeituraComponente', data).subscribe({
      next: (leitura) => {
        response.next(leitura);
      },
      error: (err) => console.error(err)
    })

    // Transforming response
    let result = await firstValueFrom(response.pipe(take<T>(1)));

    return result > 1 ? result : result[0];
  }

  async getLeituraMediaDepartamentos
    (data: IPayloadLeituraMediaDepartamentos): Promise<IResponseLeituraMediaDepartamentos> {
    // Getting response
    let response = new Subject();

    this.http.post(route + 'getLeituraComponente', data).subscribe({
      next: (leitura) => {
        response.next(leitura);
      },
      error: (err) => console.error(err)
    })

    // Transforming response
    let result = await firstValueFrom(response.pipe(take<IResponseLeituraMediaDepartamentos>(1)));

    return result;
  }
}
