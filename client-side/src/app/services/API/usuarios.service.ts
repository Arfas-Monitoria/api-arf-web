import { IPayloadPutDadosFuncionario, IResponseGetPerfilFuncionarios } from './../../interface/usuarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, Subject, take } from 'rxjs';
import { IDepartamento, IDepartamentoCadastro } from 'src/app/interface/comum';
import { IResponseGetLeituraDepartamentosAVG } from 'src/app/interface/metricas';
import {
  Icadastro,
  Ilogin,
  IResponseGetAllFuncionariosAtivos,
  IResponseGetDadosFuncionarios,
  IResponseGetDepartamentos,
} from 'src/app/interface/usuarios';
import { environment } from 'src/environments/environment';

const route = `${environment.API_PATH}/usuarios/`; // Server Route

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) { }

  cadastrar(data: Icadastro): Observable<any> {
    return this.http.post(route + 'cadastrar', data);
  }

  async autenticar(data: Ilogin): Promise<IResponseGetPerfilFuncionarios> {
    let response = new Subject();

    this.http.post(route + 'autenticar', data).subscribe({
      next: data => response.next(data),
      error: (err) => {
        response.error(err)
        console.warn(err)
      }
    });

    let result =
      await firstValueFrom(response.pipe(take<IResponseGetPerfilFuncionarios>(1)));

    return result;
  }

  // Trazer dados dos funcionários ativos com computador
  async getDadosFuncionarios(): Promise<IResponseGetDadosFuncionarios[]> {
    let response = new Subject();

    this.http.get(route + 'getDadosFuncionarios').subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result: IResponseGetDadosFuncionarios[] =
      await firstValueFrom(response.pipe(take<IResponseGetDadosFuncionarios[]>(1)));

    return result;
  }

  // Trazer nome dos departamentos que contêm funcionários
  async getNomeDepartamentosComFuncionarios(): Promise<{ nomeDepartamento: string }[]> {
    let response = new Subject();

    this.http.get(route + 'getNomeDepartamentosComFuncionarios').subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result =
      await firstValueFrom(response.pipe(take<{ nomeDepartamento: string }[]>(1)));

    return result;
  }

  // Atualiza a foto do usuário
  async putProfileImgId(imgId: string, idFuncionario: number): Promise<any> {
    let response = new Subject();

    this.http.put(route + 'putProfileImgId' + `/${idFuncionario}`, { imgId }).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    let result =
      await firstValueFrom(response.pipe(take(1)));

    return result;
  }

  async getDepartamentos(): Promise<IResponseGetDepartamentos[]> {
    let response = new Subject();

    this.http.get(route + 'getDepartamentos').subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });
    let result =
      await firstValueFrom(response.pipe(take<IResponseGetDepartamentos[]>(1)));
    return result;
  }

  async getAllFuncionariosAtivos(): Promise<IResponseGetAllFuncionariosAtivos[]> {
    let response = new Subject();

    this.http.get(route + 'getAllFuncionariosAtivos').subscribe({
      next: data => response.next(data),
      error: (err) => {
        response.error(err)
        console.warn(err)
      }
    });
    let result =
      await firstValueFrom(response.pipe(take<IResponseGetAllFuncionariosAtivos[]>(1)));

    return result;
  }

  async getAllFuncionarios(): Promise<IResponseGetPerfilFuncionarios[]> {
    let response = new Subject();

    this.http.get(route + 'getAllFuncionarios').subscribe({
      next: data => response.next(data),
      error: (err) => {
        response.error(err)
        console.warn(err)
      }
    });
    let result =
      await firstValueFrom(response.pipe(take<IResponseGetPerfilFuncionarios[]>(1)));

    return result;
  }

  async putDadosFuncionario(data: IPayloadPutDadosFuncionario): Promise<any> {
    let response = new Subject();

    this.http.put(route + 'putDadosFuncionario', data).subscribe({
      next: data => response.next(data),
      error: (err) => {
        response.error(err)
        console.warn(err)
      }
    });
    let result =
      await firstValueFrom(response.pipe(take<any>(1)));

    return result;
  }
}
