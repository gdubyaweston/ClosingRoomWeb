import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTwoStepComponent } from './login-two-step.component';

describe('LoginTwoStepComponent', () => {
  let component: LoginTwoStepComponent;
  let fixture: ComponentFixture<LoginTwoStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTwoStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTwoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
