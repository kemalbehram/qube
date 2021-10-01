import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminloghistoryComponent } from './adminloghistory.component';

describe('AdminloghistoryComponent', () => {
  let component: AdminloghistoryComponent;
  let fixture: ComponentFixture<AdminloghistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminloghistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminloghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
