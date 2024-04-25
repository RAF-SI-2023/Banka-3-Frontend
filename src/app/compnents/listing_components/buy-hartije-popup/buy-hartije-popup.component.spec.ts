import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyHartijePopupComponent } from './buy-hartije-popup.component';

describe('BuyHartijePopupComponent', () => {
  let component: BuyHartijePopupComponent;
  let fixture: ComponentFixture<BuyHartijePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyHartijePopupComponent]
    });
    fixture = TestBed.createComponent(BuyHartijePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
