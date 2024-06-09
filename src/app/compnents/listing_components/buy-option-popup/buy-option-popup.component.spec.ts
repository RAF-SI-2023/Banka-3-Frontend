import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOptionPopupComponent } from './buy-option-popup.component';

describe('BuyOptionPopupComponent', () => {
  let component: BuyOptionPopupComponent;
  let fixture: ComponentFixture<BuyOptionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyOptionPopupComponent]
    });
    fixture = TestBed.createComponent(BuyOptionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
