import { Component, OnInit, ViewChild, Inject, NgZone } from '@angular/core';
import { Wizard, WizardStep } from 'clarity-angular';
import { NgUploaderOptions } from 'ngx-uploader';

import { Router, ActivatedRoute } from '@angular/router';
import { EmrService } from '../emr.service';

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.css']
})
export class EmrComponent implements OnInit {

  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;
  @ViewChild('wizard') wizard: Wizard;

  isLoading = false;
  isError = false;
  isSuccess = false;
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
  docTypes: Array<{ id: number, name: string }> = [];

  images: Array<any> = [];
  token: string;

  constructor(
    @Inject(NgZone) private zone: NgZone,
    @Inject('API_URL') private url: string,
    private router: Router,
    private route: ActivatedRoute,
    private emrService: EmrService
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

    this.docTypes.push({ id: 1, name: 'OPD Card' });
    this.docTypes.push({ id: 2, name: 'EKG' });
    this.docTypes.push({ id: 3, name: 'ผล LAB' });
    this.docTypes.push({ id: 4, name: 'ใบส่งต่อ' });
    this.docTypes.push({ id: 5, name: 'เอกสารอื่นๆ' });

  }

  showUploader() {
    this.imageType = null;
    this.wizard.open();
  }

  resetStep() {
    this.wizard.prev();
    this.getImageList(this.vn);
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          let result = JSON.parse(data.response);
          if (result.ok) {
            this.isSuccess = true;
            this.isError = false;
          } else {
            this.isSuccess = false;
            this.isError = true;
          }

          setTimeout(() => {
            this.isSuccess = false;
            this.isError = false;
          }, 2000);

          console.log(data.response);
        }
      });
    });
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }

  changeType() {
    if (this.imageType) {
      this.options = new NgUploaderOptions({
        url: `${this.url}/users/uploads?token=${this.token}`,
        allowedExtensions: ['jpg', 'png'],
        data: {
          hn: this.hn,
          vn: this.vn,
          imageType: this.imageType
        },
        filterExtensions: true
      });
    }
  }

  getEmrDetail(vn) {
    // get detail
    this.isLoading = true;
    this.emrService.getDetail(vn)
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
        this.isLoading = false;
        console.log(error);
      });
  }

  getImageList(vn) {
    // get detail
    this.emrService.getImageList(vn)
      .then((resp: any) => {
        this.images = [];

        resp.rows.forEach((v) => {
          let obj = {
            id: v.id,
            type: v.type,
            filename: v.filename,
            mimetype: v.mimetype,
            url: `${this.url}/users/view-image/${v.id}?token=${this.token}`
          };

          this.images.push(obj);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  removeImage(id) {
    if (confirm('คุณต้องการลบภาพนี้ ใช่หรือไม่?')) {
      this.emrService.removeImage(id)
        .then((resp: any) => {
          if (resp.ok) {
            this.getImageList(this.vn);
          }
        })
        .catch(err => {
          alert('เกิดข้อผิดพลาด: ' + JSON.stringify(err));
          console.log(err);
        });
    }
  }

  ngOnInit() {
    this.getImageList(this.vn);
    this.getEmrDetail(this.vn);
  }

  previewImage(imageUrl) {
    window.open(imageUrl, '_blank');
  }

  successWizard() {
    console.log('success');
    // this.getImageList(this.vn);
  };
}
