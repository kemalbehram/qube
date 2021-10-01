import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesettingComponent } from './sitesetting.component';

describe('SitesettingComponent', () => {
  let component: SitesettingComponent;
  let fixture: ComponentFixture<SitesettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
