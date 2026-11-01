import { Component, computed, input, model } from '@angular/core';
import { emptyColor } from '../../../data-interfaces';

@Component({
  imports: [],
  selector: 'app-color-picker',
  styleUrl: './color-picker.scss',
  templateUrl: './color-picker.html',
  standalone: true
})
export class ColorPicker {
  color = model.required<string>();

  label = input("");

  displayColor = computed(() => this.color()?.trim().length ? `#${this.color()}` : `#${emptyColor}`)

  updateColor(value: string) {
    this.color.set(value.substring(1).toUpperCase())
  }
}
