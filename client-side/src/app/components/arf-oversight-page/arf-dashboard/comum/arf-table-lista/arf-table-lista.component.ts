import { IPayloadGetLeituraComponente } from './../../../../../interface/metricas';
import { IComponente, IUserDataLista, IComponenteLista } from './../../../../../interface/comum';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { DashboardCommums } from 'src/app/constants/dashboardCommums';
import { IDadosFiltro } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SimuladorService } from 'src/app/services/simulador.service';
import { MetricasService } from 'src/app/services/API/metricas.service';

@Component({
  selector: 'arf-table-lista',
  templateUrl: './arf-table-lista.component.html',
  styleUrls: ['./arf-table-lista.component.scss']
})
export class ArfTableListaComponent implements OnInit {
  @Input() filterData: IDadosFiltro;
  @Output() emitUserChart = new EventEmitter();
  @ViewChildren('filterIcons') filterIcons: HTMLElement[]

  isLoading = true;
  componentes: IComponente;
  chartUserOn = false;
  usersData: IUserDataLista[];
  userDataFiltered: IUserDataLista[] = [];
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
    'tempCPU',
    'usoCPU',
    'ram',
    'hdd',
  ]

  date;
  crescente: string = 'fa-solid fa-chevron-up';
  decrescente: string = 'fa-solid fa-chevron-down';
  neutro: string = 'fa-solid fa-minus';
  imgClass = this.neutro;
  interval;

  mostrarGrafico: boolean;

  constructor(
    private dashConstants: DashboardCommums,
    private simulador: SimuladorService,
    private metricasServices: MetricasService,
    private dashServices: DashboardService) { }

  async ngOnInit() {
    this.date = this.dashServices.converterDate(this.filterData.date);

    this.usersData = await Promise.all((await this.dashServices.getUsersData())
      .map(async userData => {
        const userCPU: IComponenteLista = {
          idComponente: userData.CPU.idComponente,
          uso: null,
          temperatura: null,
          alertaCriticoUso: userData.CPU.alertaCriticoUso,
          alertaCriticoTemperatura: userData.CPU.alertaCriticoTemperatura,
        }

        const userRAM: IComponenteLista = {
          idComponente: userData.RAM.idComponente,
          uso: null,
          alertaCriticoUso: userData.RAM.alertaCriticoUso,
        }

        const userHDD: IComponenteLista = {
          idComponente: userData.HDD.idComponente,
          uso: null,
          alertaCriticoUso: userData.HDD.alertaCriticoUso,
        }

        return {
          id_pc: userData.idComputador,
          id_hdd: userData.HDD.idComponente,
          usuario: userData.nomeFuncionario,
          departamento: userData.nomeDepartamento,
          cpu: userCPU,
          ram: userRAM,
          hdd: userHDD,
          date: this.date,
          isPinned: false,
        }
      }))

    this.atualizarDados();
    await this.gerarDados();
    this.pesquisa();
  }

  async ngOnChanges() {
    if (this.usersData) {
      this.atualizarDados()
      await this.gerarDados();
      this.pesquisa()
    }
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
  }

  pesquisa() {
    let hasSomeDepartamentUnchecked = this.filterData.departamentos.some(dep => !dep.checked);

    if (this.filterData.pesquisa != null || hasSomeDepartamentUnchecked) {
      this.userDataFiltered = this.usersData.filter(userData => {
        let regex = new RegExp(this.filterData.pesquisa, 'gi')

        let isDepartamentChecked = this.departamentosSelecionados.some(dep => dep == userData.departamento)
        let hasUsuario: boolean = regex.test(userData.usuario);
        let hasID: boolean = regex.test(userData.id_pc);
        let hasID_HD = regex.test(userData.id_hdd);

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
          // Sort para componentes
          if (filtro == 'tempCPU') {
            this.userDataFiltered.sort((a: any, b: any) => b['cpu'].ProxAlertaCriticoTemp - a['cpu'].ProxAlertaCriticoTemp
            )
          } else if (filtro == 'usoCPU') {
            this.userDataFiltered.sort((a: any, b: any) => b['cpu'].ProxAlertaCriticoUso - a['cpu'].ProxAlertaCriticoUso
            )
          } else if (filtro == 'ram' || filtro == 'hdd') {
            this.userDataFiltered.sort((a: any, b: any) => b[filtro].ProxAlertaCriticoUso - a[filtro].ProxAlertaCriticoUso)
          } else {
            // Sort para números
            this.userDataFiltered.sort((a: any, b: any) => b[filtro] - a[filtro])
          }
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
          // Sort para componentes
          if (filtro == 'tempCPU') {
            this.userDataFiltered.sort((a: any, b: any) => a['cpu'].ProxAlertaCriticoTemp - b['cpu'].ProxAlertaCriticoTemp
            )
          } else if (filtro == 'usoCPU') {
            this.userDataFiltered.sort((a: any, b: any) => a['cpu'].ProxAlertaCriticoUso - b['cpu'].ProxAlertaCriticoUso
            )
          } else if (filtro == 'ram' || filtro == 'hdd') {
            this.userDataFiltered.sort((a: any, b: any) => a[filtro].ProxAlertaCriticoUso - b[filtro].ProxAlertaCriticoUso)
          } else {
            // Sort para números
            this.userDataFiltered.sort((a: any, b: any) => a[filtro] - b[filtro])
          }
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

  gerarStatus(userComponente: IComponenteLista, isCPUtemp = false, valor: number, alertaCritico: number, isSelected: boolean): string {
    if (!isSelected || !valor) return '';

    const percentualTotal = valor / alertaCritico * 100;
    let color = '';
    const alertaMedio = alertaCritico * 0.66;
    const alertaIdeal = alertaCritico * 0.33;

    if (valor <= alertaIdeal) {
      const percentual = valor / alertaIdeal;
      const cor = (255 - percentual * 127).toFixed(0);

      color = `rgb(0,${cor},0)`
    } else if (valor <= alertaMedio) {
      const percentual = (valor - alertaIdeal) / (alertaMedio - alertaIdeal);
      const cor = (255 - percentual * 55).toFixed(0);

      color = `rgb(${cor},${cor},0)`
    } else {
      const percentual = (valor - alertaMedio) / (alertaCritico - alertaMedio);
      const cor = (120 - percentual * 120).toFixed(0);

      color = `rgb(255,${cor},${cor})`
    }

    if (isCPUtemp) {
      userComponente.ProxAlertaCriticoTemp = Number((percentualTotal).toFixed(1));
    } else {
      userComponente.ProxAlertaCriticoUso = Number((percentualTotal).toFixed(1));
    }

    return color;
  }

  async gerarDados() {
    clearInterval(this.interval);

    if (this.usersData[0].date == this.dashServices.pegarDataHoje('br')) {
      this.interval = setInterval(async () => {
        await this.gerarDadosLeitura();
        this.pesquisa();
        this.filtrarLista();
        this.dashServices.spinnerStateEmitter.emit({ card: 'lista', state: false });

      }, this.dashConstants.intervalTime)
    } else {
      await this.gerarDadosLeitura();
      this.pesquisa();
      this.filtrarLista();
      this.dashServices.spinnerStateEmitter.emit({ card: 'lista', state: false });
    }
  }

  async gerarDadosLeitura() {
    console.log("lista calls")

    await Promise.all(this.usersData.map(async userData => {
      let payload: IPayloadGetLeituraComponente = {
        idComponente: '',
        data: this.filterData.date,
      }

      payload.idComponente = userData.cpu.idComponente;
      const leituraCPU = (await this.metricasServices.GetLeituraComponente(payload))[0];
      userData.cpu.uso = leituraCPU ? leituraCPU.uso : null;
      userData.cpu.temperatura = leituraCPU ? leituraCPU.temperatura : null;

      payload.idComponente = userData.ram.idComponente;
      const leituraRAM = (await this.metricasServices.GetLeituraComponente(payload))[0];
      userData.ram.uso = leituraRAM ? leituraRAM.uso : null;

      payload.idComponente = userData.hdd.idComponente;
      const leituraHDD = (await this.metricasServices.GetLeituraComponente(payload))[0];
      userData.hdd.uso = leituraHDD ? leituraHDD.uso : null;
    }))
  }
}
