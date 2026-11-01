import { Component, computed, effect, signal, untracked } from '@angular/core';
import { isColors2, SkinEditorService } from '../../services/skin-editor-service';
import { Colors, Colors2, Dino, emptyColor, emptyColorPicker, emptySkin, IColorPicker, Skin } from '../../data-interfaces';
import { DinoNames, Diat } from '../../enums';
import { ColorPicker } from './color-picker/color-picker';

@Component({
  imports: [ColorPicker],
  selector: 'app-skin-editor',
  styleUrl: './skin-editor.scss',
  templateUrl: './skin-editor.html',
})
export class SkinEditor {
  Diat = Diat;

  dinos = signal<Dino[]>([
    {
      name: DinoNames.Allosaurus,
      diat: Diat.Carni,
      variants: [
        { name: 'A', code: '100', extendedColors: false },
        { name: 'B', code: '020', extendedColors: true },
        { name: 'C', code: '000', extendedColors: true },
      ]
    }
  ]);

  selectedDino = signal(DinoNames.Allosaurus);

  dino = signal<Skin>(emptySkin());

  selectedDinoData = computed(() =>
    this.dinos().find(dino => dino.name === this.selectedDino())
  );

  availableVariants = computed(() =>
    this.selectedDinoData()?.variants ?? []
  );

  selectedVariant = computed(() => this.availableVariants()[this.variant()]);

  hasExtendedColors = computed(() => this.selectedVariant()?.extendedColors ?? false);

  variant = signal(0);

  colors = computed<IColorPicker[]>(() => {
    const { colors } = this.dino();

    const values = [
      emptyColorPicker("body", "Body", colors.body || emptyColor),
      emptyColorPicker("underbelly", "Underbelly", colors.underbelly || emptyColor)
    ];

    if (this.hasExtendedColors()) {
      values.push(
        emptyColorPicker("flank", "Flank", isColors2(colors) ? colors.flank || emptyColor : emptyColor),
        emptyColorPicker("markings", "Markings", isColors2(colors) ? colors.markings || emptyColor : emptyColor),
        emptyColorPicker("maleDisplay", "Male display", isColors2(colors) ? colors.maleDisplay || emptyColor : emptyColor)
      );
    }

    return values;
  });

  generatedCode = computed<string>(() => {
    const dino = this.selectedDinoData();

    if (!dino) return '';

    return this.skinEditorService.generateSkinCode(this.dino());
  });

  constructor(private skinEditorService: SkinEditorService) {
    effect(() => {
      const { code } = this.selectedVariant();

      untracked(() => this.updateDino({ variant: code }))
    });

    effect(() => {
      const dino = this.selectedDinoData();

      untracked(() => this.updateDino({ ...dino }))
    });
  }

  async copyCode() {
    await navigator.clipboard.writeText(this.generatedCode());
  }

  updateColor(property: keyof Colors2, value: string) {
    const colors = {
      ...this.dino().colors,
      [property]: value
    }

    this.updateDino({ colors })
  }

  updateDino(value: Partial<Skin>) {
    this.dino.update(dino => ({
      ...dino,
      ...value
    }));
  }
}