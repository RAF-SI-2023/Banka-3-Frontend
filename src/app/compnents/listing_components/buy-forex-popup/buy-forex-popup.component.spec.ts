import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyForexPopupComponent } from './buy-forex-popup.component';

describe('BuyForexPopupComponent', () => {
  let component: BuyForexPopupComponent;
  let fixture: ComponentFixture<BuyForexPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyForexPopupComponent]
    });
    fixture = TestBed.createComponent(BuyForexPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
