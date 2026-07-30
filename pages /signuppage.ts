import { Page, Locator } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly signUpUsernameInput: Locator;
  readonly signUpPasswordInput: Locator;
  readonly signUpButton: Locator;
  readonly signUpCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    // Verified via your exact codegen choices:
    this.signUpUsernameInput = page.getByRole('textbox', { name: 'Username:' });
    this.signUpPasswordInput = page.getByRole('textbox', { name: 'Password:' });
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.signUpCloseButton = page.getByLabel('Sign up').getByText('Close');
  }

  async register(username: string, password: string) {
    await this.signUpLink.click();
    await this.page.waitForTimeout(500); 
    await this.signUpUsernameInput.fill(username);
    await this.signUpPasswordInput.fill(password);
  }
}