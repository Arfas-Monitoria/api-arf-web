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

  ngOnInit(): void {

  }
}
