import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasicInstanceListComponent } from './user-basic-instance-list.component';

describe('UserBasicInstanceListComponent', () => {
  let component: UserBasicInstanceListComponent;
  let fixture: ComponentFixture<UserBasicInstanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBasicInstanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBasicInstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
