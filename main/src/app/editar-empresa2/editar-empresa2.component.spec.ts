import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpresa2Component } from './editar-empresa2.component';

describe('EditarEmpresa2Component', () => {
  let component: EditarEmpresa2Component;
  let fixture: ComponentFixture<EditarEmpresa2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEmpresa2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEmpresa2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
