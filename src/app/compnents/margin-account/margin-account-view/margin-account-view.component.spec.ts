import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginAccountViewComponent } from './margin-account-view.component';

describe('MarginAccountViewComponent', () => {
  let component: MarginAccountViewComponent;
  let fixture: ComponentFixture<MarginAccountViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarginAccountViewComponent]
    });
    fixture = TestBed.createComponent(MarginAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
