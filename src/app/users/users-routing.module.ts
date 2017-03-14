import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { MainComponent } from './main/main.component';
import { EmrComponent } from './emr/emr.component';

import { UserGuardService } from '../services/user-guard.service';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [UserGuardService],
    children: [
      { path: '', component: MainComponent, pathMatch: 'full' },
      { path: 'emr/:hn/:vn', component: EmrComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
