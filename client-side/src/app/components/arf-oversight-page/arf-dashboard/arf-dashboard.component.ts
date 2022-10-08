import { IDadosFiltro } from 'src/app/interface/comum';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard',
  templateUrl: './arf-dashboard.component.html',
  styleUrls: ['./arf-dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() componente: string; // HDD | RAM | CPU
  @Input() titleIcon: string;

  dataHoje = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  exibicao: string;
  filterData: IDadosFiltro;

  constructor(private dashServices: DashboardService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dashServices.atualizarFiltros.subscribe((filter) => {
      // só atualiza a exibição se estiver no componente certo
      if (filter.componente === this.componente) {
        this.exibicao = filter.exibicao;
        this.filterData = filter;
      }
    });
  }

  atualizarData(dataInicio: string, dataFim: string) {
    // if (dataInicio != this.dataHoje || dataFim != this.dataHoje) {

    // }
  }
}
