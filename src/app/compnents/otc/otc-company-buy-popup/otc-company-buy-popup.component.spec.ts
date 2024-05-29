import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcCompanyBuyPopupComponent } from './otc-company-buy-popup.component';

describe('OtcCompanyBuyPopupComponent', () => {
  let component: OtcCompanyBuyPopupComponent;
  let fixture: ComponentFixture<OtcCompanyBuyPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtcCompanyBuyPopupComponent]
    });
    fixture = TestBed.createComponent(OtcCompanyBuyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
