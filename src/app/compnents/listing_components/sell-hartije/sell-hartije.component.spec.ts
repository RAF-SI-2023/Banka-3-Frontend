import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellHartijeComponent } from './sell-hartije.component';

describe('SellHartijeComponent', () => {
  let component: SellHartijeComponent;
  let fixture: ComponentFixture<SellHartijeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellHartijeComponent]
    });
    fixture = TestBed.createComponent(SellHartijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
