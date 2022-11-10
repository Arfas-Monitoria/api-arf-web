import { IComponente } from './../../../../../interface/comum';
import { IDepartamento } from 'src/app/interface/comum';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'arf-legend',
  templateUrl: './arf-legend.component.html',
  styleUrls: ['./arf-legend.component.scss']
})
export class ArfLegendComponent implements OnInit {
  @Input() chartRealTime: boolean;
  @Input() departamentosSelecionados: IDepartamento[]
  @Input() componentesSelecionados: IComponente

  constructor() { }

  objectValues = Object.values;

  ngOnInit(): void {
  }
}
