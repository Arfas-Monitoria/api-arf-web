import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { DashboardCommums } from '../../../../constants/dashboardCommums';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { MetricasService } from 'src/app/services/API/metricas.service';

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
    private metricasServices: MetricasService
  ) { }

  objectValues = Object.values;

  pieColors = this.dashCommuns.componentsColors

  chartData: ChartConfiguration['data'] = {
    labels: ['CPU', 'RAM', 'HDD'],
    datasets: [
      {
        data: [],
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
  KPIs = {
    CPU: {
      title: 'CPUs com má performance',
      porcentagem: null,
      diferenca: null,
      fracao: null

    },
    RAM: {
      title: 'RAMs com má performance',
      porcentagem: null,
      diferenca: null,
      fracao: null
    },
    HDD: {
      title: 'HDDs com má performance',
      porcentagem: null,
      diferenca: null,
      fracao: null
    },
  }

  in_mes: string = this.dashServices.pegarDataHoje('us').slice(0, 7);
  dataHoje = this.dashServices.pegarDataHoje('us');
  dataInicio: string = this.dataHoje;
  dataFim: string = this.dataHoje;
  chartRealTime: boolean = this.dataInicio === this.dataHoje && this.dataFim === this.dataHoje;

  async ngOnInit() {
    this.nomeDepartamentos = (await this.dashServices.getDepartamentos()).map(dep => dep.nome);
    this.departamentosSelecionado = this.nomeDepartamentos[0];
  }

  async ngOnChanges() {
    await this.atualizarKPIs();
  }

  async atualizarKPIs() {
    this.dashServices.spinnerStateEmitter.emit({ card: 'kpi', state: true });

    const payload: { departamento: string; mes: string; } = {
      departamento: this.departamentosSelecionado,
      mes: this.in_mes
    }
    const response = await this.metricasServices.getKPIsDepartamento(payload)

    this.KPIs.CPU.porcentagem = response.CPU.porcentagem
    this.KPIs.RAM.porcentagem = response.RAM.porcentagem
    this.KPIs.HDD.porcentagem = response.HDD.porcentagem

    this.KPIs.CPU.diferenca = response.CPU.diferenca
    this.KPIs.RAM.diferenca = response.RAM.diferenca
    this.KPIs.HDD.diferenca = response.HDD.diferenca

    this.KPIs.CPU.fracao = response.CPU.fracao
    this.KPIs.RAM.fracao = response.RAM.fracao
    this.KPIs.HDD.fracao = response.HDD.fracao

    this.chartData.datasets[0].data = [this.KPIs.CPU.fracao, this.KPIs.RAM.fracao, this.KPIs.HDD.fracao]

    this.dashServices.spinnerStateEmitter.emit({ card: 'kpi', state: false });
  }
}
