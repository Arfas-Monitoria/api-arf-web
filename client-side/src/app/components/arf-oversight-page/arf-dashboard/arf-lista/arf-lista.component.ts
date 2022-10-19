import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardCommums } from './../../../../constants/dashboardCommums';
import { DashboardService } from 'src/app/services/dashboard.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { IUserData, IDadosFiltro } from 'src/app/interface/metricas';
import { filter } from 'rxjs';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'arf-lista',
  templateUrl: './arf-lista.component.html',
  styleUrls: ['./arf-lista.component.scss'],
})
export class ArfListaComponent implements OnInit {
  @Input() componente: string;
  @Input() filterData: IDadosFiltro;
  @Output() emitUserChart = new EventEmitter();
  @ViewChildren('filterIcons') filterIcons: HTMLElement[]

  // filtro: string;
  chartUserOn: boolean = false;
  usersData: IUserData[];
  userDataFiltered: IUserData[] = [];
  departamentosSelecionados: string[];
  hasDepartamentosSelecionados: boolean;
  userFilters: string[] = [
    'pin',
    'ID',
    'Usuário',
    'Departamento',
    'Data',
    'Uso (%)',
  ];
  filterVar = ['pin', 'id', 'usuario', 'departamento', 'date', 'uso_relativo']

  crescente: string = 'fa-solid fa-chevron-up';
  decrescente: string = 'fa-solid fa-chevron-down';
  neutro: string = 'fa-solid fa-minus';
  imgClass = this.neutro;
  interval;

  mostrarGrafico: boolean;

  constructor(
    private dashConstants: DashboardCommums,
    private usuarioServices: UsuariosService,
    private dashServices: DashboardService) { }

  ngOnInit(): void {
    // Gera os dados inicias dos usuários
    this.usersData = this.dashConstants.usersData.map(userData => {
      return {
        id: '' + ,
        usuario: userData.usuario,
        departamento: userData.departamento,
        date: this.dashServices.converterDate(),
        uso_relativo: ,
        isPinned: false
      }
    })

    // Adiciona dados do HD
    if (this.componente == 'HDD') {
      this.filterVar.splice(2, 0, 'id_hd');
      this.userFilters.splice(2, 0, 'ID-HDD');
    }

    // Gera os IDS dos HD's
    if (this.componente == 'HDD') {
      this.usersData.map(userData => {
        userData.id_hd = '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000)
      })
    }

    // Adiciona dados da CPU
    if (this.componente == 'CPU') {
      this.filterVar.splice(6, 0, 'temperatura');
      this.userFilters.splice(6, 0, 'Temp (ºC)');
    }

    // Gera as temperaturas das CPU's
    if (this.componente == 'CPU') {
      this.usersData.map(userData => {
        userData.temperatura = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
      })
    }

    this.atualizarDados()
    this.pesquisa()
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    let isComponenteCerto = this.componente == this.filterData.componente;

    if (this.usersData && isComponenteCerto) {
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

  // Filtra os dados dos usuários dos departamentos selecionados
  // atualizarUserData() {
  //   let nomeDepartamentosSelecionados = this.filterData.departamentosSelecionados.map(dep => dep.nome)

  //   let usersDataConstantsFiltered = this.usersData.filter(userData => {
  //     return nomeDepartamentosSelecionados.includes(userData.departamento)
  //   })

  //   //gerar dados simulação
  //   usersDataConstantsFiltered.map(userData => {
  //     return {
  //       id: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
  //       usuario: userData.usuario,
  //       departamento: userData.departamento,
  //       date: this.dashServices.converterDate(this.filterData.date),
  //       uso_relativo: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
  //       isPinned: false
  //     }
  //   })
  // }

  atualizarDados() {
    clearInterval(this.interval);

    this.departamentosSelecionados = this.filterData.departamentosSelecionados.map(dep => dep.nome);
    // this.hasDepartamentosSelecionados = this.departamentosSelecionados.length > 0;

    // if (this.hasDepartamentosSelecionados) {
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
    // }
    // else {
    //   this.userDataFiltered = [];
    // }
  }

  pesquisa() {
    if (this.componente != this.filterData.componente) return

    let hasSomeDepartamentUnchecked = this.filterData.departamentos.some(dep => !dep.checked);

    if (this.filterData.pesquisa != null || hasSomeDepartamentUnchecked) {
      this.userDataFiltered = this.usersData.filter(userData => {
        let regex = new RegExp(this.filterData.pesquisa, 'gi')
        let hasID_HD: boolean;

        let isDepartamentChecked = this.departamentosSelecionados.some(dep => dep == userData.departamento)
        let hasUsuario: boolean = regex.test(userData.usuario);
        let hasID: boolean = regex.test(userData.id);
        if (userData.id_hd) {
          hasID_HD = regex.test(userData.id_hd);
        }

        if (userData.isPinned) {
          return true;
        }
        else if (isDepartamentChecked) {
          return hasUsuario || hasID || hasID_HD || this.filterData.pesquisa == null
        }
        return false
      })
    } else {
      this.userDataFiltered = this.usersData;
    }
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

    let isCamposNumericos = filtro != "usuario" && filtro != "departamento";

    switch (setaStateClass) {
      case this.crescente:
        if (isCamposNumericos && filtro != 'pin') {
          // Sort para números
          this.userDataFiltered.sort((a: any, b: any) => b[filtro] - a[filtro])
        } else if (filtro != 'pin') {
          // Sort para palavras
          this.userDataFiltered.sort((a, b) => a[filtro].localeCompare(b[filtro])).reverse()
        } else {
          // Sort para pins
          this.userDataFiltered.sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
        }
        break;
      case this.decrescente:
        if (isCamposNumericos && filtro != 'pin') {
          this.userDataFiltered.sort((a: any, b: any) => a[filtro] - b[filtro])
        } else if (filtro != 'pin') {
          // Sort para palavras
          this.userDataFiltered.sort((a, b) => a[filtro].localeCompare(b[filtro]))
        } else {
          // Sort para pins
          this.userDataFiltered.sort((a, b) => Number(a.isPinned) - Number(b.isPinned))
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
      userData.uso_relativo = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
    })

    if (this.componente == "CPU") {
      this.usersData.map(userData => {
        userData.temperatura = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
      })
    }
  }

  toggleChartUser(showChartUser: boolean, id?, id_hd?, usuario?) {
    // clearInterval(this.interval);
    // this.chartUserOn = showChartUser;
    // this.emitUserChart.emit({
    //   showChartUser, id, id_hd, usuario
    // });
  }
}
