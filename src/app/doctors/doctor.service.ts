import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class DoctorService {

  constructor(private authHttp: AuthHttp, @Inject('API_URL') private url: string) { }

  hdcSearch(hn) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/hdc/search/${hn}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }

  search(hn) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/doctors/search/${hn}`;
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
      const url = `${this.url}/doctors/emr-detail/${vn}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }

  getServices(hospcode, pid, seq) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/hdc/visit-detail/${hospcode}/${pid}/${seq}`;
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
      const url = `${this.url}/doctors/image-list/${vn}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }

  getInfo(hn) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/doctors/info/${hn}`;
      this.authHttp.get(url)
        .map(res => res.json())
        .subscribe(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }
}
