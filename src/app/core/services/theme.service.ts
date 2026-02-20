import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'theme';
  readonly theme = signal<'dark' | 'light'>('dark');

  init(): void {
    const stored = localStorage.getItem(this.key);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';
    this.setTheme(next);
  }

  setTheme(theme: 'dark' | 'light'): void {
    this.theme.set(theme);
    localStorage.setItem(this.key, theme);

    const isLight = theme === 'light';
    document.documentElement.classList.toggle('light-theme', isLight);
    document.body.classList.toggle('light-theme', isLight);
  }
}
