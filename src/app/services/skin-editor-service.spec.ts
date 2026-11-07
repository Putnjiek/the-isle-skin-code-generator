import { TestBed } from '@angular/core/testing';
import { SkinEditorService } from '../skin-editor-service';

describe('SkinEditorService', () => {
  let service: SkinEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkinEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
