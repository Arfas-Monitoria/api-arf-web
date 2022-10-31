import { DashboardCommums } from '../../../../../constants/dashboardCommums';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { IDadosFiltro, IDepartamento } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SimuladorService } from 'src/app/services/simulador.service';

@Component({
  selector: 'arf-chart',
  templateUrl: './arf-chart.component.html',
  styleUrls: ['./arf-chart.component.scss'],
})
export class ArfChartComponent implements OnInit {
  constructor(
    private dashServices: DashboardService,
    private simulador: SimuladorService,
    private dashConstants: DashboardCommums) { }

  @Input() filterData: IDadosFiltro;
  @Input() chartRealTime = true;
  @Input() chartUserOn = false;

  objectValues = Object.values;

  labels: string[] = [];
  datasets; title; min; max; interval;

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

  ngOnInit(): void {
    this.dashServices.chartStateEmitter.subscribe(data => {
      this.chartRealTime = data
      this.atualizarDados()
    })

    this.chartRealTime = true;
    this.atualizarDados()
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnChanges(): void {
    this.qtdComponentesSelecionados = this.objectValues(this.filterData.componentesSelecionados).filter(item => item.checked).length
    this.atualizarDados()
  }

  atualizarDados() {
    let departamentos = this.filterData.departamentosSelecionados;
    this.metrica = this.filterData.metrica;

    this.labels = []

    if (this.metrica == 'temperatura') {
      this.title = 'Temperatura Média (°C)'
      this.min = 50;
      this.max = 100;
    } else {
      this.title = 'Uso Relativo Médio (%)';
      this.min = 20;
      this.max = 100;
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

      this.gerarDadosGrafico()

      this.interval = setInterval(() => this.gerarDadosGrafico(), this.dashConstants.intervalTime);
    } else if (this.datasets.length > 0) {
      // clearInterval(this.interval)
      this.chartType = 'bar';

      // Pega o nome dos departamentos
      let barLabels = departamentos.map(dep => dep.nome);

      let randomValues = () => this.simulador.gerarDadosAleatorios<number[]>(barLabels.length, this.min, this.max);

      let barDatasets = Object.values(this.filterData.componentesSelecionados)
        .filter(obj => obj.checked)
        .map(obj => {
          if (!Array.isArray(randomValues())) {
            var value: any = [randomValues()];
          } else {
            var value: any = randomValues();
          }

          return {
            label: this.title + ` de ${obj.nome}`,
            data: value,
            backgroundColor: obj.color,
            borderColor: obj.color,
            borderWidth: 1
          }
        })

      this.chartData = {
        labels: barLabels,
        datasets: barDatasets
      }

      this.chartOptions.plugins.title.text = this.title + " no Período"
    };
  }

  gerarDadosGrafico() {
    console.log("chart calls")

    // Se a qtd de horarios for maior ou igual a quantidade de dados, tira o 1º elemento
    let qtdDados = 10;

    if (this.labels.length >= qtdDados) {
      this.labels.shift();
      this.labels.push(this.dashServices.pegarHorarioAtual());

      this.datasets.map((dataset: { data: number[]; }) => {
        let randomValue = this.simulador.gerarDadosAleatorios<number>(1, this.min, this.max);

        dataset.data.shift();
        dataset.data.push(randomValue)
      })
    } else {
      this.labels.push(this.dashServices.pegarHorarioAtual());

      this.datasets.map((dataset: { data: number[]; }) => {
        let randomValue = this.simulador.gerarDadosAleatorios<number>(1, this.min, this.max);

        dataset.data.push(randomValue)
      })
    }

    this.chartData = {
      labels: this.labels,
      datasets: this.datasets,
    }

    this.chartOptions.plugins.title.text = this.title + ` em Tempo Real de ${this.filterData.componenteSelecionado}`
  }
}
