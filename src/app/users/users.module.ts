import { UploadingService } from './../uploading.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MainComponent } from './main/main.component';
import { ClarityModule } from 'clarity-angular';
import { AuthModule } from '../auth/auth.module';
import { EmrService } from './emr.service';
import { EmrComponent } from './emr/emr.component';
import { UserGuardService } from '../services/user-guard.service';
import { AppPipeModule } from '../app-pipe/app-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    ClarityModule.forRoot(),
    AuthModule,
    AppPipeModule
  ],
  providers: [
    EmrService,
    UserGuardService,
    UploadingService
  ],
  declarations: [UsersComponent, MainComponent, EmrComponent]
})
export class UsersModule { }
