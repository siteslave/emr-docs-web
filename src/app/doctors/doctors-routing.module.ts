import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { MainComponent } from './main/main.component';
import { EmrComponent } from './emr/emr.component';
import { HdcEmrComponent } from './hdc-emr/hdc-emr.component';
import { InfoComponent } from './info/info.component';
import { DoctorGuardService } from '../services/doctor-guard.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'doctors',
    component: DoctorsComponent,
    canActivate: [DoctorGuardService],
    children: [
      { path: '', component: MainComponent, pathMatch: 'full' },
      { path: 'info/:hn', component: InfoComponent, pathMatch: 'full' },
      { path: 'emr/:hn/:vn', component: EmrComponent, pathMatch: 'full' },
      { path: 'hdc-emr/:hospcode/:pid/:seq', component: HdcEmrComponent, pathMatch: 'full' },
      { path: '404', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DoctorsRoutingModule { }
