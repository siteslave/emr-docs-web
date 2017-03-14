import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPipeModule } from '../app-pipe/app-pipe.module';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule { 
    static forRoot() {
    return {
      ngModule: AppPipeModule
    }
  }
}
