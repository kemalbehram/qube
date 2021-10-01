import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewheaderComponent } from './overviewheader.component';

describe('OverviewheaderComponent', () => {
  let component: OverviewheaderComponent;
  let fixture: ComponentFixture<OverviewheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
