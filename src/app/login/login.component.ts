import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  constructor(
    private router: Router,
    private basicAuthenticationService: JwtAuthenticationService) { }

  handleLogin() {
    console.log(this.loginForm.value.username);
    this.basicAuthenticationService.executeAuthenticationService(this.loginForm.value.username || '', this.loginForm.value.password || '').subscribe(
      response => {
        console.log(response)
        this.invalidLogin = false
        this.router.navigate(['welcome', this.loginForm.value.username])
      },
      error => {
        console.log(error)
        this.invalidLogin = true
      }
    )
  }
}
