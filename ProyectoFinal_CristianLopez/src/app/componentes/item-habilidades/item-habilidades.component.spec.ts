import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHabilidadesComponent } from './item-habilidades.component';

describe('ItemHabilidadesComponent', () => {
  let component: ItemHabilidadesComponent;
  let fixture: ComponentFixture<ItemHabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHabilidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
