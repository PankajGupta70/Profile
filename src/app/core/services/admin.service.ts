import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly sessionKey = 'admin_logged_in';
  private readonly passwordKey = 'admin_password';
  private readonly fallbackPassword = 'Welcome@1996';

  readonly loggedIn = signal(false);
  readonly password = signal(this.fallbackPassword);

  init(): void {
    this.loggedIn.set(localStorage.getItem(this.sessionKey) === '1');
    this.password.set(localStorage.getItem(this.passwordKey) || this.fallbackPassword);
  }

  login(password: string): boolean {
    const success = password === this.password();
    this.loggedIn.set(success);
    if (success) {
      localStorage.setItem(this.sessionKey, '1');
    }
    return success;
  }

  logout(): void {
    this.loggedIn.set(false);
    localStorage.removeItem(this.sessionKey);
  }

  setPassword(value: string): void {
    const next = value.trim();
    if (!next) return;
    this.password.set(next);
    localStorage.setItem(this.passwordKey, next);
  }
}
