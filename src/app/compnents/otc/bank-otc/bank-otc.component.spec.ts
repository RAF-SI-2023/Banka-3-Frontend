import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOtcComponent } from './bank-otc.component';

describe('BankOtcComponent', () => {
  let component: BankOtcComponent;
  let fixture: ComponentFixture<BankOtcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankOtcComponent]
    });
    fixture = TestBed.createComponent(BankOtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
