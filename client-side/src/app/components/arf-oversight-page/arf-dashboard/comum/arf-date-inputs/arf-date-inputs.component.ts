import { Component, OnInit, SimpleChange } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-date-inputs',
  templateUrl: './arf-date-inputs.component.html',
  styleUrls: ['./arf-date-inputs.component.scss']
})
export class ArfDateInputsComponent implements OnInit {
  constructor(private dashServices: DashboardService) { }


  dataHoje = this.dashServices.pegarDataHoje('us');
  dataInicio: string = this.dataHoje;
  dataFim: string = this.dataHoje;
  chartRealTime: boolean = this.dataInicio === this.dataHoje && this.dataFim === this.dataHoje;

  ngOnInit(): void {
    this.verificarData()
  }

  ngOnChanges(changes: SimpleChange): void {
    if (changes['filterData'].previousValue) {
      // if (!changes.firstChange && this.chartRealTime &&
      //   changes['filterData'].currentValue.componenteSelecionado != changes['filterData'].previousValue.componenteSelecionado) {
      // }
    }
  }

  atualizarData() {
    if (!this.chartRealTime) {
      this.dataInicio = this.dataHoje;
      this.dataFim = this.dataHoje;
      this.verificarData()
    }
  }

  verificarData() {
    this.chartRealTime = this.dataInicio === this.dataHoje && this.dataFim === this.dataHoje;
    this.dashServices.chartStateEmitter.emit(this.chartRealTime)
    this.dashServices.datesEmitter.emit({ dataInicio: this.dataInicio, dataFim: this.dataFim })
  }
}
