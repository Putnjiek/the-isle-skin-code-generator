import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const themeStorageKey = 'the-isle-skin-code-generator.theme';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  host: {
    '[class.light-mode]': "theme() === 'light'"
  },
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('the-isle-skin-code-generator');
  theme = signal<'dark' | 'light'>('dark');

  constructor() {
    const savedTheme = globalThis.localStorage.getItem(themeStorageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.theme.set(savedTheme);
    }
  }

  toggleTheme() {
    const nextTheme = this.theme() === 'dark' ? 'light' : 'dark';
    globalThis.localStorage.setItem(themeStorageKey, nextTheme);
    this.theme.set(nextTheme);
  }
}
