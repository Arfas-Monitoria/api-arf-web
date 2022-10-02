import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { UserDataI } from 'src/app/interface/comum';
import { filter } from 'rxjs';

@Component({
  selector: 'arf-lista',
  templateUrl: './arf-lista.component.html',
  styleUrls: ['./arf-lista.component.scss'],
})
export class ArfListaComponent implements OnInit {
  @Input() componente: string;

  usersData: UserDataI[] = [];
  userFilters: string[] = [
    'ID',
    'Usuário',
    'Departamento',
    'Uso Relativo',
    'Temperatura',
    'Data',
  ];

  crescente: string = 'fa-solid fa-chevron-up';
  decrescente: string = 'fa-solid fa-chevron-down';
  neutro: string = 'fa-solid fa-minus';
  imgClass = this.neutro;

  constructor() {
    // Simulação
    for (let i = 0; i < 10; i++) {
      this.usersData.push({
        id: '1012',
        id_hd: '11122',
        usuario: 'fulano de tal',
        departamento: 'Infraestrutura',
        uso_relativo: '30%',
        temperatura: '70°C',
        data: '02/05/2022',
      });
    }
  }

  ngOnInit(): void {
    // Adiciona o filtro "ID-HDD" se a dashboard for de "HDD"
    if (this.componente === 'HDD') {
      this.userFilters.splice(1, 0, 'ID-HDD');
    }
  }

  filtrarLista(imgId: string) {
    this.alternarOrdem(imgId);
  }

  // Muda o icone da setinha dos filtros
  alternarOrdem(imgId: string) {
    let imgElement = document.querySelector(`#${imgId}`);

    // Salva o estado do icone antes da mudança
    let elementClass = imgElement.className;

    //Deixa todas as setas neutras
    for (let i = 0; i < this.userFilters.length; i++) {
      document.querySelector(`#iconRef${this.componente + i}`).className =
        this.neutro;
    }

    // Alterna o estado do icone clicado
    switch (elementClass) {
      case this.neutro:
        imgElement.className = this.crescente;
        break;
      case this.crescente:
        imgElement.className = this.decrescente;
        break;
      default:
        imgElement.className = this.neutro;
    }
  }
}
