import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class UserGuardService implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate() {
    console.log('AuthGuard#canActivate called');
    const userType = sessionStorage.getItem('usertype');
    console.log(userType);
    if (userType === '1') {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
