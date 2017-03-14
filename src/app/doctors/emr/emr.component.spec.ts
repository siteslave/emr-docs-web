/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmrComponent } from './emr.component';

describe('EmrComponent', () => {
  let component: EmrComponent;
  let fixture: ComponentFixture<EmrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
