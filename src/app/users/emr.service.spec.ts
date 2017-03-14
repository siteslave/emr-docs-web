/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmrService } from './emr.service';

describe('EmrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmrService]
    });
  });

  it('should ...', inject([EmrService], (service: EmrService) => {
    expect(service).toBeTruthy();
  }));
});
