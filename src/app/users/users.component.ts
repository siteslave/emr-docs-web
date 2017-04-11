import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmrService } from './emr.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  rootDirectory: any[];
  visits: any[] = [];
  loading = false;
  hn: string;
  searching = false;

  fullname: string;
  constructor(private router: Router, private emrService: EmrService) {
    this.fullname = sessionStorage.getItem('fullname');
  }

  searchKeyPress(event, hn) {
    if (event.charCode === 13 && hn.value) {
      this.searching = true;
      this.visits = [];
      this.emrService.search(hn.value)
        .then((response: any) => {
          this.searching = false;
          response.rows.forEach((v: any) => {
            let visits = [];
            v.visits.forEach((x: any) => {
              let obj = {
                hn: x.hn,
                vn: x.vn,
                vstdate: `${moment(x.vstdate).format('D')}/${moment(x.vstdate).format('M')}/${moment(x.vstdate).get('year') + 543}`,
                time: moment(x.vsttime, 'HH:mm:ss').format('HH:mm')
              }
              visits.push(obj);
            });

            let obj: Object = {
              name: v.name,
              icon: 'folder',
              expanded: false,
              visits: visits
            };

            this.visits.push(obj);
          });
        })
        .catch(error => {
          this.searching = false;
          console.log(error);
          alert('เกิดข้อผิดพลาด: ' + error.message);
        });
    }
  }

  getEmr(hn, vn) {
    const url = `/users/emr/${hn}/${vn}`;
    this.router.navigateByUrl(url);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
