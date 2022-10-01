import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icadastro, Ilogin } from 'src/app/interfaces/usuarios';

const route = 'http://localhost:8080/usuarios/'; // Server Route

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  cadastrar(data: Icadastro): Observable<any>  {
    return this.http.post(route + 'cadastrar', data);
  }

  autenticar(data: Ilogin): Observable<any> {
    return this.http.post(route + 'autenticar', data);
  }

  getDepartamentos(): Observable<string[]> {
    return this.http.get<string[]>(route + 'getDepartamentos');
  }

  getFuncionarios(): Observable<string[]> {
    return this.http.get<string[]>(route + 'getDepartamentos');
  }

  // getDadoUsuario(data : IdadosUsuario): Observable<string[]>{
  //   return this.http.get<string[]>(route + 'getDepartamentos' + data );
  // }
}
