import { Component, effect, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-toast',
  styleUrl: './toast.scss',
  templateUrl: './toast.html',
  standalone: true
})
export class Toast {
  showToast = model(false);

  constructor() {
    effect(() => {
      if (!this.showToast()) return;

      setTimeout(() => {
        this.showToast.set(false);
      }, 2000);
    })
  }
}
