import { TestBed, inject } from '@angular/core/testing';

import { FileService } from '@app/Services/file.service';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileService]
    });
  });

  it('should be created', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});
