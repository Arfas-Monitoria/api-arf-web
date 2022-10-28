import { Component, Input, OnInit } from '@angular/core';
import { IDadosFiltro } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard-chart',
  templateUrl: './arf-dashboard-chart.component.html',
  styleUrls: ['./arf-dashboard-chart.component.scss']
})
export class ArfDashboardChartComponent implements OnInit {
  @Input() card: string; // HDD | RAM | CPU
  @Input() titleIcon: string;

  exibicao: string;
  filterData: IDadosFiltro;
  chartRealTime: boolean;
  showChartUser: boolean = false;

  constructor(private dashServices: DashboardService) { }

  ngOnInit(): void {
    // this.dashServices.atualizarFiltros.subscribe((filter) => {
    // só atualiza a exibição se estiver no componente certo
    // if (filter.card === this.card) {
    // this.exibicao = filter.exibicao;
    //   this.filterData = filter;
    // }
    // });
  }

}
