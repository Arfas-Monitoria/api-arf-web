import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  atualizarData() {
    this.dataInicio = this.dataHoje;
    this.dataFim = this.dataHoje;
    this.verificarData()
  }

  verificarData() {
    this.chartRealTime = this.dataInicio === this.dataHoje && this.dataFim === this.dataHoje;
    this.dashServices.chartStateEmitter.emit(this.chartRealTime)
    console.log('{ dataInicio: this.dataInicio, dataFim: this.dataFim }: ', { dataInicio: this.dataInicio, dataFim: this.dataFim })
    this.dashServices.datesEmitter.emit({ dataInicio: this.dataInicio, dataFim: this.dataFim })
  }
}
