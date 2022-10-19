import { SimuladorService } from 'src/app/services/simulador.service';
import { IDadosFiltro } from 'src/app/interface/metricas';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard',
  templateUrl: './arf-dashboard.component.html',
  styleUrls: ['./arf-dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
