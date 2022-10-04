import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArfOversightNavbarComponent } from './arf-oversight-navbar.component';

describe('ArfOversightNavbarComponent', () => {
  let component: ArfOversightNavbarComponent;
  let fixture: ComponentFixture<ArfOversightNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArfOversightNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArfOversightNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
