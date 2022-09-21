import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-filters',
  templateUrl: './arf-filters.component.html',
  styleUrls: ['./arf-filters.component.scss'],
})
export class ArfFiltersComponent implements OnInit {
  @ViewChild('selectExibicao', { static: false }) exibicao!: ElementRef;
  // @ViewChild('selectExibicao', { static: false }) departamentos!: ElementRef;
  // @ViewChild('selectExibicao', { static: false }) metrica!: ElementRef;
  // @ViewChild('selectExibicao', { static: false }) data!: ElementRef;
  // @ViewChild('selectExibicao', { static: false }) pesquisa!: ElementRef;
  departamentos: string[] = ['teste'];

  constructor(private dashServices: DashboardService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  enviarExibicao(exibicao: string) {
    this.dashServices.trazerExibicao.emit(exibicao);
  }

  filtrarDashboard() {
  }
}
