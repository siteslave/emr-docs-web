import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  jwtHelper: JwtHelper = new JwtHelper();
  isError = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      this.loginService.login(this.username, this.password)
        .then((resp: any) => {
          if (resp.ok) {
            this.isError = false;
            sessionStorage.setItem('token', resp.token);
            const decodedToken = this.jwtHelper.decodeToken(resp.token);
            console.log(decodedToken);
            sessionStorage.setItem('usertype', decodedToken.usertype);
            sessionStorage.setItem('fullname', decodedToken.fullname);
            if (decodedToken.usertype === '1') {
              this.router.navigate(['users']);
            } else {
              this.router.navigate(['doctors']);
            }
          } else {
            console.log(resp.error);
            this.isError = true;
          }
        })
        .catch(err => {
          this.isError = true;
          console.log(err);
        });
    }
  }

}
