import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const route = 'http://localhost:8080/usuarios/'; // Server Route

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  constructor(private http: HttpClient) { }
}
