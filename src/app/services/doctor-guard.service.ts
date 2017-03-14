import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class DoctorGuardService implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate() {
    const userType = sessionStorage.getItem('usertype');
    console.log(userType);
    if (userType === '2') {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
