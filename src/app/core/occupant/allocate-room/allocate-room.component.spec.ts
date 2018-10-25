import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateRoomComponent } from './allocate-room.component';

describe('AllocateRoomComponent', () => {
  let component: AllocateRoomComponent;
  let fixture: ComponentFixture<AllocateRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
