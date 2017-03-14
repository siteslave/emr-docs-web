import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { MainComponent } from './main/main.component';
import { ClarityModule } from 'clarity-angular';
import { NgUploaderModule } from 'ngx-uploader';
import { AuthModule } from '../auth/auth.module';
import { DoctorService } from './doctor.service';
import { EmrComponent } from './emr/emr.component';
import { HdcEmrComponent } from './hdc-emr/hdc-emr.component';
import { DoctorGuardService } from '../services/doctor-guard.service';
import { AppPipeModule } from '../app-pipe/app-pipe.module';
import { InfoComponent } from './info/info.component';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

export function highchartsFactory() {
  return require('highcharts');
}
// export function highchartsFactory() {
//   return function () {
//     require('highcharts');
//   };
// }

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    FormsModule,
    DoctorsRoutingModule,
    ClarityModule.forRoot(),
    AuthModule,
    AppPipeModule
  ],
  providers: [
    DoctorService, DoctorGuardService,
    { provide: HighchartsStatic, useFactory: highchartsFactory },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  declarations: [
    DoctorsComponent,
    MainComponent,
    EmrComponent,
    HdcEmrComponent,
    InfoComponent
  ]
})
export class DoctorsModule { }
