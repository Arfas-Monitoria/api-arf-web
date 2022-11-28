import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async';
import { IPayloadGetLeituraDepartamentosAVG } from './../../../../../interface/metricas';
import { DashboardCommums } from '../../../../../constants/dashboardCommums';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
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
    private metricasService: MetricasService,
    private dashConstants: DashboardCommums) { }

  @Input() filterData: IDadosFiltro;
  @Input() chartRealTime = true;
  dateInputs: { dataInicio: string, dataFim: string };

  objectValues = Object.values;

  componentes: { checked: boolean, color: string, nome: string }[]
  labels: string[] = [];
  datasets: any[];
  title: string;
  interval;
  dataFinded: boolean;

  chartDataClone: ChartConfiguration['data'];
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
    this.dashServices.datesEmitter.subscribe(data => {
      this.dateInputs = data
    })
    this.dashServices.buscarEvent.subscribe((data) => {
      if (data.card != this.card) return;

      if (this.dateInputs.dataFim == this.dateInputs.dataInicio) {
        this.chartRealTime = true
      } else {
        this.chartRealTime = false
      }
      this.atualizarDados()
    })

    this.chartRealTime = true;
    this.dateInputs = { dataInicio: this.filterData.date, dataFim: this.filterData.date }
    this.atualizarDados()
  }

  ngOnDestroy() {
    clearIntervalAsync(this.interval);
  }

  ngOnChanges(changes: SimpleChange) {
    if (changes['filterData'].previousValue) {
      if (!changes.firstChange && this.chartRealTime &&
        changes['filterData'].currentValue.componenteSelecionado != changes['filterData'].previousValue.componenteSelecionado) {
        this.datasets = this.filterData.departamentos.map(dep => {
          return {
            label: dep.nome,
            borderColor: dep.cor,
            pointBackgroundColor: dep.cor,
            data: []
          }
        });
        this.labels = []
        clearIntervalAsync(this.interval);
        this.atualizarDados()
      }
    }

    if (this.chartType == 'bar') {
      this.filtrarChartBar()
    }

    if (this.filterData && this.dateInputs) {
      this.qtdComponentesSelecionados =
        this.objectValues(this.filterData.componentesSelecionados).filter(item => item.checked).length
    }
  }

  filtrarChartBar() {
    const departamentos = this.filterData.departamentosSelecionados.map(dep => dep.nome)
    const componentesSelecionados = (this.componentes.filter(comp => comp.checked)).map(comp => comp.nome);

    const datasets = this.chartDataClone.datasets.filter(dataset => componentesSelecionados.includes(dataset.label))
    const labels = this.chartDataClone.labels.filter((label: string) => departamentos.includes(label))

    this.chartData = {
      labels, datasets
    }
  }

  async atualizarDados() {
    const departamentos = this.filterData.departamentosSelecionados;
    this.metrica = this.filterData.metrica;

    this.labels = []
    this.datasets = []

    this.title = 'Uso Relativo Médio (%)';

    this.datasets = departamentos.map(dep => {
      return {
        label: dep.nome,
        borderColor: dep.cor,
        pointBackgroundColor: dep.cor,
        data: []
      }
    });

    if (this.chartRealTime && this.datasets.length > 0) {
      if (this.chartType == 'bar') {
        this.dashServices.spinnerStateEmitter.emit({ card: 'chart', state: true });
      }
      this.chartType = 'line';
      this.dashServices.chartTypeEmitter.emit('line')

      await this.gerarDadosGrafico();
      this.dashServices.spinnerStateEmitter.emit({ card: 'chart', state: false })

      this.interval = setIntervalAsync(async () => await this.gerarDadosGrafico(), this.dashConstants.intervalTime)

    } else if (this.datasets.length > 0) {
      clearIntervalAsync(this.interval)
      this.dashServices.spinnerStateEmitter.emit({ card: 'chart', state: true });

      this.chartType = 'bar';
      this.dashServices.chartTypeEmitter.emit('bar')

      // Pega o nome dos departamentos
      this.labels = this.filterData.departamentos.map(dep => dep.nome);

      let payload: IPayloadGetLeituraDepartamentosAVG = {
        dataInicio: this.dateInputs.dataInicio,
        dataFim: this.dateInputs.dataFim,
        nomeComponente: '',
        nomeDepartamento: ''
      }
      let barDatasets = [];

      this.componentes =
        Object.values(this.filterData.componentesSelecionados);

      for (let i = 0; i < this.componentes.length; i++) {
        let data = []

        await Promise.all(this.labels.map(async depNome => {
          payload.nomeDepartamento = depNome;
          payload.nomeComponente = this.componentes[i].nome

          const leitura = (await this.metricasService.getLeituraDepartamentosAVG(payload))[0];
          console.log('---------------CALLS-CHART-------------------')

          if (!leitura.avgUso) {
            console.warn('nenhum dado encontrado!')
            return
          }

          data.push(leitura.avgUso)
        }))

        barDatasets.push({
          label: this.componentes[i].nome,
          data,
          backgroundColor: this.componentes[i].color,
          borderColor: this.componentes[i].color,
          borderWidth: 1
        })
      }

      this.dataFinded = barDatasets.some(dataset => {
        return dataset.data.length > 0;
      });

      this.chartData = {
        labels: this.labels,
        datasets: barDatasets
      }

      this.chartDataClone = JSON.parse(JSON.stringify(this.chartData))

      this.filtrarChartBar()

      this.chartOptions.plugins.title.text = this.title + " no Período"

      this.dashServices.spinnerStateEmitter.emit({ card: 'chart', state: false });
    };
  }

  async gerarDadosGrafico() {

    let lineDatasets = this.datasets;

    // Se a qtd de horarios for maior ou igual a quantidade de dados, tira o 1º elemento
    const qtdDados = 10;

    const isLimitDados = this.labels.length >= qtdDados;

    let payload: IPayloadGetLeituraDepartamentosAVG = {
      dataFim: this.dashServices.pegarDataHoje('us'),
      dataInicio: this.dashServices.pegarDataHoje('us'),
      nomeComponente: this.filterData.componenteSelecionado,
      nomeDepartamento: ''
    }

    await Promise.all(lineDatasets.map(async (dataset: { data: number[], label: string }) => {
      payload.nomeDepartamento = dataset.label

      let obj = (await this.metricasService.getLeituraDepartamentosAVG(payload))[0];

      console.log('---------------CALLS-CHART-------------------')

      if (isLimitDados) {
        dataset.data.shift();
      }

      if (!obj.avgUso) {
        console.error('Nenhum dado encontrado!')
        return
      }

      dataset.data.push(obj.avgUso)
    }))

    if (this.chartType != 'line') return

    this.dataFinded = lineDatasets.some(dataset => dataset.data.length > 0);
    lineDatasets = lineDatasets.filter(lineDataset => this.filterData.departamentosSelecionados.find(dep => dep.nome == lineDataset.label))

    this.labels.push(this.dashServices.pegarHorarioAtual())

    if (isLimitDados || lineDatasets[0].data.length < this.labels.length) {
      this.labels.shift();
    }

    this.chartData = {
      labels: this.labels,
      datasets: lineDatasets,
    }

    this.chartOptions.plugins.title.text = this.title + ` em Tempo Real de ${this.filterData.componenteSelecionado}`
  }
}
