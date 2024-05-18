import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetStockVisibilityComponent } from './set-stock-visibility.component';

describe('SetStockVisibilityComponent', () => {
  let component: SetStockVisibilityComponent;
  let fixture: ComponentFixture<SetStockVisibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetStockVisibilityComponent]
    });
    fixture = TestBed.createComponent(SetStockVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
