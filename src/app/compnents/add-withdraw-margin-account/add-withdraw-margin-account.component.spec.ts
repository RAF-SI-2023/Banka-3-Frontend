import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWithdrawMarginAccountComponent } from './add-withdraw-margin-account.component';

describe('AddWithdrawMarginAccountComponent', () => {
  let component: AddWithdrawMarginAccountComponent;
  let fixture: ComponentFixture<AddWithdrawMarginAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWithdrawMarginAccountComponent]
    });
    fixture = TestBed.createComponent(AddWithdrawMarginAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
