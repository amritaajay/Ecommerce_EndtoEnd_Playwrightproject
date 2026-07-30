import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly monitorsCategory: Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly placeOrderButton: Locator;
  
  // Checkout Form fields (Cleaned from codegen variables)
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly cardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly purchaseButton: Locator;
  readonly okButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.monitorsCategory = page.getByRole('link', { name: 'Monitors' });
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });

    // Using stable localized label roles matching your exact checkout interactions
    this.nameInput = page.getByRole('textbox', { name: /Name:/ });
    this.countryInput = page.getByRole('textbox', { name: 'Country:' });
    this.cityInput = page.getByRole('textbox', { name: 'City:' });
    this.cardInput = page.getByRole('textbox', { name: 'Credit card:' });
    this.monthInput = page.getByRole('textbox', { name: 'Month:' });
    this.yearInput = page.getByRole('textbox', { name: 'Year:' });
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    this.okButton = page.getByRole('button', { name: 'OK' });
  }

  async navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async selectProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).click();
  }

  async fillCheckoutForm(details: { name: string, country: string, city: string, card: string, month: string, year: string }) {
    await this.nameInput.fill(details.name);
    await this.countryInput.fill(details.country);
    await this.cityInput.fill(details.city);
    await this.cardInput.fill(details.card);
    await this.monthInput.fill(details.month);
    await this.yearInput.fill(details.year);
    await this.purchaseButton.click();
  }
}