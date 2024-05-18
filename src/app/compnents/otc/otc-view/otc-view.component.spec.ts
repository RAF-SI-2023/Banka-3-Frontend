import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcViewComponent } from './otc-view.component';

describe('OtcViewComponent', () => {
  let component: OtcViewComponent;
  let fixture: ComponentFixture<OtcViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtcViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
