import { DashboardCommums } from './../../../../constants/dashboardCommums';
import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
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
  constructor(private dashServices: DashboardService, private simulador: SimuladorService, private dashConstants: DashboardCommums) { }

  @Input() componente: string;
  @Input() filterData: IDadosFiltro;
  @Input() chartRealTime: boolean;

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
    this.atualizarDados();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.atualizarDados();
  }

  atualizarDados() {
    if (this.filterData.componente == this.componente) {

      let departamentos = this.filterData.departamentosSelecionados;
      let title, min, max;

      if (this.filterData.metrica == 'temperatura') {
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

          this.chartOptions.plugins.title.text = title + " em Tempo Real"

        }, this.dashConstants.intervalTime);
      } else if (datasets.length > 0) {
        // clearInterval(this.interval)
        this.chartType = 'bar';

        // Pega o nome dos departamentos
        let barLabels = departamentos.map(dep => dep.nome);

        let randomValues: any = this.simulador.gerarDadosAleatorios(barLabels.length, min, max);

        // Gera cores baseadas nas cores dos departamentos
        let barColors = departamentos.map(dep => dep.cor);

        if (!Array.isArray(randomValues)) {
          randomValues = [randomValues]
        }

        let barDatasets = [{
          label: title,
          data: randomValues,
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
