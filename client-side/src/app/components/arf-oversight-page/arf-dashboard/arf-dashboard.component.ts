import { IDadosFiltro } from 'src/app/interface/metricas';
import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard',
  templateUrl: './arf-dashboard.component.html',
  styleUrls: ['./arf-dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() componente: 'HDD' | 'RAM' | 'CPU';
  @Input() titleIcon: string;

  exibicao: string;
  filterData: IDadosFiltro;
  chartRealTime: boolean;
  showChartUser: boolean = false;

  constructor(private dashServices: DashboardService) { }

  ngOnInit(): void {
    this.dashServices.atualizarFiltros.subscribe((filter) => {
      if (filter.componente === this.componente) {
        this.exibicao = filter.exibicao;
        this.filterData = filter;
      }
    });
  }
}
