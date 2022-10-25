import { Component, Input, OnInit } from '@angular/core';
import { IDadosFiltro } from 'src/app/interface/comum';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard-card',
  templateUrl: './arf-dashboard-card.component.html',
  styleUrls: ['./arf-dashboard-card.component.scss']
})
export class ArfDashboardCardComponent implements OnInit {
  @Input() componente: string; // HDD | RAM | CPU
  @Input() titleIcon: string;

  exibicao: string;
  filterData: IDadosFiltro;
  chartRealTime: boolean;
  showChartUser: boolean = false;

  constructor(private dashServices: DashboardService) { }

  ngOnInit(): void {
    this.dashServices.atualizarFiltros.subscribe((filter) => {
      // só atualiza a exibição se estiver no componente certo
      if (filter.componente === this.componente) {
        this.exibicao = filter.exibicao;
        this.filterData = filter;
      }
    });
  }

}
