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
  @Input() chartRealTime: boolean;
  @Input() chartUserOn = false;

  objectValues = Object.values;

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
  interval;
  qtdComponentesSelecionados: number;

  ngOnInit(): void {
    this.dashServices.chartStateEmitter.subscribe(data => {

      this.chartRealTime = data
      this.atualizarDados()
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.interval);
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.qtdComponentesSelecionados = this.objectValues(this.filterData.componentesSelecionados).filter(item => item.checked).length
    this.atualizarDados()
  }

  atualizarDados() {
    let departamentos = this.filterData.departamentosSelecionados;
    this.metrica = this.filterData.metrica;
    let title, min, max;

    if (this.metrica == 'temperatura') {
      title = 'Temperatura Média (°C)'
      min = 50;
      max = 100;
    } else {
      title = 'Uso Relativo Médio (%)';
      min = 20;
      max = 100;
    }

    let labels: string[] = [];
    let i = 0;
    let qtdDados = 10;
    let datasets = departamentos.map(dep => {
      i++;
      return {
        label: dep.nome,
        borderColor: dep.cor,
        pointBackgroundColor: dep.cor,
        data: []
      }
    });

    clearInterval(this.interval)

    if (this.chartRealTime && datasets.length > 0) {
      this.chartType = 'line';

      this.interval = setInterval(() => {
        // console.log("chart calls")
        // Se a qtd de horarios for maior ou igual a quantidade de dados, tira o 1º elemento
        if (labels.length >= qtdDados) {
          labels.shift();
          labels.push(this.dashServices.pegarHorarioAtual());

          datasets.map(dataset => {
            let randomValue = this.simulador.gerarDadosAleatorios<number>(1, min, max);

            dataset.data.shift();
            dataset.data.push(randomValue)
          })
        } else {
          labels.push(this.dashServices.pegarHorarioAtual());

          datasets.map(dataset => {
            let randomValue = this.simulador.gerarDadosAleatorios<number>(1, min, max);

            dataset.data.push(randomValue)
          })
        }

        this.chartData = {
          labels: labels,
          datasets: datasets,
        }

        this.chartOptions.plugins.title.text = title + ` em Tempo Real de ${this.filterData.componenteSelecionado}`

      }, this.dashConstants.intervalTime);
    } else if (datasets.length > 0) {
      // clearInterval(this.interval)
      this.chartType = 'bar';

      // Pega o nome dos departamentos
      let barLabels = departamentos.map(dep => dep.nome);

      let randomValues = () => this.simulador.gerarDadosAleatorios<number[]>(barLabels.length, min, max);

      let barDatasets = Object.values(this.filterData.componentesSelecionados)
        .filter(obj => obj.checked)
        .map((obj, index, arr) => {
          if (!Array.isArray(randomValues())) {
            var value: any = [randomValues()];
          } else {
            var value: any = randomValues();
          }

          return {
            label: title + ` de ${obj.nome}`,
            data: value,
            backgroundColor: obj.color,
            borderColor: obj.color,
            borderWidth: 1
          }
        })

      console.log('-----------------------------: ', this.simulador.gerarDadosAleatorios<number[]>(barLabels.length, min, max))

      this.chartData = {
        labels: barLabels,
        datasets: barDatasets
      }

      this.chartOptions.plugins.title.text = title + " no Período"
    };
  }
}
