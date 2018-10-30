import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  signIn() {
    if (this.form.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(
        this.email.value,
        this.password.value
      );
    }
  }
}
