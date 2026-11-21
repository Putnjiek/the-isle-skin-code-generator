import { TestBed } from '@angular/core/testing';
import { SkinEditorService } from '../skin-editor-service';
import { DinoNames } from '../enums';
import { defaultDinos } from '../empty-data';
import { emptyColors5, emptyColors6, emptyColors7 } from '../data-interfaces';

describe('SkinEditorService', () => {
  let service: SkinEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkinEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should include claws in the skin code', () => {
    const colors = emptyColors5();
    colors.claws = '111111';

    expect(service.generateSkinCode('Test', '010', colors))
      .toContain('111111FF');
  });

  it('should include mouth and inherited claws in the skin code', () => {
    const colors = emptyColors6();
    colors.claws = '222222';
    colors.mouth = '333333';

    const code = service.generateSkinCode('Test', '010', colors);

    expect(code).toContain('222222FF');
    expect(code).toContain('333333FF');
  });

  it('should include teeth in the skin code', () => {
    const colors = emptyColors7();
    colors.teeth = '444444';

    expect(service.generateSkinCode('Test', '010', colors))
      .toContain('444444FF');
  });

  it('should parse a generated skin code back into dinosaur colors and pattern', () => {
    const colors = emptyColors6();
    colors.body = '111111';
    colors.underbelly = '222222';
    colors.markings = '333333';
    colors.maleDisplay = '444444';
    colors.claws = '555555';
    colors.mouth = '666666';
    colors.flank = '777777';

    const code = service.generateSkinCode(DinoNames.Austroraptor, '310', colors);
    const parsed = service.parseSkinCode(code, defaultDinos());

    expect(parsed?.name).toBe(DinoNames.Austroraptor);
    expect(parsed?.pattern).toBe('310');
    expect(parsed?.colors).toEqual(colors);
  });

  it('should reject an invalid skin code', () => {
    expect(service.parseSkinCode('Unknown', defaultDinos())).toBeNull();
  });
});
