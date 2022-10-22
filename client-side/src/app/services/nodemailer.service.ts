import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface EmailRequest {
  nome: string
  emailUser: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

const route = 'http://localhost:8080/enviarEmail'; // Server Route

@Injectable({
  providedIn: 'root',
})
export class NodemailerService {
  constructor(private http: HttpClient) { }

  enviarEmail(data: EmailRequest) {
    this.http.post(route, data);
  }
}
