import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarCodigoBarrasComponent } from './generar-codigo-barras.component';

describe('GenerarCodigoBarrasComponent', () => {
  let component: GenerarCodigoBarrasComponent;
  let fixture: ComponentFixture<GenerarCodigoBarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarCodigoBarrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarCodigoBarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
