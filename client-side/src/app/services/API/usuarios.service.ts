import { IDepartamento, IUsersData } from './../../interface/usuarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, Subject, take } from 'rxjs';
import {
  Icadastro,
  IDadosDepartamento,
  Ilogin,
} from 'src/app/interface/usuarios';
import { DashboardCommums } from 'src/app/constants/dashboardCommums';

const route = 'http://localhost:8080/usuarios/'; // Server Route

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient,
    private dashCommuns: DashboardCommums) { }

  async cadastrar(data: Icadastro): Promise<any> {
    // Getting response
    let response = new Subject();

    this.http.post(route + 'cadastrar', data).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    // Transforming response
    let result = await firstValueFrom(response.pipe(take(1)));

    return result;
  }

  async autenticar(data: Ilogin): Promise<any> {
    // Getting response
    let response = new Subject();

    this.http.post(route + 'autenticar', data).subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    // Transforming response
    let result = await firstValueFrom(response.pipe(take(1)));

    return result;
  }

  async getAllDepartamentos(): Promise<IDepartamento[]> {
    // Getting response
    let response = new Subject();

    this.http.get<IDepartamento[]>(route + 'getAllDepartamentos').subscribe({
      next: (departamentos) => {
        response.next(departamentos)
      },
      error: (err) => console.error(err)
    })

    // Transforming response
    let result = await firstValueFrom(response.pipe(take<IDadosDepartamento[]>(1)));

    let data = result.map<IDepartamento>((dep, index) => {
      // Se acabar as cores, pega do começo
      if (index > this.dashCommuns.colors.length - 1) {
        index = 0;
      }

      return {
        nome: dep.nome,
        checked: true,
        cor: this.dashCommuns.colors[index]
      }
    })

    return data;
  }

  async getDadosUsuarios(): Promise<IUsersData[]> {
    // Getting response
    let response = new Subject();

    this.http.get(route + 'getDadosUsuarios').subscribe({
      next: data => response.next(data),
      error: (err) => console.warn(err)
    });

    // Transforming response
    let result: IUsersData[] = await firstValueFrom(response.pipe(take<IUsersData[]>(1)));

    return result;
  }
}
