import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArfChartComponent } from './arf-chart.component';

describe('ArfChartComponent', () => {
  let component: ArfChartComponent;
  let fixture: ComponentFixture<ArfChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArfChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArfChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
