import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class LoginService {

  constructor(private http: Http, @Inject('API_URL') private url: string) { }

  login(username, password) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/login`;
      this.http.post(url, { username: username, password: password })
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }

}
