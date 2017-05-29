import { UploadingService } from './../../uploading.service';
import { Component, OnInit, ViewChild, Inject, NgZone, EventEmitter } from '@angular/core';
import { Wizard, WizardStep } from 'clarity-angular';

import { Router, ActivatedRoute } from '@angular/router';
import { EmrService } from '../emr.service';
import { AlertService } from '../../alert.service';
import * as filesize from 'filesize';
import * as _ from 'lodash';

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.css']
})
export class EmrComponent implements OnInit {
  @ViewChild('wizard') wizard: Wizard;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isUploading = false;
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

  filesUploads: Array<File> = [];

  constructor(
    @Inject(NgZone) private zone: NgZone,
    @Inject('API_URL') private url: string,
    private router: Router,
    private route: ActivatedRoute,
    private emrService: EmrService,
    private alertService: AlertService,
    private uploadingService: UploadingService
  ) {
    this.token = sessionStorage.getItem('token');

    this.hn = this.route.snapshot.params.hn;
    this.vn = this.route.snapshot.params.vn;
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
    this.wizard.reset();
    this.filesUploads = [];
    this.wizard.open();
  }

  resetStep() {
    this.wizard.reset();
  }

  fileChangeEvent(fileInput: any) {
    this.filesUploads = [];
    this.filesUploads = <Array<File>>fileInput.target.files;
    console.log(typeof this.filesUploads); 
  }

  upload() {
    if (this.filesUploads.length) {
    let data = {
      hn: this.hn,
      vn: this.vn,
      imageType: this.imageType
    }
    this.isUploading = true;
    const url = `${this.url}/users/uploads?token=${this.token}`;
    this.uploadingService.makeFileRequest(url, data, this.filesUploads)
      .then((result: any) => {
        if (result.ok) {
          this.filesUploads = [];
          this.alertService.success();
        } else {
          this.alertService.error(JSON.stringify(result.error));
        }
        this.isUploading = false;
      }, (error) => {
        this.isUploading = false;
        this.alertService.error(JSON.stringify(error));
      });
    } else {
      this.alertService.error('กรุณาเลืิอกไฟล์ที่ต้องการอัปโหลด');
    }
  }

  removeFile(name) {
    this.alertService.confirm('ต้องการลบไฟล์นี้ ใช่หรือไม่')
      .then(() => {
        console.log(name);
        this.filesUploads = _.reject(this.filesUploads, function(el) { return el.name === name; });
      })
      .catch(() => {
        // cancel
      });
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

  refreshImageList() {
    this.getImageList(this.vn);
  }

  getImageList(vn) {
    // get detail
    this.emrService.getImageList(vn)
      .then((resp: any) => {
        this.images = [];
        resp.rows.forEach((v) => {
          let obj = {
            id: v.id,
            image_type: v.image_type,
            file_name: v.file_name,
            mimetype: v.mimetype,
            url: `${this.url}/users/view-image/${v.id}?token=${this.token}`
          };

          this.images.push(obj);
        });
      })
      .catch(error => {
        this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(error));
      });
  }

  removeImage(id) {
    this.alertService.confirm('คุณต้องการลบภาพนี้ ใช่หรือไม่?')
      .then(() => {
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
      })
      .catch(() => {
        //
      })
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
