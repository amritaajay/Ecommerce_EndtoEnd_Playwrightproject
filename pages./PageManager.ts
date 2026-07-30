import { Page } from '@playwright/test';
import { HomePage } from './homepage';
import { LoginPage } from './loginpage';
import { SignUpPage } from './signuppage';

export class PageManager {
  private readonly page: Page;
  private readonly homePage: HomePage;
  private readonly loginPage: LoginPage;
  private readonly signUpPage: SignUpPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.signUpPage = new SignUpPage(this.page);
  }

  getHomePage() {
    return this.homePage;
  }

  getLoginPage() {
    return this.loginPage;
  }

  getSignUpPage() {
    return this.signUpPage;
  }
}