import { Component, Input, OnInit } from '@angular/core';
import { UserDataI } from 'src/app/interfaces/comum';
import { ControlarImgSetaDirective } from 'src/app/directives/controlar-img-seta.directive';
import { filter } from 'rxjs';

@Component({
  selector: 'arf-lista',
  templateUrl: './arf-lista.component.html',
  styleUrls: ['./arf-lista.component.scss'],
})
export class ArfListaComponent implements OnInit {
  @Input() grafico: string;

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
    // Adiciona o filtro "ID-HDD" se a dashboard for de "HDD"
    if (this.grafico === 'HDD') {
      this.userFilters.splice(1, 0, 'ID-HDD');
    }

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

  ngOnInit(): void {}

  filtrarLista(filterOption: string, imgElement: HTMLElement) {
    this.alternarOrdem(imgElement);
  }

  // Muda o icone da setinha dos filtros
  alternarOrdem(imgElement: HTMLElement) {
    // Salva o estado do icone antes da mudança
    let elementClass = imgElement.className;

    //Deixa todas as setas neutras
    // let filterIcon = document.querySelectorAll('.filterIcons');

    // filterIcon.forEach((element) => {
    //   element.className = this.neutro;

    //   console.log('teste');
    //   console.log(element.className);
    // });
    this.imgClass = this.neutro;

    // Alterna o estado do icone clicado
    switch (elementClass) {
      case true:
        imgElement.className.indexOf(this.decrescente);
        break;
      case false:
        imgElement.className.indexOf(this.neutro);
        break;
      default:
        imgElement.className.indexOf(this.crescente);
    }

    imgElement.className += ' filterIcons';

    console.log(imgElement.className);
  }
}
