import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlockComponent } from './new-block.component';

describe('NewBlockComponent', () => {
  let component: NewBlockComponent;
  let fixture: ComponentFixture<NewBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
