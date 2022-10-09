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
  interval;

  constructor(private dashConstants: DashboardCommums, private simulador: SimuladorService, private dashServices: DashboardService) { }

  ngOnInit(): void {
    // Adiciona o filtro "ID-HDD" se a dashboard for de "HDD"
    if (this.componente === 'HDD') {
      this.userFilters.splice(1, 0, 'ID-HDD');
    }

    //gerar dados simulação
    this.usersData = this.dashConstants.usersData.map(userData => {
      return {
        id: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
        id_hd: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
        usuario: userData.usuario,
        departamento: userData.departamento,
        date: this.dashServices.converterDate(this.filterData.date),
        uso_relativo: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
        temperatura: this.simulador.gerarDadosAleatorios<number>(1, 45, 100),
      }
    })

    // this.atualizarDados()
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.usersData) {
      // this.atualizarDados()
    }
  }

  atualizarDados() {
    if (this.filterData.componente == this.componente) {

      this.usersData.map(userData => {
        userData.date = this.dashServices.converterDate(this.filterData.date)
      })

      clearInterval(this.interval);

      if (this.usersData[0].date == this.dashServices.pegarDataHoje('br')) {
        this.interval = setInterval(() => this.gerarDados(), 1000)
      } else {
        clearInterval(this.interval);
        this.gerarDados();
      }
    }
  }

  filtrarLista() {

  }

  // Muda o icone da setinha dos filtros
  alternarOrdem(imgId: string, filtro: any) {
    let imgElement = document.querySelector(`#${imgId}`);

    // Salva o estado do icone antes da mudança
    let elementClass = imgElement.className;

    //Deixa todas as setas neutras
    for (let i = 0; i < this.userFilters.length; i++) {
      document.querySelector(`#iconRef${this.componente + i}`).className =
        this.neutro;
    }

    filtro = Object.keys(this.usersData[0])[this.userFilters.indexOf(filtro)]
    // [this.userFilters.indexOf(filtro)]

    console.log(filtro)

    // Alterna o estado do icone clicado
    switch (elementClass) {
      case this.neutro:
        imgElement.className = this.crescente;
        this.usersData.sort((a: any, b: any) => b[filtro] - a[filtro])
        break;
      case this.crescente:
        imgElement.className = this.decrescente;
        this.usersData.sort((a: any, b: any) => a[filtro] - b[filtro])
        break;
      default:
        imgElement.className = this.neutro;
        this.usersData.sort()
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
    console.log('calls')
    this.usersData.map(userData => {
      userData.temperatura = this.simulador.gerarDadosAleatorios<number>(1, 30, 100)
      userData.uso_relativo = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
    })
  }
}
