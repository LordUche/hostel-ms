import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      div {
        padding: 30px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.user$ !== null) {
      this.auth.user$.subscribe(user => {
        if (user && this.auth.canDelete(user)) {
          this.router.navigate(['/hostels'], { skipLocationChange: true });
        } else if (user && user.roles.subscriber) {
          this.router.navigate(['/register'], { skipLocationChange: true });
        }
      });
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  signIn() {
    if (this.form.valid) {
      this.auth.signIn(
        this.email.value,
        this.password.value
      );
    }
  }
}
