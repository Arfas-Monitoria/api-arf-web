import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'arf-dash-card',
  templateUrl: './arf-dash-card.component.html',
  styleUrls: ['./arf-dash-card.component.scss'],
})
export class ArfDashCardComponent implements OnInit {
  @Input() titleIcon: string;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void { }
}
