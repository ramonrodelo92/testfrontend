import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormUser } from './interfaces/formUser';
import { User } from './interfaces/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form = this.fb.group<FormUser>({
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  makeLogin() {
    const user = this.form.value as User;
    this.service.login(user).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.snackbar.open(err.error.Mensaje);
        }
      },
    });
  }
}
