import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimuladorService {
  gerarDadosAleatorios(qtdDados: number, min: number, max: number): number[] {
    let dados = []

    for (let i = 0; i < qtdDados; i++) {
      let randomNumber = Math.ceil(Math.random() * (max - min) + min);

      dados.push(randomNumber)
    }

    return dados;
  }

  pegarHorarioAtual(): string {
    return new Date().toLocaleTimeString();;
  }

  constructor() { }
}
