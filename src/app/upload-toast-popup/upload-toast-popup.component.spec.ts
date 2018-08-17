import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadToastPopupComponent } from './upload-toast-popup.component';

describe('UploadToastPopupComponent', () => {
  let component: UploadToastPopupComponent;
  let fixture: ComponentFixture<UploadToastPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadToastPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadToastPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
