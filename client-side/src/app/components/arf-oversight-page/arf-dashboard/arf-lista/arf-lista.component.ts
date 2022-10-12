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

  // filtro: string;
  usersData: IUserData[];
  userFilters: string[] = [
    'ID',
    'Usuário',
    'Departamento',
    'Data',
    'Uso (%)',
  ];
  filterVar = ['id', 'usuario', 'departamento', 'date', 'uso_relativo']

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
        uso_relativo: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
      }
    })

    // Adiciona dados do HD
    if (this.componente == 'HDD') {
      this.filterVar.splice(1, 0, 'id_hd');
      this.userFilters.splice(1, 0, 'ID-HDD');

      this.usersData.map(userData => {
        userData.id_hd = '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000)
      })
    }

    // Adiciona dados da CPU
    if (this.componente == 'CPU') {
      this.filterVar.splice(5, 0, 'temperatura');
      this.userFilters.splice(5, 0, 'Temp (ºC)');

      this.usersData.map(userData => {
        userData.temperatura = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
      })
    }

    console.log(this.filterData.pesquisa)

    this.atualizarDados()
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.usersData) {
      this.atualizarDados()
      this.pesquisa()
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
        this.interval = setInterval(() => { this.gerarDados(); this.filtrarLista(), this.pesquisa(); }, this.dashConstants.intervalTime)
      } else {
        clearInterval(this.interval);
        this.gerarDados();
      }
    }
  }

  pesquisa() {
    this.usersData = this.usersData.filter(userData => {
      let temUsuario = userData.usuario.includes(this.filterData.pesquisa);
      let temID = userData.id.includes(this.filterData.pesquisa);
      // let temID_HD = userData.id_hd.includes(this.filterData.pesquisa);

      return temUsuario || temID;
    })

    console.log(this.usersData)
  }

  filtrarLista() {
    if (this.componente != this.filterData.componente) return

    let setaStateClass: string;
    let setaId: string;

    // Pega o primeiro icone do componente que está crescente ou decrescente
    let element = this.filterIcons['_results'].find((e: ElementRef) => {
      setaStateClass = e.nativeElement.className;
      setaId = e.nativeElement.id;

      return setaStateClass == this.crescente || setaStateClass == this.decrescente;
    })

    if (!element) return

    // Gambetão
    let index = setaId.charAt(setaId.length - 1);
    let filtro = this.filterVar[index];


    let camposNumericos = filtro != "usuario" && filtro != "departamento";

    switch (setaStateClass) {
      case this.crescente:
        if (camposNumericos) {
          // Sort para números
          this.usersData.sort((a: any, b: any) => b[filtro] - a[filtro])
        } else {
          // Sort para palavras
          this.usersData.sort((a, b) => a[filtro].localeCompare(b[filtro])).reverse()
        }
        break;
      case this.decrescente:
        if (camposNumericos) {
          this.usersData.sort((a: any, b: any) => a[filtro] - b[filtro])
        } else {
          this.usersData.sort((a, b) => a[filtro].localeCompare(b[filtro]))
        }
        break;
    }
  }

  // Muda o icone da setinha dos filtros
  alternarOrdem(imgId: string, filtroHTML: any) {
    // Data não tem filtro
    if (filtroHTML == 'Data') return

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
        this.simulador.shuffleArray(this.usersData)
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
    // console.log('calls')
    this.usersData.map(userData => {
      userData.temperatura = this.simulador.gerarDadosAleatorios<number>(1, 30, 100)
      userData.uso_relativo = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
    })
  }
}
