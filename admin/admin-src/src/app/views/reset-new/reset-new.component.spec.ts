import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetNewComponent } from './reset-new.component';

describe('ResetNewComponent', () => {
  let component: ResetNewComponent;
  let fixture: ComponentFixture<ResetNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
