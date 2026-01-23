import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['contrastButton'];

  connect() {
    this.applyTheme(this.getStoredTheme());
  }

  toggleContrast(event) {
    const requested = event?.currentTarget?.dataset?.theme;
    const next = requested ?? (this.getStoredTheme() === 'dark' ? 'light' : 'dark');
    this.applyTheme(next);
    localStorage.theme = next;
  }

  getStoredTheme() {
    if (localStorage.theme === 'light' || localStorage.theme === 'dark') return localStorage.theme;
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  }

  applyTheme(mode) {
    document.documentElement.dataset.theme = mode;

    if (!this.hasContrastButtonTarget) return;

    for (const btn of this.contrastButtonTargets) {
      const isActive = btn.dataset.theme === mode;
      btn.dataset.active = String(isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    }
  }
}
