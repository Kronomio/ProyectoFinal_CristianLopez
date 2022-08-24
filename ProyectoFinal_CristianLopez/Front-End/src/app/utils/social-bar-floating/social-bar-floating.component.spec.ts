import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBarFloatingComponent } from './social-bar-floating.component';

describe('SocialBarFloatingComponent', () => {
  let component: SocialBarFloatingComponent;
  let fixture: ComponentFixture<SocialBarFloatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialBarFloatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialBarFloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
