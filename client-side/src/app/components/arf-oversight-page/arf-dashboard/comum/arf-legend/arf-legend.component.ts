import { IComponente } from './../../../../../interface/comum';
import { IDepartamento } from 'src/app/interface/comum';
import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-legend',
  templateUrl: './arf-legend.component.html',
  styleUrls: ['./arf-legend.component.scss']
})
export class ArfLegendComponent implements OnInit {
  @Input() chartRealTime: boolean;
  @Input() chartType = 'line';
  @Input() departamentosSelecionados: IDepartamento[]
  @Input() componentesSelecionados: IComponente

  constructor(
    private dashServices: DashboardService
  ) { }

  objectValues = Object.values;

  ngOnInit(): void {
    this.dashServices.chartTypeEmitter.subscribe(chartType => {
      this.chartType = chartType
    })
  }
}
