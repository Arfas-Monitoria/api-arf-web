import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const route = 'http://localhost:8080/usuarios/'; // Server Route

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  cadastrar(data: any) {
    return this.http.post(route + 'cadastrar', data);
  }

  autenticar(data: any) {
    return this.http.post(route + 'autenticar', data);
  }
}
