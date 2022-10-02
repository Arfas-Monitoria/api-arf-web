import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  dadosDepartamento,
  Icadastro,
  IdadosUsuario,
  Ilogin,
} from 'src/app/interface/usuarios';

const route = 'http://localhost:8080/usuarios/'; // Server Route

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  cadastrar(data: Icadastro): Observable<any> {
    return this.http.post(route + 'cadastrar', data);
  }

  autenticar(data: Ilogin): Observable<any> {
    return this.http.post(route + 'autenticar', data);
  }

  getDepartamentos(): Observable<dadosDepartamento[]> {
    // Se nomes for vazio deve retornar todos departamentos
    return this.http.get<dadosDepartamento[]>(route + 'getDepartamentos');
  }

  getFuncionarios(ids: string[] = ['todos']): Observable<string[]> {
    // Se id for vazio deve retornar todos funcionários
    return this.http.get<string[]>(route + 'getFuncionarios' + `/${ids}`);
  }

  getDadosUsuario(id: string): Observable<IdadosUsuario[]> {
    // Se id for vazio deve retornar todos funcionários
    return this.http.get<IdadosUsuario[]>(
      route + 'getDepartamentos' + `/${id}`
    );
  }

  updateDadosUsuario(data: IdadosUsuario): Observable<any> {
    return this.http.put(route + 'getDepartamentos', data);
  }
}
