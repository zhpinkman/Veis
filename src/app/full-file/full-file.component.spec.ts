import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFileComponent } from '@app/full-file/full-file.component';

describe('FullFileComponent', () => {
  let component: FullFileComponent;
  let fixture: ComponentFixture<FullFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullFileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
