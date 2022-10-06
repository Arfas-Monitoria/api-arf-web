import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';
import { IDadosFiltro } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'arf-chart',
  templateUrl: './arf-chart.component.html',
  styleUrls: ['./arf-chart.component.scss']
})
export class ArfChartComponent implements OnInit {
  @Input() componente: string;

  labels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  title: string = "";

  chartData = {
    labels: this.labels,
    datasets: [{
      label: this.title,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  chartOptions = {};

  chartType: keyof ChartTypeRegistry = "line";

  constructor(private dashServices: DashboardService) { }

  ngOnInit(): void {
    this.dashServices.atualizarFiltros.subscribe({
      next: (filter: IDadosFiltro) => {
        if (filter.metrica == "temperatura") {
          this.title = "Temperatura Média (°C)";
        } else {
          this.title = "Uso Relativo (%)";
        }
      }
    })
  }
}
