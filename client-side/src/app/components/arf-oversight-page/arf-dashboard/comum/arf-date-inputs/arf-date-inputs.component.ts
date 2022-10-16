import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-date-inputs',
  templateUrl: './arf-date-inputs.component.html',
  styleUrls: ['./arf-date-inputs.component.scss']
})
export class ArfDateInputsComponent implements OnInit {
  @Output() chartStateEmitter = new EventEmitter<boolean>();

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
    this.chartStateEmitter.emit(this.chartRealTime)
  }
}
