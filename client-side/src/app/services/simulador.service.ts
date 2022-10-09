import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimuladorService {
  gerarDadosAleatorios<T = number[]>(qtdDados: number, min: number, max: number): T {
    let dados = []

    for (let i = 0; i < qtdDados; i++) {
      let randomNumber = Math.ceil(Math.random() * (max - min) + min);

      dados.push(randomNumber)
    }

    return dados.length > 1 ? dados : dados[0];
  }

  constructor() { }
}
