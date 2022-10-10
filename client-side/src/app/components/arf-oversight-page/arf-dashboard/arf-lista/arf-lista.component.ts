import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardCommums } from './../../../../constants/dashboardCommums';
import { DashboardService } from 'src/app/services/dashboard.service';
import {
  Component,
  ElementRef,
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
  @ViewChildren('filterIcons') filterIcons: HTMLElement[]

  usersData: IUserData[];
  userFilters: string[] = [
    'ID',
    'Usuário',
    'Departamento',
    'Data',
    'Uso (%)',
  ];

  crescente: string = 'fa-solid fa-chevron-up';
  decrescente: string = 'fa-solid fa-chevron-down';
  neutro: string = 'fa-solid fa-minus';
  imgClass = this.neutro;
  interval;

  constructor(private dashConstants: DashboardCommums, private simulador: SimuladorService, private dashServices: DashboardService) { }

  ngOnInit(): void {
    //gerar dados simulação
    this.usersData = this.dashConstants.usersData.map(userData => {
      return {
        id: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
        usuario: userData.usuario,
        departamento: userData.departamento,
        date: this.dashServices.converterDate(this.filterData.date),
        uso_relativo: this.simulador.gerarDadosAleatorios<number>(1, 30, 100)
      }
    })

    // Adiciona dados do HD
    if (this.componente === 'HDD') {
      this.userFilters.splice(1, 0, 'ID-HDD');
      this.usersData.map(userData => {
        userData.id_hd = '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000)
      })
    }

    // Adiciona dados da CPU
    if (this.componente === 'CPU') {
      this.userFilters.splice(5, 0, 'Temp (ºC)');

      this.usersData.map(userData => {
        userData.temperatura = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
      })
    }

    this.atualizarDados()
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.usersData) {
      this.atualizarDados()
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.filtrarLista()
  }

  atualizarDados() {
    if (this.filterData.componente == this.componente) {

      this.usersData.map(userData => {
        userData.date = this.dashServices.converterDate(this.filterData.date)
      })

      clearInterval(this.interval);

      if (this.usersData[0].date == this.dashServices.pegarDataHoje('br')) {
        this.interval = setInterval(() => this.gerarDados(), this.dashConstants.intervalTime)
      } else {
        clearInterval(this.interval);
        this.gerarDados();
      }
    }
  }

  filtrarLista() {
    this.filterIcons['_results'].find((e: ElementRef) => {
      let elementClass = e.nativeElement.className;

      console.log(e)

      if (elementClass == this.crescente) {

      }
    })
  }

  // Muda o icone da setinha dos filtros
  alternarOrdem(imgId: string, filtro: any) {
    // Data não tem filtro
    if (filtro == 'Data') return

    let imgElement = document.querySelector(`#${imgId}`);

    // Salva o estado do icone antes da mudança
    let elementClass = imgElement.className;

    //Deixa todas as setas neutras
    for (let i = 0; i < this.userFilters.length; i++) {
      document.querySelector(`#iconRef${this.componente + i}`).className =
        this.neutro;
    }

    let index = this.userFilters.indexOf(filtro);

    filtro = Object.keys(this.usersData[0])[index]

    console.log(filtro)

    // Alterna o estado do icone clicado
    switch (elementClass) {
      case this.neutro:
        imgElement.className = this.crescente;
        // if (index != 2 && index != 3) {
        //   this.usersData.sort((a: any, b: any) => b[filtro] - a[filtro])
        // } else {
        //   this.usersData.sort((a, b) => a[filtro].localeCompare(b[filtro])).reverse()
        // }
        break;
      case this.crescente:
        imgElement.className = this.decrescente;
        // if (index != 2 && index != 3) {
        //   this.usersData.sort((a: any, b: any) => a[filtro] - b[filtro])
        // } else {
        //   this.usersData.sort((a, b) => a[filtro].localeCompare(b[filtro]))
        // }
        break;
      default:
        imgElement.className = this.neutro;
      // this.simulador.shuffleArray(this.usersData)
    }

    this.filtrarLista();
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
