import { test, expect } from '@playwright/test';
import { PageManager } from '../pages /PageManager';

test.describe('DemoBlaze Assignment Suite', () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.getHomePage().navigate();
  });

  // 1. Sign Up -> Enter Data -> Click Sign Up
  test('Requirement 1: Sign up successfully', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBeTruthy();
      await dialog.dismiss();
    });
    const uniqueUser = `user_${Date.now()}`;
    await pm.getSignUpPage().register(uniqueUser, 'C@meo123');
    await pm.getSignUpPage().signUpButton.click();
  });

  // 2. Sign Up -> Enter Data -> Click Close
  test('Requirement 2: Sign up and click close', async () => {
    await pm.getSignUpPage().register('amritaajay', 'C@meo123');
    await pm.getSignUpPage().signUpCloseButton.click();
  });

  // 3. Verify login with valid credentials
  test('Requirement 3: Verify login with valid credentials', async () => {
    await pm.getLoginPage().login('amritaajay', 'C@meo123');
    await expect(pm.getLoginPage().logoutLink).toBeVisible();
  });

  // 4. Verify login with invalid username and valid password
  test('Requirement 4: Verify login with invalid username and valid password', async ({ page }) => {
    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
    await pm.getLoginPage().login('Ajay.Am', 'C@meo123');
  });

  // 5. Verify login with valid username and invalid password
  test('Requirement 5: Verify login with valid username and invalid password', async ({ page }) => {
    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
    await pm.getLoginPage().login('amritaajay', 'WrongPassword!');
  });

  // 6. Verify login with invalid username and invalid password
  test('Requirement 6: Verify login with invalid username and invalid password', async ({ page }) => {
    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
    await pm.getLoginPage().login('Ajay.Am', 'WrongPassword!');
  });

  // 7. Login with valid credentials -> Select a product -> Add to Cart -> Click "ok" on the popup
  test('Requirement 7: Add item to cart and dismiss popup', async ({ page }) => {
    await pm.getLoginPage().login('amritaajay', 'C@meo123');
    await pm.getHomePage().selectProduct('Samsung galaxy s6');
    
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Product added');
      await dialog.dismiss();
    });
    await pm.getHomePage().addToCartButton.click();
  });

  // 8. Login with valid credentials -> Select a product under Phones-> Add to Cart > Click "ok" -> Purchase
  test('Requirement 8: Purchase a phone product', async ({ page }) => {
    await pm.getLoginPage().login('amritaajay', 'C@meo123');
    await pm.getHomePage().selectProduct('Samsung galaxy s6');
    
    page.once('dialog', dialog => dialog.dismiss());
    await pm.getHomePage().addToCartButton.click();
    
    await pm.getHomePage().cartLink.click();
    // Fix: Wait for the cart URL to completely load before clicking Place Order
    await page.waitForURL('**/cart.html');
    await pm.getHomePage().placeOrderButton.click();
    await pm.getHomePage().fillCheckoutForm({
      name: 'Amrita',
      country: 'India',
      city: 'Cochin',
      card: '123434543454543',
      month: 'July',
      year: '2026'
    });
    await pm.getHomePage().okButton.click();
  });

  // 9. Login with valid credentials -> Select a product under Monitors-> Add to Cart -> Click "ok" -> Purchase
  test('Requirement 9: Purchase a monitor product', async ({ page }) => {
    await pm.getLoginPage().login('amritaajay', 'C@meo123');
    await pm.getHomePage().monitorsCategory.click();
    await pm.getHomePage().selectProduct('Apple monitor');
    
    page.once('dialog', dialog => dialog.dismiss());
    await pm.getHomePage().addToCartButton.click();
    
    await pm.getHomePage().cartLink.click();
    // Fix: Wait for the cart URL to completely load before clicking Place Order
    await page.waitForURL('**/cart.html');
    await pm.getHomePage().placeOrderButton.click();
    await pm.getHomePage().fillCheckoutForm({
      name: 'Amrita',
      country: 'United states',
      city: 'Lansing',
      card: '45893245478',
      month: 'June',
      year: '2026'
    });
    await pm.getHomePage().okButton.click();
  });

  // 10. Login with valid credentials -> Logout
  test('Requirement 10: Successful session logout', async () => {
    await pm.getLoginPage().login('amritaajay', 'C@meo123');
    await pm.getLoginPage().logoutLink.click();
    await expect(pm.getLoginPage().loginLink).toBeVisible();
  });
});