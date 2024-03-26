import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentRecipientComponent } from './create-payment-recipient.component';

describe('CreatePaymentRecipientComponent', () => {
  let component: CreatePaymentRecipientComponent;
  let fixture: ComponentFixture<CreatePaymentRecipientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePaymentRecipientComponent]
    });
    fixture = TestBed.createComponent(CreatePaymentRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
