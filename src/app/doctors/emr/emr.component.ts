import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.css']
})
export class EmrComponent implements OnInit {

  response: any;
  vstdate: string;
  vsttime: string;
  firstStep = 0;
  hn: string;
  vn: string;
  diag: string;
  ptname: string;
  pttype: string;
  spclty: string;
  department: string;
  imageType: string;
  images: Array<any> = [];
  isLoading = false;
  token: string;

  constructor(
    @Inject('API_URL') private url: string,
    private router: Router,
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {
    this.token = sessionStorage.getItem('token');

    this.route.params.subscribe((params: any) => {
      // console.log(params);
      this.hn = params.hn;
      this.vn = params.vn;

      // console.log(this.hn);
      // console.log(this.vn);
      this.getEmrDetail(this.vn);
      this.getImageList(this.vn);

    });
  }

  getEmrDetail(vn) {
    // get detail
    this.isLoading = true;
    this.doctorService.getDetail(vn)
      .then((resp: any) => {
        this.ptname = resp.rows.ptname;
        this.department = resp.rows.department;
        this.spclty = resp.rows.spclty;
        this.pttype = resp.rows.pttype;
        this.diag = resp.rows.diag;
        this.vstdate = resp.rows.vstdate;
        this.vsttime = resp.rows.vsttime;
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  getImageList(vn) {
    // get detail
    this.doctorService.getImageList(vn)
      .then((resp: any) => {
        this.images = [];
        resp.rows.forEach((v) => {
          let obj = {
            id: v.id,
            type: v.type,
            filename: v.filename,
            mimetype: v.mimetype,
            url: `${this.url}/doctors/view-image/${v.id}?token=${this.token}`
          };

          this.images.push(obj);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getImageList(this.vn);
    this.getEmrDetail(this.vn);
  }

  previewImage(imageUrl) {
    window.open(imageUrl, '_blank');
  }
}
