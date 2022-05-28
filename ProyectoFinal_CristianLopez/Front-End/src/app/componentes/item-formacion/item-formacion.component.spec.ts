import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormacionComponent } from './item-formacion.component';

describe('ItemFormacionComponent', () => {
  let component: ItemFormacionComponent;
  let fixture: ComponentFixture<ItemFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFormacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
