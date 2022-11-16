import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisVentaComponent } from './analisis-venta.component';

describe('AnalisisVentaComponent', () => {
  let component: AnalisisVentaComponent;
  let fixture: ComponentFixture<AnalisisVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
