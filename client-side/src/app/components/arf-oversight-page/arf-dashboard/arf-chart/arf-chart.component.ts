import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { IDadosFiltro, IDepartamento } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-chart',
  templateUrl: './arf-chart.component.html',
  styleUrls: ['./arf-chart.component.scss'],
})
export class ArfChartComponent implements OnInit {
  @Input() componente: string;
  @Input() filterData: IDadosFiltro;

  labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  title: string = '';

  chartData: ChartConfiguration['data'];

  chartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  chartType: keyof ChartTypeRegistry = 'line';

  constructor(private dashServices: DashboardService) { }


  ngOnInit(): void {
    if (this.filterData.componente == this.componente) {
      if (this.filterData.metrica == 'temperatura') {
        this.title = 'Temperatura Média (°C)';
      } else {
        this.title = 'Uso Relativo (%)';
      }

      // this.chartOptions = {
      //   responsive: true,
      //   aspectRatio: 3 / 1,
      //   plugins: {
      //     legend: {
      //       display: false,
      //     },
      //     title: {
      //       display: true,
      //       position: 'right',
      //       text: this.title,
      //     },
      //   },
      // }

      const datasets = this.filterData.departamentosSelecionados.map((dep) => {
        console.log(dep.nome)
        return {
          label: dep.nome,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        }
      });

      this.chartData = {
        labels: this.labels,
        datasets: datasets,
      }
      Chart.defaults.plugins.legend.display = false;
    }
  }
}
