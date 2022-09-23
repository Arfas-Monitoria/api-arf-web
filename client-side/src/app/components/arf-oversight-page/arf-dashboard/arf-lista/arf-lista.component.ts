import { Component, Input, OnInit } from '@angular/core';
import { UserDataI } from 'src/app/interfaces/comum';

@Component({
  selector: 'arf-lista',
  templateUrl: './arf-lista.component.html',
  styleUrls: ['./arf-lista.component.scss'],
})
export class ArfListaComponent implements OnInit {
  @Input() grafico: string;

  options: string[] = ['ID', ''];
  crescente: boolean = true;
  orderImgPath: string = '/assets/icones/arrow-down-short-wide-solid.svg';
  usersData: UserDataI[] = [];
  userFilters: string[] = [
    'ID',
    'Usuário',
    'Departamento',
    'Uso Relativo',
    'Temperatura',
    'Data',
  ];

  constructor() {
    // Adiciona o filtro "ID-HDD" se a dashboard for de "HDD"
    if (this.grafico === 'HDD') {
      this.userFilters.splice(1, 0, 'ID-HDD');
    }

    for (let i = 0; i < 10; i++) {
      this.usersData.push(
        {
          id: '1012',
          id_hd: '11122',
          usuario: 'fulano de tal',
          departamento: 'Infraestrutura',
          uso_relativo: '30%',
          temperatura: '70°C',
          data: '02/05/2022'
        }
      );
    }
  }

  ngOnInit(): void {}

  filtrarLista(filterOption: string) {
    this.alternarOrdem();
  }

  // Muda o icone da setinha dos filtros
  alternarOrdem() {
    this.crescente = !this.crescente;

    if (this.crescente) {
      this.orderImgPath = '/assets/icones/arrow-down-short-wide-solid.svg';
    } else {
      this.orderImgPath = '/assets/icones/arrow-up-wide-short-solid.svg';
    }
  }
}
