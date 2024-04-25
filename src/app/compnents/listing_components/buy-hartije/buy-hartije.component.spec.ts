import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyHartijeComponent } from './buy-hartije.component';

describe('BuyHartijeComponent', () => {
  let component: BuyHartijeComponent;
  let fixture: ComponentFixture<BuyHartijeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyHartijeComponent]
    });
    fixture = TestBed.createComponent(BuyHartijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
