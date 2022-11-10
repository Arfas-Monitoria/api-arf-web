import { IComponente } from './../../../../../interface/comum';
import { IPayloadGetLeituraDepartamentosAVG } from './../../../../../interface/metricas';
import { DashboardCommums } from '../../../../../constants/dashboardCommums';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { IDadosFiltro, IDepartamento } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { MetricasService } from 'src/app/services/API/metricas.service';

@Component({
  selector: 'arf-chart',
  templateUrl: './arf-chart.component.html',
  styleUrls: ['./arf-chart.component.scss'],
})
export class ArfChartComponent implements OnInit {
  constructor(
    private dashServices: DashboardService,
    private userService: UsuariosService,
    private metricasService: MetricasService,
    private dashConstants: DashboardCommums) { }

  @Input() filterData: IDadosFiltro;
  @Input() chartRealTime = true;
  dateInputs: { dataInicio: string, dataFim: string };

  objectValues = Object.values;

  labels: string[] = [];
  datasets; title; interval;

  chartData: ChartConfiguration['data'];
  chartType: keyof ChartTypeRegistry;
  chartOptions: ChartConfiguration['options'] = {
    aspectRatio: 2.5 / 1,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        position: 'top',
      },
    },
  };
  colors: string[] = this.dashConstants.colors;
  card: string = 'chart';
  metrica = 'uso_relativo';
  qtdComponentesSelecionados: number;

  ngOnInit() {
    this.dashServices.chartStateEmitter.subscribe(data => {
      this.chartRealTime = data
      this.atualizarDados()
    })
    this.dashServices.datesEmitter.subscribe(data => {
      this.dateInputs = data
      this.atualizarDados()
    })

    this.chartRealTime = true;
    this.dateInputs = { dataInicio: this.filterData.date, dataFim: this.filterData.date }
    this.atualizarDados()
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnChanges() {
    if (this.filterData && this.dateInputs) {
      this.qtdComponentesSelecionados =
        this.objectValues(this.filterData.componentesSelecionados).filter(item => item.checked).length
      this.atualizarDados()
    }
  }

  async atualizarDados() {
    let departamentos = this.filterData.departamentosSelecionados;
    this.metrica = this.filterData.metrica;

    this.labels = []

    if (this.metrica == 'temperatura') {
      this.title = 'Temperatura Média (°C)'
    } else {
      this.title = 'Uso Relativo Médio (%)';
    }

    clearInterval(this.interval)

    this.datasets = departamentos.map(dep => {
      return {
        label: dep.nome,
        borderColor: dep.cor,
        pointBackgroundColor: dep.cor,
        data: []
      }
    });

    if (this.chartRealTime && this.datasets.length > 0) {
      this.chartType = 'line';

      await this.gerarDadosGrafico();

      this.interval = setInterval(async () => await this.gerarDadosGrafico(), this.dashConstants.intervalTime)

    } else if (this.datasets.length > 0) {
      this.chartType = 'bar';

      // Pega o nome dos departamentos
      let barLabels = departamentos.map(dep => dep.nome);

      let payload: IPayloadGetLeituraDepartamentosAVG = {
        dataInicio: this.dateInputs.dataInicio,
        dataFim: this.dateInputs.dataFim,
        nomeComponente: '',
        nomeDepartamento: ''
      }
      let barDatasets = [];

      const componentes: { checked: boolean, color: string, nome: string }[] =
        Object.values(this.filterData.componentesSelecionados);

      for (let i = 0; i < componentes.length; i++) {
        let data = []

        await Promise.all(barLabels.map(async depNome => {
          payload.nomeDepartamento = depNome;
          payload.nomeComponente = componentes[i].nome

          const leitura = (await this.metricasService.getLeituraDepartamentosAVG(payload));

          leitura.map(leitura => {
            data.push(leitura.avgUso)
          })
        }))

        barDatasets.push({
          label: componentes[i],
          data: data,
          backgroundColor: componentes[i].color,
          borderColor: componentes[i].color,
          borderWidth: 1
        })
      }

      this.chartData = {
        labels: barLabels,
        datasets: barDatasets
      }

      this.chartOptions.plugins.title.text = this.title + " no Período"
    };
  }

  async gerarDadosGrafico() {
    // console.log("chart calls")

    // Se a qtd de horarios for maior ou igual a quantidade de dados, tira o 1º elemento
    const qtdDados = 8;

    const isLimitDados = this.labels.length >= qtdDados;

    let payload: IPayloadGetLeituraDepartamentosAVG = {
      dataInicio: this.dateInputs.dataInicio,
      dataFim: this.dateInputs.dataFim,
      nomeComponente: this.filterData.componenteSelecionado,
      nomeDepartamento: ''
    }

    await Promise.all(this.datasets.map(async (dataset: { data: number[], label: string }) => {
      payload.nomeDepartamento = dataset.label

      let obj = (await this.metricasService.getLeituraDepartamentosAVG(payload))[0];

      if (isLimitDados) {
        dataset.data.shift();
      }

      if (this.filterData.metrica && this.filterData.metrica == 'temperatura') {
        dataset.data.push(obj.avgTemperatura)
      } else {
        dataset.data.push(obj.avgUso)
      }
    }))

    if (isLimitDados) {
      this.labels.shift();
    }
    this.labels.push(this.dashServices.pegarHorarioAtual())

    this.chartData = {
      labels: this.labels,
      datasets: this.datasets,
    }

    this.chartOptions.plugins.title.text = this.title + ` em Tempo Real de ${this.filterData.componenteSelecionado}`
  }
}
