import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFuturePopupComponent } from './buy-future-popup.component';

describe('BuyFuturePopupComponent', () => {
  let component: BuyFuturePopupComponent;
  let fixture: ComponentFixture<BuyFuturePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyFuturePopupComponent]
    });
    fixture = TestBed.createComponent(BuyFuturePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
