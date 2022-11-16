import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionesEstadisticasComponent } from './recomendaciones-estadisticas.component';

describe('RecomendacionesEstadisticasComponent', () => {
  let component: RecomendacionesEstadisticasComponent;
  let fixture: ComponentFixture<RecomendacionesEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendacionesEstadisticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionesEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
