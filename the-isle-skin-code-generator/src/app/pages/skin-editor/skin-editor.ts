import { Component, computed, linkedSignal, signal, untracked } from '@angular/core';
import { isColors2, isColors3, isColors4, isColors5, isColors6, isColors7, SkinEditorService } from '../../services/skin-editor-service';
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

  /** Available dinosaurs and their predefined skin patterns. */
  dinos = signal<Dino[]>(defaultDinos());

  /** Currently selected dinosaur. */
  selectedDino = signal(DinoNames.Diabloceratops);

  /** Resolves the selected dinosaur and keeps its editable state. */
  dino = linkedSignal<Dino>(() => this.dinos().find(dino => dino.name === this.selectedDino()) ?? emptyDino());

  /** Patterns available for the selected dinosaur. */
  availablePatterns = computed(() => this.dino()?.patterns ?? []);

  /** Currently selected skin pattern. */
  selectedPattern = computed(() => this.availablePatterns()[this.pattern()]);

  /** Index of the currently selected pattern. */
  pattern = signal(0);

  /**
   * Creates the color picker entries based on the selected pattern's color structure.
   * Optional color fields are added depending on the pattern's color type.
   */
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

    if (isColors6(colors)) {
      values.push(
        // emptyColorPicker("mouth", "Mouth", colors.mouth || emptyColor)
      );
    }

    if (isColors7(colors)) {
      values.push(
        // emptyColorPicker("teeth", "Teeth", colors.teeth || emptyColor)
      );
    }

    return values;
  });

  /**
   * Generates the skin code using the selected dinosaur, pattern and color values.
   */
  generatedCode = computed<string>(() => {
    const dino = this.dino();

    if (!dino) return '';

    const pattern = this.selectedPattern();

    return this.skinEditorService.generateSkinCode(dino.name, pattern.code, pattern.colors);
  });

  /** Controls the visibility of the copy confirmation toast. */
  showCopyToast = signal(false);

  constructor(private skinEditorService: SkinEditorService) { }

  /**
   * Copies the generated skin code to the clipboard and displays a confirmation toast.
   */
  async copyCode() {
    await navigator.clipboard.writeText(this.generatedCode());
    this.showCopyToast.set(true);
  }

  /**
   * Updates a color property of the currently selected pattern.
   * @param property The color property to update.
   * @param value The new color value.
   */
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

  /**
   * Updates the properties of the currently selected dinosaur.
   * @param value The dinosaur properties to update.
   */
  updateDino(value: Partial<Dino>) {
    this.dino.update(dino => ({
      ...dino,
      ...value
    }));
  }
}