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
  userDataFiltered: IUserData[] = [];
  temDepartamentosSelecionados: boolean;
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

  mostrarGrafico: boolean;

  constructor(private dashConstants: DashboardCommums, private simulador: SimuladorService, private dashServices: DashboardService) { }

  ngOnInit(): void {
    // Adiciona dados do HD
    if (this.componente == 'HDD') {
      this.filterVar.splice(1, 0, 'id_hd');
      this.userFilters.splice(1, 0, 'ID-HDD');
    }

    // Adiciona dados da CPU
    if (this.componente == 'CPU') {
      this.filterVar.splice(5, 0, 'temperatura');
      this.userFilters.splice(5, 0, 'Temp (ºC)');
    }

    this.atualizarDados()
    this.pesquisa()
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.interval);
  }

  atualizarDados() {
    clearInterval(this.interval);
    this.temDepartamentosSelecionados = this.filterData.departamentosSelecionados.length > 0;

    if (this.temDepartamentosSelecionados) {
      let nomeDepartamentosSelecionados = this.filterData.departamentosSelecionados.map(dep => dep.nome)

      let usersDataConstantsFiltered = this.dashConstants.usersData.filter(userData => {
        return nomeDepartamentosSelecionados.includes(userData.departamento)
      })

      //gerar dados simulação
      this.usersData = usersDataConstantsFiltered.map(userData => {
        return {
          id: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
          usuario: userData.usuario,
          departamento: userData.departamento,
          date: this.dashServices.converterDate(this.filterData.date),
          uso_relativo: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
        }
      })

      // Gera os IDS dos HD's
      if (this.componente == 'HDD') {
        this.usersData.map(userData => {
          userData.id_hd = '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000)
        })
      }

      // Gera as temperaturas das CPU's
      if (this.componente == 'CPU') {
        this.usersData.map(userData => {
          userData.temperatura = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
        })
      }

      // Atualiza a data de todos os componentes
      this.usersData.map(userData => {
        userData.date = this.dashServices.converterDate(this.filterData.date)
      })

      if (this.usersData[0].date == this.dashServices.pegarDataHoje('br')) {
        this.interval = setInterval(() => {
          console.log("lista calls");
          this.gerarDados();
          this.pesquisa();
          this.filtrarLista();
        }, this.dashConstants.intervalTime)
      } else {
        clearInterval(this.interval);
        this.gerarDados();
      }
    } else {
      this.usersData = [];
    }
  }

  pesquisa() {
    if (this.filterData.pesquisa != null) {
      this.userDataFiltered = this.usersData.filter(userData => {
        let regex = new RegExp(this.filterData.pesquisa, 'gi')
        let temID_HD: boolean;

        let temUsuario: boolean = regex.test(userData.usuario);
        let temID: boolean = regex.test(userData.id);
        if (userData.id_hd) {
          temID_HD = regex.test(userData.id_hd);
        }

        return temUsuario || temID || temID_HD;
      })
    } else {
      this.userDataFiltered = this.usersData;
    }
  }

  filtrarPorDepartamento() {


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
