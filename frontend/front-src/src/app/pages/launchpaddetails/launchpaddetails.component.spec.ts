import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchpaddetailsComponent } from './launchpaddetails.component';

describe('LaunchpaddetailsComponent', () => {
  let component: LaunchpaddetailsComponent;
  let fixture: ComponentFixture<LaunchpaddetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchpaddetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchpaddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
