import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainoverviewComponent } from './mainoverview.component';

describe('MainoverviewComponent', () => {
  let component: MainoverviewComponent;
  let fixture: ComponentFixture<MainoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
