import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementSheqigComponent } from './user-management-sheqig.component';

describe('UserManagementSheqigComponent', () => {
  let component: UserManagementSheqigComponent;
  let fixture: ComponentFixture<UserManagementSheqigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementSheqigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementSheqigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
