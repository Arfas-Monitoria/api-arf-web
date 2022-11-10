import { Component, Input, OnInit } from '@angular/core';
import { IDadosFiltro } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard-chart',
  templateUrl: './arf-dashboard-chart.component.html',
  styleUrls: ['./arf-dashboard-chart.component.scss']
})
export class ArfDashboardChartComponent implements OnInit {
  @Input() card: string;
  @Input() titleIcon: string;

  filterData: IDadosFiltro;
  chartRealTime: boolean;

  constructor(private dashServices: DashboardService) { }

  ngOnInit(): void {
    this.dashServices.chartStateEmitter.subscribe(data =>
      this.chartRealTime = data
    )
  }

}
