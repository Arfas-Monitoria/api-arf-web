import { DashboardCommums } from '../../../../../constants/dashboardCommums';
import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  EventEmitter,
  Output,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IDadosFiltro, IDepartamento } from 'src/app/interface/comum'

@Component({
  selector: 'arf-filters',
  templateUrl: './arf-filters.component.html',
  styleUrls: ['./arf-filters.component.scss'],
})
export class ArfFiltersComponent implements OnInit {
  constructor(
    protected dashServices: DashboardService,
    private dashConstants: DashboardCommums,
  ) { }

  @Output() atualizarFiltros = new EventEmitter<IDadosFiltro>();
  chartRealTime = true;
  @Input() card: 'lista' | 'chart';
  @Input() isCPU = false;
  @ViewChildren('checkboxesDep') checkboxesDep: ElementRef[];
  @ViewChildren('checkboxesComp') checkboxesComp: ElementRef[];

  componentes = {
    cpu: { nome: 'CPU', checked: true, color: this.dashConstants.componentsColors[0] },
    ram: { nome: 'RAM', checked: true, color: this.dashConstants.componentsColors[1] },
    hdd: { nome: 'HDD', checked: true, color: this.dashConstants.componentsColors[2] }
  }
  algumComponenteSelecionado: boolean;

  objectKeys = Object.keys;
  metrica = "uso_relativo";
  componente = "CPU";
  date = this.dashServices.pegarDataHoje('us');
  pesquisa: string;
  dataPesquisa: string;

  showChkDepartamentos = false
  showChkComponentes = false
  departamentos: IDepartamento[];
  departamentosSelecionados: IDepartamento[];

  chkClass = "fa-solid fa-square-check"
  notChkClass = "fa-regular fa-square"

  btnDisabled: boolean;
  @Input() chartType = 'line';

  async ngOnInit() {
    this.dataPesquisa = this.date

    this.departamentos = await this.dashServices.getDepartamentos();
    this.dashServices.chartTypeEmitter.subscribe(chartType => {
      this.chartType = chartType
    })

    this.dashServices.datesEmitter.subscribe(data => {
      const dataHoje = data.dataInicio == data.dataFim;

      if (this.chartType == 'line' && (data.dataInicio == '' || data.dataFim == '' || dataHoje)) {
        this.btnDisabled = true
      } else {
        this.btnDisabled = false
      }

      if (this.card == 'chart') return
      this.chartRealTime = dataHoje
    })

    this.dashServices.buscarEvent.subscribe((data) => {
      if (data.card != this.card) return;

      if (this.card == 'lista') {
        this.dataPesquisa = this.date;
        this.enviarDadosFiltros()
      }
      this.chartRealTime = data.chartRealTime
    })
  }

  async ngAfterViewInit() {
    this.departamentos = await this.dashServices.getDepartamentos();
    this.btnDisabled = true;
    this.enviarDadosFiltros();
  }

  verificarData() {
    if (this.dataPesquisa != this.date) {
      this.btnDisabled = false
    } else {
      this.btnDisabled = true;
    }
  }

  // Mostra/esconde o select dos departamentos
  toggleSelect(checkbox: string) {
    if (checkbox == 'componentes') {
      this.showChkComponentes = !this.showChkComponentes
    } else {
      this.showChkDepartamentos = !this.showChkDepartamentos
    }
  }

  // Envia os dados atualizados aos outros componentes
  enviarDadosFiltros() {
    this.filtrarSelects();
    // alert('changes')
    // this.btnDisabled = false;

    // Pega somente os selecionados
    this.departamentosSelecionados = this.departamentos.filter(dep => dep.checked);

    // envia o valor dos filtros para os componentes
    this.atualizarFiltros.emit({
      card: this.card,
      departamentosSelecionados: this.departamentosSelecionados,
      componentesSelecionados: this.componentes,
      componenteSelecionado: this.componente,
      departamentos: this.departamentos,
      metrica: this.metrica ? this.metrica : null,
      date: this.date,
      pesquisa: this.pesquisa ? this.pesquisa : null,
    });
  }

  // Filtra o estado dos departamentos de acordo com o estado dos checkboxes (famosa gambeta)
  filtrarSelects() {
    this.departamentos.map((dep, index) => {
      if (this.checkboxesDep['_results'][index].nativeElement.className == this.chkClass) {
        dep.checked = true
      } else {
        dep.checked = false
      }
    })

    let i = 0;

    if ((this.card == 'lista' || !this.chartRealTime) || (this.card == 'chart' && this.chartType == 'bar')) {
      for (const prop in this.componentes) {
        if (this.checkboxesComp['_results'][i].nativeElement.className == this.chkClass) {
          this.componentes[prop].checked = true;
        } else {
          this.componentes[prop].checked = false;
        }
        i++
      }
    }

    this.algumComponenteSelecionado = this.objectKeys(this.componentes).some(comp => {
      return this.componentes[comp].checked;
    })
  }

  filtrarLista(chkBoxId: string, card: string) {
    if (card == this.card) {
      // Pega o checkbox clicado
      let chkBoxRef = document.getElementById(`${chkBoxId}`);

      // Pega o estado do checkbox (checado ou não)
      let isChecked = chkBoxRef.className == this.chkClass;

      // Troca o estado do checkbox
      document.getElementById(`${chkBoxId}`).className = isChecked ? this.notChkClass : this.chkClass;

      this.enviarDadosFiltros();
    }
  }
}
