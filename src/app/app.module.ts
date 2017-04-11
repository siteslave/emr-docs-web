import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from 'clarity-angular';
import { NgUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AlertService } from "./alert.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgUploaderModule,
    ClarityModule.forRoot(),
    UsersModule,
    DoctorsModule
  ],
  providers: [
    AlertService,
    { provide: 'API_URL', useValue: 'http://localhost:3000/emr-docs' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
