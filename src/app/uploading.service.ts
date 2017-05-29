import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class UploadingService {
  token: string;

  constructor() {
    this.token = sessionStorage.getItem('token');
  }

  makeFileRequest(url: string, params: Object, files: Array<File>) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i], files[i].name);
      }

      _.forEach(params, (v, k) => {
        formData.append(k, v);
      });
    
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

}