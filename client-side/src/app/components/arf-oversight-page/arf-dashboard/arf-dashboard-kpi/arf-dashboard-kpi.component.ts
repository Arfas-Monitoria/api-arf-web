import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { DashboardCommums } from '../../../../constants/dashboardCommums';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

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
    private simulador: SimuladorService,
    private usuariosServices: UsuariosService
  ) { }

  caretUp = "fa-solid fa-caret-up";
  caretDown = "fa-solid fa-caret-down";
  caretIcon = this.caretDown;
  caretColor = 'red'

  pieColors = this.dashCommuns.componentsColors

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
    aspectRatio: 2.5 / 1,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false,
        text: 'Distribuição de componentes com má performance',
        font: {
          size: 12.5,
          family: 'Roboto',
        },

      }
    }
  };

  departamentosSelecionado: string;
  nomeDepartamentos: string[];

  KPIs: { title: string; label: string; }[];

  in_mes: string = this.dashServices.pegarDataHoje('us').slice(0, 7);
  dataHoje = this.dashServices.pegarDataHoje('us');
  dataInicio: string = this.dataHoje;
  dataFim: string = this.dataHoje;
  chartRealTime: boolean = this.dataInicio === this.dataHoje && this.dataFim === this.dataHoje;

  async ngOnInit() {
    this.KPIs = this.dashCommuns.KPIs;
    this.nomeDepartamentos = (await this.dashServices.getDepartamentos()).map(dep => dep.nome);
    this.departamentosSelecionado = this.nomeDepartamentos[0];

    this.atualizarKPIs()
  }

  ngOnChanges(): void {
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
