import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirTicketsComponent } from './imprimir-tickets.component';

describe('ImprimirTicketsComponent', () => {
  let component: ImprimirTicketsComponent;
  let fixture: ComponentFixture<ImprimirTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
