import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetipComponent } from './setip.component';

describe('SetipComponent', () => {
  let component: SetipComponent;
  let fixture: ComponentFixture<SetipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
