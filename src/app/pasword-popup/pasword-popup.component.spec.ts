import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaswordPopupComponent } from './pasword-popup.component';

describe('PaswordPopupComponent', () => {
  let component: PaswordPopupComponent;
  let fixture: ComponentFixture<PaswordPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaswordPopupComponent]
    });
    fixture = TestBed.createComponent(PaswordPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
