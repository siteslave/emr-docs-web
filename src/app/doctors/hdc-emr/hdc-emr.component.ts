import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { AlertService } from "../../alert.service";
@Component({
  selector: 'app-emr',
  templateUrl: './hdc-emr.component.html',
  styleUrls: ['./hdc-emr.component.css']
})
export class HdcEmrComponent implements OnInit {
  service: any;
  diags: any;
  proceds: any;
  drugs: any;
  isLoading = false;

  hospcode: string;
  seq: string;
  pid: string;


  constructor(
    @Inject('API_URL') private url: string,
    private router: Router,
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private alertService: AlertService
  ) {

    this.route.params.subscribe((params: any) => {
      // console.log(params);
      this.hospcode = params.hospcode;
      this.pid = params.pid;
      this.seq = params.seq;
      this.diags = [];
      this.drugs = [];
      this.proceds = [];
      this.service = {};
      this.getService();

    });
  }

  getService() {
    this.isLoading = true;
    this.doctorService.getServices(this.hospcode, this.pid, this.seq)
      .then((response: any) => {
        this.isLoading = false;
        if (response.ok) {
          console.log(response);
        this.diags = response.diag;
        this.proceds = response.proced;
        this.drugs = response.drug;
        this.service = response.service;
        } else {
          this.alertService.error(JSON.stringify(response.error));
        }
        // console.log(this.service);
      }, error => {
        console.log(error);
        this.isLoading = false;
        this.alertService.error(JSON.stringify(error));
      });
  }

  ngOnInit() {
    this.getService();
  }

}
