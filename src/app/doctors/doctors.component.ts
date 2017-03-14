import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from './doctor.service';
import * as moment from 'moment';

import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  rootDirectory: any[];
  visits: any[] = [];
  hdcVisits: any[] = [];
  loading = false;
  hn: string;
  searching = false;
  isHDCSearching = false;
  isHNNotfound = false;
  token: string;
  fullname: string;

  constructor(private router: Router, private doctorService: DoctorService) {
    this.token = sessionStorage.getItem('token');
    this.fullname = sessionStorage.getItem('fullname');
  }

  getHdcService(hn: string) {
    this.hdcVisits = [];
    this.isHDCSearching = true;
    this.doctorService.hdcSearch(hn)
      .then((response: any) => {
        this.isHDCSearching = false;
        response.rows.forEach((v: any) => {
          let visits = [];
          v.visits.forEach((x: any) => {
            let obj = {
              hospname: x.hospname,
              hospcode: x.hospcode,
              seq: x.seq,
              pid: x.pid,
              date_serv: `${moment(x.date_serv).format('D')}/${moment(x.date_serv).format('M')}/${moment(x.date_serv).get('year') + 543}`,
              time_serv: moment(x.time_serv, 'HHmmss').format('HH:mm')
            }
            visits.push(obj);
          });

          let obj: Object = {
            name: v.name,
            icon: 'folder',
            expanded: false,
            visits: visits
          };

          this.hdcVisits.push(obj);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  searchHOSxP(hn) {
    this.visits = [];
    this.searching = true;
    this.doctorService.search(hn)
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

        if (response.rows.length) {
          this.router.navigateByUrl('/doctors/info/' + hn);
        }
      })
      .catch(error => {
        this.searching = false;
        console.log(error);
        alert('เกิดข้อผิดพลาด: ' + error.message);
      });
  }

  onTabSelected(event) {
    if (event.id === 'hdc') {
      if (this.hn) {
        this.getHdcService(this.hn);
        this.isHNNotfound = false;
      } else {
        this.isHNNotfound = true;
      }
    } else {
      if (this.hn) {
        this.searchHOSxP(this.hn);
        this.isHNNotfound = false;
      } else {
        this.isHNNotfound = true;
      }
    }
  }
  searchKeyPress(event, hn) {
    if (event.charCode === 13 && hn.value) {
      this.isHNNotfound = false;
      this.hn = hn.value;
      this.searchHOSxP(this.hn);
    }
  }

  clearItems() {
    this.hn = null;
    this.hdcVisits = [];
    this.visits = [];
  }

  getEmr(hn, vn) {
    const url = `/doctors/emr/${hn}/${vn}`;
    this.router.navigateByUrl(url);
  }

  getHDCEmr(service: any) {
    const url = `/doctors/hdc-emr/${service.hospcode}/${service.pid}/${service.seq}`;
    this.router.navigateByUrl(url);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
