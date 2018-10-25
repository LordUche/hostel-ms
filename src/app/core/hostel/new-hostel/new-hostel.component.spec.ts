import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHostelComponent } from './new-hostel.component';

describe('NewHostelComponent', () => {
  let component: NewHostelComponent;
  let fixture: ComponentFixture<NewHostelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHostelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHostelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
