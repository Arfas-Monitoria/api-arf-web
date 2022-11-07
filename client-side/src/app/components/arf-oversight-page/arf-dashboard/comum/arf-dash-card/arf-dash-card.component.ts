import { ISpinnerEvent } from './../../../../../interface/comum';
import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'arf-dash-card',
  templateUrl: './arf-dash-card.component.html',
  styleUrls: ['./arf-dash-card.component.scss'],
})
export class ArfDashCardComponent implements OnInit {
  @Input() titleIcon: string;
  @Input() title: string;
  @Input() card: string;

  isLoading = false;

  constructor(private dashServices: DashboardService
  ) { }

  ngOnInit() {
    //   this.dashServices.spinnerStateEmitter.subscribe({
    //     next: (eventObj: ISpinnerEvent) => {
    //       if (this.card == eventObj.card) {
    //         this.isLoading = eventObj.state
    //       }
    //     }
    //   })
  }
}
