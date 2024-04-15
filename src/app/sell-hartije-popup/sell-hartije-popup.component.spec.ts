import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellHartijePopupComponent } from './sell-hartije-popup.component';

describe('SellHartijePopupComponent', () => {
  let component: SellHartijePopupComponent;
  let fixture: ComponentFixture<SellHartijePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellHartijePopupComponent]
    });
    fixture = TestBed.createComponent(SellHartijePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
