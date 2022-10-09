import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardCommums } from './../../../../constants/dashboardCommums';
import { DashboardService } from 'src/app/services/dashboard.service';
import {
  Component,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { IUserData, IDadosFiltro } from 'src/app/interface/comum';
import { filter } from 'rxjs';

@Component({
  selector: 'arf-lista',
  templateUrl: './arf-lista.component.html',
  styleUrls: ['./arf-lista.component.scss'],
})
export class ArfListaComponent implements OnInit {
  @Input() componente: string;
  @Input() filterData: IDadosFiltro;

  usersData: IUserData[];
  userFilters: string[] = [
    'ID',
    'Usuário',
    'Departamento',
    'Data',
    'Uso (%)',
    'Temp (ºC)',
  ];

  crescente: string = 'fa-solid fa-chevron-up';
  decrescente: string = 'fa-solid fa-chevron-down';
  neutro: string = 'fa-solid fa-minus';
  imgClass = this.neutro;

  constructor(private dashConstants: DashboardCommums, private simulador: SimuladorService, private dashServices: DashboardService) { }

  ngOnInit(): void {
    // Adiciona o filtro "ID-HDD" se a dashboard for de "HDD"
    if (this.componente === 'HDD') {
      this.userFilters.splice(1, 0, 'ID-HDD');
    }
    console.log("on init")

    //gerar dados simulação
    this.usersData = this.dashConstants.usersData.map(userData => {
      return {
        id: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
        id_hd: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
        usuario: userData.usuario,
        departamento: userData.departamento,
        uso_relativo: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
        temperatura: this.simulador.gerarDadosAleatorios<number>(1, 45, 100),
        date: this.dashServices.converterDate(this.filterData.date),
      }
    })

    // console.log(this.usersData[0])

    this.gerarDados()

    // this.atualizarDados()
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (this.usersData) {
      // console.log("lista changes")
      this.atualizarDados()
      // console.log(this.usersData[0].date == this.dashServices.pegarDataHoje('br'))
    }

  }

  atualizarDados() {
    if (this.filterData.componente == this.componente) {

      this.usersData.map(userData => {
        userData.date = this.dashServices.converterDate(this.filterData.date)
      })

      let interval;

      if (this.usersData[0].date == this.dashServices.pegarDataHoje('br')) {
        interval = setInterval(this.gerarDados, 1000)
      } else {
        clearInterval(interval);
        this.gerarDados();
      }
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

  gerarStatus(valor: number): string {
    if (valor > 70) {
      return 'redAlert'
    } else if (valor > 50) {
      return 'yellowAlert'
    }
    return 'greenAlert'
  }

  gerarDados() {
    console.log(this.usersData)
    this.usersData.map(userData => {
      userData.temperatura = this.simulador.gerarDadosAleatorios<number>(1, 30, 100)
      userData.uso_relativo = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
    })
  }
}
