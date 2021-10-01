import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPatternComponent } from './reset-pattern.component';

describe('ResetPatternComponent', () => {
  let component: ResetPatternComponent;
  let fixture: ComponentFixture<ResetPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
