import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MHabilidadComponent } from './m-habilidad.component';

describe('MHabilidadComponent', () => {
  let component: MHabilidadComponent;
  let fixture: ComponentFixture<MHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MHabilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
