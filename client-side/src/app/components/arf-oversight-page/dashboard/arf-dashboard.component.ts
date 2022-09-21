import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'arf-dashboard',
  templateUrl: './arf-dashboard.component.html',
  styleUrls: ['./arf-dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() title: string = '';
  @Input() titleIcon: string = '';
  exibicao: string = 'listada';
  data: string = '';
  pesquisa: string = '';
  departamentos: string[] = ['teste'];

  options: string[] = ['ID', ''];
  crescente: boolean = true;
  orderImgPath: string = '/assets/icones/arrow-down-short-wide-solid.svg';

  constructor() { }

  ngOnInit(): void {
  }

  filtrarDashboard(e: any) {
    console.log(e.target.value)
  }

  alternarOrdem() {
    this.crescente = !this.crescente;

    if(this.crescente) {
      this.orderImgPath = '/assets/icones/arrow-down-short-wide-solid.svg'
    } else {
      this.orderImgPath = '/assets/icones/arrow-up-wide-short-solid.svg'
    }
  }

}
