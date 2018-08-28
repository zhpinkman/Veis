import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyCutPanelComponent } from './copy-cut-panel.component';

describe('CopyCutPanelComponent', () => {
  let component: CopyCutPanelComponent;
  let fixture: ComponentFixture<CopyCutPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CopyCutPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyCutPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
