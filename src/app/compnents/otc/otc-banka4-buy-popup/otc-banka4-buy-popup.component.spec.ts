import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcBanka4BuyPopupComponent } from './otc-banka4-buy-popup.component';

describe('OtcBanka4BuyPopupComponent', () => {
  let component: OtcBanka4BuyPopupComponent;
  let fixture: ComponentFixture<OtcBanka4BuyPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtcBanka4BuyPopupComponent]
    });
    fixture = TestBed.createComponent(OtcBanka4BuyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
