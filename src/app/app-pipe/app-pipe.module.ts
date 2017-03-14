import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageTypePipe } from './image-type.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageTypePipe],
  exports: [ImageTypePipe]
})
export class AppPipeModule {

}


