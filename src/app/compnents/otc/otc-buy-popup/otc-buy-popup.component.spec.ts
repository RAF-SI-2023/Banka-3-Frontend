import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcBuyPopupComponent } from './otc-buy-popup.component';

describe('OtcBuyPopupComponent', () => {
  let component: OtcBuyPopupComponent;
  let fixture: ComponentFixture<OtcBuyPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtcBuyPopupComponent]
    });
    fixture = TestBed.createComponent(OtcBuyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
