import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRecipientComponent } from './payment-recipient.component';

describe('PaymentRecipientComponent', () => {
  let component: PaymentRecipientComponent;
  let fixture: ComponentFixture<PaymentRecipientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentRecipientComponent]
    });
    fixture = TestBed.createComponent(PaymentRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
