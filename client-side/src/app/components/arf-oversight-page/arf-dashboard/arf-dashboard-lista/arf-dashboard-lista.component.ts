import { SimuladorService } from 'src/app/services/simulador.service';
import { DashboardCommums } from '../../../../constants/dashboardCommums';
import { DashboardService } from 'src/app/services/dashboard.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { IUserData, IDadosFiltro } from 'src/app/interface/comum';

@Component({
  selector: 'arf-dashboard-lista',
  templateUrl: './arf-dashboard-lista.component.html',
  styleUrls: ['./arf-dashboard-lista.component.scss'],
})
export class ArfListaComponent implements OnInit {
  filterData: IDadosFiltro;
  @Output() emitUserChart = new EventEmitter();
  @ViewChildren('filterIcons') filterIcons: HTMLElement[]

  card: string;
  chartUserOn: boolean = false;

  ngOnInit() { }

  toggleChartUser(showChartUser: boolean, id?, id_hd?, usuario?) {
    // clearInterval(this.interval);
    // this.chartUserOn = showChartUser;
    // this.emitUserChart.emit({
    //   showChartUser, id, id_hd, usuario
    // });
  }

  enviou() {
  }
}
