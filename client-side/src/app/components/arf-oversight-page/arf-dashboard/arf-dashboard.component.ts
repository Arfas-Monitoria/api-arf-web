import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard',
  templateUrl: './arf-dashboard.component.html',
  styleUrls: ['./arf-dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() title: string; // HDD | RAM | CPU
  @Input() titleIcon: string;

  exibicao: string;


  constructor(private dashServices: DashboardService) {}

  ngOnInit(): void {
    this.dashServices.atualizarExibicao.subscribe(
      (value) => (this.exibicao = value)
    );
  }

}
