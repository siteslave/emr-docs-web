import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  hn: string;
  clinics: Array<any> = [];
  allergies: Array<any> = [];
  info: any = {};
  labs: Array<any> = [];
  options: any;
  options2: any;
  bp: Array<any> = [];
  fbs: Array<any> = [];
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {
    this.info = {ptname: null, sex: null, birth: null, pttype: null, hn: null, address: null};
    this.allergies = [];
    this.clinics = [];
    this.labs = [];

    this.bp = [];
    this.fbs = [];
    this.route.params.subscribe((params: any) => {
      // console.log(params);
      this.hn = params.hn;
      this.getInfo(this.hn);

    });

  }

  getInfo(hn) {
    this.loading = true;
    this.doctorService.getInfo(this.hn)
      .then((results: any) => {
        if (!results.info) {
          this.router.navigateByUrl('/doctors/404');
        }

        this.info = results.info;
        this.allergies = results.allergies;
        this.clinics = results.clinics;
        this.labs = results.labs;

        this.bp = results.bp;
        this.fbs = results.fbs;

        this.options = {
          credits: { enabled: false },
          title: { text: 'ความดันโลหิต' },
          chart: {
            type: 'line'
          },
          xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            title: {
              enabled: false
            }
          },
          yAxis: {
            plotLines: [{
              value: 121,
              color: 'red',
              width: 1,
              label: {
                text: 'ค่ามาตรฐาน: 120',
                align: 'center',
                style: {
                  color: 'gray'
                }
              }
            },
            {
              value: 90,
              color: 'green',
              width: 1,
              label: {
                text: 'ค่ามาตรฐาน: 90',
                align: 'center',
                style: {
                  color: 'gray'
                }
              }
            }],
            title: {
              text: 'mmHg'
            }
          },
          tooltip: {
            split: true,
            valueSuffix: ' mmHg'
          },
          series: [{
            name: 'SBP',
            data: []
          }, {
            name: 'DBP',
            data: []
          }]
        };

        this.options2 = {
          credits: { enabled: false },
          title: { text: 'ระดับ FBS' },
          chart: {
            type: 'line'
          },
          xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            title: {
              enabled: false
            }
          },
          yAxis: {
            plotLines: [{
              value: 101,
              color: 'red',
              width: 1,
              label: {
                text: 'ค่ามาตรฐาน: 100',
                align: 'center',
                style: {
                  color: 'gray'
                }
              }
            }],
            title: {
              text: 'mg/dL'
            }
          },
          tooltip: {
            split: true,
            valueSuffix: ' mg/dL'
          },
          series: [{
            name: 'FBS',
            data: []
          }]
        };

        this.options.xAxis.categories = [];
        this.options.series[0].data = [];
        this.options.series[1].data = [];
        let bp = _.orderBy(this.bp, ['ymd', 'asc']);
        let fbs = _.orderBy(this.fbs, ['ymd', 'asc']);

        bp.forEach(v => {
          // console.log(v.bps, v.bpd);
          if (v.bps && v.bpd) {
            this.options.xAxis.categories.push(v.vstdate);
            this.options.series[0].data.push(v.bps);
            this.options.series[1].data.push(v.bpd);
          }
        });

        fbs.forEach(v => {
          // console.log(v.bps, v.bpd);
          if (v.fbs) {
            this.options2.xAxis.categories.push(v.vstdate);
            this.options2.series[0].data.push(v.fbs);
          }
        });

        this.loading = false;

        // console.log(this.options.xAxis.categories);
      });
  }

  ngOnInit() {
    this.getInfo(this.hn);
  }

}
