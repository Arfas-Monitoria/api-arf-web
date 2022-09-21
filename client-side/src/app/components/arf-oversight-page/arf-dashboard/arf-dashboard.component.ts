import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dashboard',
  templateUrl: './arf-dashboard.component.html',
  styleUrls: ['./arf-dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() title: string = '';
  @Input() titleIcon: string = '';
  exibicao: string = '';

  options: string[] = ['ID', ''];
  crescente: boolean = true;
  orderImgPath: string = '/assets/icones/arrow-down-short-wide-solid.svg';

  constructor(private dashServices: DashboardService) {}

  ngOnInit(): void {
    this.dashServices.trazerExibicao.subscribe(
      (value) => (this.exibicao = value)
    );
  }

  alternarOrdem() {
    this.crescente = !this.crescente;

    if (this.crescente) {
      this.orderImgPath = '/assets/icones/arrow-down-short-wide-solid.svg';
    } else {
      this.orderImgPath = '/assets/icones/arrow-up-wide-short-solid.svg';
    }
  }
}
