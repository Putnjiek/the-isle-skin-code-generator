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

  /** The selected color value, shared with the parent component. */
  color = model.required<string>();

  /** Label displayed above the color picker. */
  label = input("");

  /** Returns the selected color as a HEX value, using the default color if empty. */
  displayColor = computed(() => this.color()?.trim().length ? `#${this.color()}` : `#${emptyColor}`);

  /**
   * Updates the selected color and normalizes it to uppercase HEX format.
   * @param value The new color value.
   */
  updateColor(value: string) {
    this.color.set(value.replace("#", "").toUpperCase());
  }
}