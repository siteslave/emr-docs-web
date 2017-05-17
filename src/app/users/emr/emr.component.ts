import { Component, OnInit, ViewChild, Inject, NgZone, EventEmitter } from '@angular/core';
import { Wizard, WizardStep } from 'clarity-angular';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';

import { Router, ActivatedRoute } from '@angular/router';
import { EmrService } from '../emr.service';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.css']
})
export class EmrComponent implements OnInit {
  @ViewChild('file') fileName: any;
  @ViewChild('wizard') wizard: Wizard;

  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;
  inputUploadEvents: EventEmitter<string>;

  isLoading = false;
  isError = false;
  isSuccess = false;
  isImportting = false;
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
    private emrService: EmrService,
    private alertService: AlertService
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

    this.inputUploadEvents = new EventEmitter<string>();

  }

  showUploader() {
    this.imageType = null;
    this.response = null;
    this.fileName.nativeElement.value = null;
    this.wizard.reset();
    this.wizard.open();
  }

  resetStep() {
    this.wizard.reset();
  }

  // startUpload() {
  //   const file = this.fileName.nativeElement.value;
  //   if (file) {
  //     this.alertService.confirm('ต้องการนำเข้าข้อมูล ใช่หรือไม่?')
  //       .then(() => {
  //         this.isImportting = true;
  //         this.inputUploadEvents.emit('startUpload');
  //       })
  //       .catch(() => {
  //         // cancel
  //       });
  //   } else {
  //     this.alertService.error('กรุณาเลือกไฟล์ที่ต้องการนำเข้าข้อมูล');
  //   }
  // }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.isImportting = false;
          const result = JSON.parse(data.response);
          if (result.ok) {
            this.alertService.success();
            this.fileName.nativeElement.value = null;
          } else {
            this.alertService.error('เกิดข้อผิดพลาด : ' + JSON.stringify(result.message));
          }
        }
      });
    });
  }

  changeType() {
    if (this.imageType) {
      this.options = new NgUploaderOptions({
        url: `${this.url}/users/uploads`,
        data: {
          hn: this.hn,
          vn: this.vn,
          imageType: this.imageType
        },
        filterExtensions: false,
        autoUpload: true,
        authToken: this.token
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
