import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimuladorService {
  gerarDadosAleatorios<T = number[] | number>(qtdDados: number, min: number, max: number): T {
    let dados = []

    for (let i = 0; i < qtdDados; i++) {
      let randomNumber = Math.ceil(Math.random() * (max - min) + min);

      dados.push(randomNumber)
    }

    return dados.length > 1 ? dados : dados[0];
  }

  shuffleArray(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  constructor() { }
}
