import { componentes, IDateInputs, IResponseLeituraMediaDepartamentos } from './../../../../interface/metricas';
import { MetricasService } from './../../../../services/API/metricas.service';
import { DashboardCommums } from './../../../../constants/dashboardCommums';
import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { IDadosFiltro, metricas } from 'src/app/interface/metricas';
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
    private metricasServices: MetricasService,
    private dashConstants: DashboardCommums
  ) { }

  @Input() componente: componentes;
  @Input() filterData: IDadosFiltro;
  @Input() chartUserOn: boolean;

  inputDatesData: IDateInputs;
  chartRealTime: boolean;
  metrica: metricas = 'uso_relativo';
  interval;
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
  // departamentosSelecionados: IDepartamento[];
  colors: string[] = this.dashConstants.colors;

  ngOnInit(): void {
    this.chartRealTime = this.inputDatesData.chartRealTime;

    console.warn("se der erro no chart, provavelmente é o comment na linha abaixo")
    // this.atualizarDados();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.atualizarDados();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.interval);
  }

  atualizarDados() {
    if (this.filterData.componente == this.componente) {

      let departamentos = this.filterData.departamentosSelecionados;
      let nomeDepartamentos = this.filterData.departamentosSelecionados.map(dep => dep.nome);
      let title;

      if (this.filterData.metrica == 'temperatura' || this.metrica && this.metrica == 'temperatura') {
        title = 'Temperatura Média (°C)'
      } else {
        title = 'Uso Relativo Médio (%)';
      }

      let labels: string[] = [];
      let i = 0;
      let qtdDados = 6;
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
      // this.chartData = {
      //   labels: labels,
      //   datasets: datasets,
      // }

      if (this.chartRealTime && datasets.length > 0) {
        this.chartType = 'line';

        this.interval = setInterval(() => {
          console.log("chart calls")

          const dataAtual = this.dashServices.pegarDataHoje('us');

          const leitura = this.dashServices.getLeituraMediaDepartamentos<IResponseLeituraMediaDepartamentos>
            ({ nomeDepartamentos, nomeComponente: this.componente, metrica: this.metrica, dataInicio: dataAtual, dataFim: dataAtual });

          const hasLimiteDados = labels.length >= qtdDados;

          // Se a qtd de horarios for maior ou igual a quantidade de dados, tira o 1º elemento
          if (hasLimiteDados) {
            labels.shift();
          }
          labels.push(leitura.hora);

          datasets.map(dataset => {
            if (hasLimiteDados) {
              dataset.data.shift();
            }
            dataset.data.push(...leitura.dados)
          })

          this.chartData = {
            labels: labels,
            datasets: datasets,
          }

          this.chartOptions.plugins.title.text = title + " em Tempo Real"

        }, this.dashConstants.intervalTime);
      } else if (datasets.length > 0) {
        // clearInterval(this.interval)
        this.chartType = 'bar';

        const dataInicio = this.inputDatesData.dataInicio;
        const dataFim = this.inputDatesData.dataFim;

        const leitura = this.dashServices.getLeituraMediaDepartamentos<IResponseLeituraMediaDepartamentos>
          ({ nomeDepartamentos, nomeComponente: this.componente, metrica: this.metrica, dataInicio, dataFim });

        // Pega o nome dos departamentos
        let barLabels = departamentos.map(dep => dep.nome);

        let barValues = leitura.dados

        // Gera cores baseadas nas cores dos departamentos
        let barColors = departamentos.map(dep => dep.cor);

        if (!Array.isArray(barValues)) {
          barValues = [barValues]
        }

        let barDatasets = [{
          label: title,
          data: barValues,
          backgroundColor: barColors,
          borderColor: barColors,
          borderWidth: 1
        }]

        this.chartData = {
          labels: barLabels,
          datasets: barDatasets
        }

        this.chartOptions.plugins.title.text = title + " no Período"
      };

    }
  }
}
