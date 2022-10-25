import { SimuladorService } from 'src/app/services/simulador.service';
import { IDadosFiltro } from 'src/app/interface/comum';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard-page',
  templateUrl: './arf-dashboard-page.component.html',
  styleUrls: ['./arf-dashboard-page.component.scss'],
})
export class ArfDashboardPageComponent implements OnInit {
  // @Input() componente: string; // HDD | RAM | CPU
  // @Input() titleIcon: string;

  // exibicao: string;
  // filterData: IDadosFiltro;
  // chartRealTime: boolean;
  // showChartUser: boolean = false;

  // constructor(private dashServices: DashboardService) { }

  ngOnInit(): void {
    // this.dashServices.atualizarFiltros.subscribe((filter) => {
    //   // só atualiza a exibição se estiver no componente certo
    //   if (filter.componente === this.componente) {
    //     this.exibicao = filter.exibicao;
    //     this.filterData = filter;
    //   }
    // });
  }
}
