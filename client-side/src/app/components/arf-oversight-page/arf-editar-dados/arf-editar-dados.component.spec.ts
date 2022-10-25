import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArfEditarDadosComponent } from './arf-editar-dados.component';

describe('ArfEditarDadosComponent', () => {
  let component: ArfEditarDadosComponent;
  let fixture: ComponentFixture<ArfEditarDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArfEditarDadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArfEditarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
