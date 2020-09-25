import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let usernameInput = fixture.debugElement.query(By.css('input[name="username"][type="text"]'));
    let passwordInput = fixture.debugElement.query(By.css('input[name="password"][type="password"]'));
    let loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
    expect(loginButton.nativeElement.disabled).toBeTrue();

    component.loginForm.controls['username'].setValue('admin');

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(loginButton.nativeElement.disabled).toBeTrue();

      component.loginForm.controls['password'].setValue('123456');

      fixture.detectChanges();
      fixture.whenStable().then(() => expect(fixture.componentInstance.loginForm.valid).toBeTrue());
    })
  });
});
