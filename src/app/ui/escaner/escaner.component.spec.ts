import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanerComponent } from './escaner.component';

describe('EscanerComponent', () => {
  let component: EscanerComponent;
  let fixture: ComponentFixture<EscanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscanerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
