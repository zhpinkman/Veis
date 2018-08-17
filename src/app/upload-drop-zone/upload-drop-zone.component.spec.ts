import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDropZoneComponent } from './upload-drop-zone.component';

describe('UploadDropZoneComponent', () => {
  let component: UploadDropZoneComponent;
  let fixture: ComponentFixture<UploadDropZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDropZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
