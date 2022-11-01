import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { DashboardCommums } from '../../../../constants/dashboardCommums';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard-kpi',
  templateUrl: './arf-dashboard-kpi.component.html',
  styleUrls: ['./arf-dashboard-kpi.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ArfKpiComponent implements OnInit {
  constructor(
    private dashCommuns: DashboardCommums,
    private dashServices: DashboardService,
    private simulador: SimuladorService
  ) { }

  caretUp = "fa-solid fa-caret-up";
  caretDown = "fa-solid fa-caret-down";
  caretIcon = this.caretDown;
  caretColor = 'red'

  pieColors = ['#f33', '#3f3', '#33f']

  chartData: ChartConfiguration['data'] = {
    labels: ['CPU', 'RAM', 'HDD'],
    datasets: [
      {
        data: [10, 50, 40],
        backgroundColor: this.pieColors,
      }
    ]
  }
  chartOptions: ChartConfiguration['options'] = {
    aspectRatio: 1.2 / 1,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição de componentes com má performance',
      }
    }
  };

  departamentoSelecionado: string;
  departamentos: string[];

  KPIs: { title: string; label: string; }[];

  in_mes: string = this.dashServices.pegarDataHoje('us').slice(0, 7);
  dataHoje = this.dashServices.pegarDataHoje('us');
  dataInicio: string = this.dataHoje;
  dataFim: string = this.dataHoje;
  chartRealTime: boolean = this.dataInicio === this.dataHoje && this.dataFim === this.dataHoje;

  ngOnInit(): void {
    this.KPIs = this.dashCommuns.KPIs;
    this.departamentos = this.dashCommuns.departamentos.map(dep => dep.nome);
    this.departamentoSelecionado = this.departamentos[0];

    this.atualizarKPIs()
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.atualizarKPIs();
  }

  atualizarKPIs() {
    this.KPIs.map(kpi => {
      kpi.label = this.simulador.gerarDadosAleatorios(1, 55, 100) + '%'
      kpi.label = this.simulador.gerarDadosAleatorios(1, 55, 100) + '%'
    })
  }



  // atualizarData() {
  //   this.dataInicio = this.dataHoje;
  //   this.dataFim = this.dataHoje;
  //   this.verificarData()
  // }

  // verificarData() {
  //   this.chartRealTime = this.dataInicio === this.dataHoje && this.dataFim === this.dataHoje;
  // }
}
