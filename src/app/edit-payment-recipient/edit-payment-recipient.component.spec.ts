import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentRecipientComponent } from './edit-payment-recipient.component';

describe('EditPaymentRecipientComponent', () => {
  let component: EditPaymentRecipientComponent;
  let fixture: ComponentFixture<EditPaymentRecipientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPaymentRecipientComponent]
    });
    fixture = TestBed.createComponent(EditPaymentRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
