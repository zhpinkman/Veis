import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactFileComponent } from './compact-file.component';

describe('CompactFileComponent', () => {
  let component: CompactFileComponent;
  let fixture: ComponentFixture<CompactFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompactFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
