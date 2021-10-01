import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternNewComponent } from './pattern-new.component';

describe('PatternNewComponent', () => {
  let component: PatternNewComponent;
  let fixture: ComponentFixture<PatternNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
