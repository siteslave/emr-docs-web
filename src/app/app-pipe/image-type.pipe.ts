import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageType'
})
export class ImageTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value === '1') { return 'OPD Card'; };
    if (value === '2') { return 'EKG'; };
    if (value === '3') { return 'ผล LAB'; };
    if (value === '4') { return 'ใบส่งต่อ'; };
    if (value === '5') { return 'เอกสารอื่นๆ'; };

  }

}
