import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class EmrService {

  constructor(private authHttp: AuthHttp, @Inject('API_URL') private url: string) { }

  search(hn) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/users/search/${hn}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }

  getDetail(vn) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/users/emr-detail/${vn}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }

  getImageList(vn) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/users/image-list/${vn}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }

  removeImage(id) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/users/image-remove/${id}`;
      this.authHttp.delete(url)
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }
}
