import { Component, computed, linkedSignal, signal, untracked } from '@angular/core';
import { isColors2, isColors3, isColors4, isColors5, SkinEditorService } from '../../services/skin-editor-service';
import { Colors4, Dino, emptyColor, emptyColorPicker, emptyDino, IColorPicker } from '../../data-interfaces';
import { DinoNames, Diat } from '../../enums';
import { ColorPicker } from './color-picker/color-picker';
import { defaultDinos } from '../../empty-data';
import { Toast } from '../../components/toast/toast';

@Component({
  imports: [ColorPicker, Toast],
  selector: 'app-skin-editor',
  styleUrl: './skin-editor.scss',
  templateUrl: './skin-editor.html',
  standalone: true
})
export class SkinEditor {
  Diat = Diat;

  dinos = signal<Dino[]>(defaultDinos());

  selectedDino = signal(DinoNames.Diabloceratops);

  dino = linkedSignal<Dino>(() => this.dinos().find(dino => dino.name === this.selectedDino()) ?? emptyDino());

  availablePatterns = computed(() => this.dino()?.patterns ?? []);

  selectedPattern = computed(() => this.availablePatterns()[this.pattern()]);

  pattern = signal(0);

  colors = computed<IColorPicker[]>(() => {
    const { colors } = this.selectedPattern();
    console.log("colors", colors);

    const values = [
      emptyColorPicker("body", "Body", colors.body || emptyColor),
      emptyColorPicker("underbelly", "Underbelly", colors.underbelly || emptyColor),
    ];

    if (isColors2(colors)) {
      values.push(
        emptyColorPicker("flank", "Flank", colors.flank || emptyColor)
      );
    }

    if (isColors3(colors)) {
      values.push(
        emptyColorPicker("markings", "Markings", colors.markings || emptyColor),
        emptyColorPicker("maleDisplay", "Male display", colors.maleDisplay || emptyColor)
      );
    }

    if (isColors4(colors)) {
      values.push(
        emptyColorPicker("accents", "Accents", colors.accents || emptyColor)
      );
    }

    if (isColors5(colors)) {
      values.push(
        // emptyColorPicker("claws", "Claws", colors.claws || emptyColor)
      );
    }

    return values;
  });

  generatedCode = computed<string>(() => {
    const dino = this.dino();

    if (!dino) return '';

    const pattern = this.selectedPattern()

    return this.skinEditorService.generateSkinCode(dino.name, pattern.code, pattern.colors);
  });

  showCopyToast = signal(false);

  constructor(private skinEditorService: SkinEditorService) { }

  async copyCode() {
    await navigator.clipboard.writeText(this.generatedCode());
    this.showCopyToast.set(true);
  }

  updateColor(property: keyof Colors4, value: string) {
    const patternIndex = this.pattern();

    this.dino.update(dino => ({
      ...dino,
      patterns: dino.patterns.map((pattern, index) =>
        index === patternIndex
          ? {
            ...pattern,
            colors: {
              ...pattern.colors,
              [property]: value
            }
          }
          : pattern
      )
    }));
  }

  updateDino(value: Partial<Dino>) {
    this.dino.update(dino => ({
      ...dino,
      ...value
    }));
  }
}