import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorListsingListComponent } from './supervisor-listsing-list.component';

describe('SupervisorListsingListComponent', () => {
  let component: SupervisorListsingListComponent;
  let fixture: ComponentFixture<SupervisorListsingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisorListsingListComponent]
    });
    fixture = TestBed.createComponent(SupervisorListsingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
