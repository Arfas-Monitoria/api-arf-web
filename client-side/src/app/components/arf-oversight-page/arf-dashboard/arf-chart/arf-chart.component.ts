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
  constructor(private dashServices: DashboardService, private simulador: SimuladorService) { }

  @Input() componente: string;
  @Input() filterData: IDadosFiltro;
  @Input() chartRealTime: boolean;

  interval;
  chartData: ChartConfiguration['data'];
  chartOptions: ChartConfiguration['options'];
  chartType: keyof ChartTypeRegistry;
  // departamentosSelecionados: IDepartamento[];
  colors: string[] = [
    "#16a0ff",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857"]

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
        title = 'Uso Relativo (%)';
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
          borderColor: this.colors[i - 1],
          pointBackgroundColor: this.colors[i - 1],
          data: []
        }
      });

      console.log(datasets)

      clearInterval(this.interval)
      this.chartData = {
        labels: labels,
        datasets: datasets,
      }

      if (this.chartRealTime && datasets.length > 0) {
        this.chartType = 'line';

        this.interval = setInterval(() => {
          // Se a qtd de horarios for maior ou igual a quantidade de dados, tira o 1º elemento
          if (labels.length >= qtdDados) {
            console.log("if")
            labels.shift();
            labels.push(this.simulador.pegarHorarioAtual());

            datasets.map(dataset => {
              let randomValue = this.simulador.gerarDadosAleatorios(1, min, max);

              dataset.data.shift();
              dataset.data.push(...randomValue)
            })
          } else {
            console.log("else")
            labels.push(this.simulador.pegarHorarioAtual());

            datasets.map(dataset => {
              let randomValue = this.simulador.gerarDadosAleatorios(1, min, max);

              dataset.data.push(...randomValue)
            })
          }

          this.chartData = {
            labels: labels,
            datasets: datasets,
          }

          console.log(datasets)
        }, 1 * 1000);
      } else if (datasets.length > 0) {
        clearInterval(this.interval)
        this.chartType = 'bar';
      };

      this.chartOptions = {
        aspectRatio: 2.5 / 1,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            position: 'right',
            text: title,
          },
        },
      }
    }
  }
}
