import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStocksComponent } from './my-stocks.component';

describe('MyStocksComponent', () => {
  let component: MyStocksComponent;
  let fixture: ComponentFixture<MyStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyStocksComponent]
    });
    fixture = TestBed.createComponent(MyStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
