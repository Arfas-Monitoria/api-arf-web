import { filter, firstValueFrom, Subject, take } from 'rxjs';
import { IComponente } from './../../../../../interface/comum';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { DashboardCommums } from 'src/app/constants/dashboardCommums';
import { IDadosFiltro, IUserData } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SimuladorService } from 'src/app/services/simulador.service';

@Component({
  selector: 'arf-table-lista',
  templateUrl: './arf-table-lista.component.html',
  styleUrls: ['./arf-table-lista.component.scss']
})
export class ArfTableListaComponent implements OnInit {
  @Input() filterData: IDadosFiltro;
  @Output() emitUserChart = new EventEmitter();
  @ViewChildren('filterIcons') filterIcons: HTMLElement[]

  componentes: IComponente;
  chartUserOn = false;
  usersData: IUserData[];
  userDataFiltered: IUserData[] = [];
  departamentosSelecionados: string[];
  userFilters: string[] = [
    'pin',
    'ID-PC',
    'ID-HDD',
    'Usuário',
    'Departamento',
    'Data',
    'CPU(°C)',
    'CPU(%)',
    'RAM(%)',
    'HDD(%)'
  ];
  filterVar = [
    'pin',
    'id_pc',
    'id_hdd',
    'usuario',
    'departamento',
    'date',
    'temp_cpu',
    'uso_cpu',
    'uso_ram',
    'uso_hdd',
  ]

  crescente: string = 'fa-solid fa-chevron-up';
  decrescente: string = 'fa-solid fa-chevron-down';
  neutro: string = 'fa-solid fa-minus';
  imgClass = this.neutro;
  interval;

  mostrarGrafico: boolean;

  constructor(
    private dashConstants: DashboardCommums,
    private simulador: SimuladorService,
    private dashServices: DashboardService) {
  }

  ngOnInit() {
    this.usersData = this.dashConstants.usersData.map(userData => {
      return {
        id_pc: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
        id_hdd: '' + this.simulador.gerarDadosAleatorios<number>(1, 0, 1000),
        usuario: userData.usuario,
        departamento: userData.departamento,
        date: this.dashServices.converterDate(this.filterData.date),
        uso_cpu: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
        temp_cpu: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
        uso_ram: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
        uso_hdd: this.simulador.gerarDadosAleatorios<number>(1, 30, 100),
        isPinned: false
      }
    })

    this.atualizarDados()
    this.pesquisa()
    this.gerarDados();
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.usersData) {
      this.atualizarDados()
      this.pesquisa()
      this.filtrarLista()
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.filtrarLista()
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  atualizarDados() {
    this.componentes = this.filterData.componentesSelecionados;
    this.departamentosSelecionados = this.filterData.departamentosSelecionados.map(dep => dep.nome);

    this.usersData.map(userData => {
      userData.date = this.dashServices.converterDate(this.filterData.date)
    })

    // if (this.usersData[0].date == this.dashServices.pegarDataHoje('br')) {
    //   this.interval = setInterval(() => {
    //     console.log("lista calls");
    //     this.gerarDados();
    //     this.pesquisa();
    //     this.filtrarLista();
    //   }, this.dashConstants.intervalTime)
    // } else {
    //   clearInterval(this.interval);
    //   this.gerarDados();
    // }
  }

  pesquisa() {
    let hasSomeDepartamentUnchecked = this.filterData.departamentos.some(dep => !dep.checked);

    if (this.filterData.pesquisa != null || hasSomeDepartamentUnchecked) {
      this.userDataFiltered = this.usersData.filter(userData => {
        let regex = new RegExp(this.filterData.pesquisa, 'gi')
        let hasID_HD: boolean;

        let isDepartamentChecked = this.departamentosSelecionados.some(dep => dep == userData.departamento)
        let hasUsuario: boolean = regex.test(userData.usuario);
        let hasID: boolean = regex.test(userData.id_pc);
        hasID_HD = regex.test(userData.id_hdd);

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
      default:
        this.simulador.shuffleArray(this.userDataFiltered)
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
      document.querySelector(`#iconRef${i}`).className =
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

  gerarStatus(valor: number, isSelected: boolean): string {
    if (!isSelected) {
      return '';
    }

    if (valor > 70) {
      return 'redAlert'
    } else if (valor > 50) {
      return 'yellowAlert'
    }
    return 'greenAlert'
  }

  gerarDados() {
    // console.log('calls')
    if (this.usersData[0].date == this.dashServices.pegarDataHoje('br')) {
      this.interval = setInterval(() => {
        // console.log("lista calls");
        this.usersData.map(userData => {
          userData.uso_cpu = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
          userData.temp_cpu = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
          userData.uso_ram = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
          userData.uso_hdd = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
        })

        this.pesquisa();
        this.filtrarLista();
      }, this.dashConstants.intervalTime)
    } else {
      clearInterval(this.interval);
      this.gerarDados();
    }
    // this.usersData.map(userData => {
    //   userData.uso_cpu = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
    //   userData.temp_cpu = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
    //   userData.uso_ram = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
    //   userData.uso_hdd = this.simulador.gerarDadosAleatorios<number>(1, 45, 100)
    // })
  }
}
