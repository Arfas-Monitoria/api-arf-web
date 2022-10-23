import { IUsersData } from './../../interface/usuarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Icadastro,
  IDadosDepartamento,
  Ilogin,
} from 'src/app/interface/usuarios';

const route = 'http://localhost:8080/usuarios/'; // Server Route

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) { }

  cadastrar(data: Icadastro): Observable<any> {
    return this.http.post(route + 'cadastrar', data);
  }

  autenticar(data: Ilogin): Observable<any> {
    return this.http.post(route + 'autenticar', data);
  }

  getAllDepartamentos(): Observable<IDadosDepartamento[]> {
    return this.http.get<IDadosDepartamento[]>(route + 'getDepartamentos');
  }

  getDadosUsuarios(): Observable<IUsersData[]> {
    return this.http.get<IUsersData[]>(route + 'getDadosUsuarios');
  }
}
