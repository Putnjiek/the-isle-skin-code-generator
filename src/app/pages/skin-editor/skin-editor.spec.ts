import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkinEditor } from './skin-editor';

describe('SkinEditor', () => {
  let component: SkinEditor;
  let fixture: ComponentFixture<SkinEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkinEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(SkinEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply a valid HEX code to every available color', () => {
    component.applyToAll('#a1b2c3');

    expect(component.allColor()).toBe('A1B2C3');

    const patternColors = component.dino().patterns[component.pattern()].colors;
    for (const picker of component.colors()) {
      expect((patternColors as unknown as Record<string, string>)[picker.property])
        .toBe('A1B2C3');
    }
  });

  it('should wait until the entered HEX code has six digits', () => {
    const originalColors = component.dino().patterns[component.pattern()].colors;

    component.applyToAll('ABC');

    expect(component.allColor()).toBe('ABC');
    expect(component.dino().patterns[component.pattern()].colors)
      .toEqual(originalColors);
  });
});
