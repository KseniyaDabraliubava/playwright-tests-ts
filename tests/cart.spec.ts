import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Tests for Cart page', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addToCart('sauce-labs-backpack');
        await inventoryPage.addToCart('sauce-labs-bike-light');
        await inventoryPage.goToCart();
    });

    test('Check page title', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        const title = await cartPage.getTitle();
        expect(title).toBe('Your Cart');
    });

    test('Check items count in cart', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        const count = await cartPage.getItemsCount();
        expect(count).toBe(2);
    });

    test('Delete item from cart', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        await cartPage.removeItem('sauce-labs-backpack');
        
        const count = await cartPage.getItemsCount();
        expect(count).toBe(1);
    });

    test('Continue Shopping button', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        await cartPage.continueShopping();
        
        await expect(page).toHaveURL('/inventory.html');
    });

    test('Checkout button', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        await cartPage.checkout();
        
        await expect(page).toHaveURL('/checkout-step-one.html');
    });

    // Header tests

    test('Header is visible', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        const isVisible = await cartPage.isHeaderVisible();
        expect(isVisible).toBe(true);
    });

    test('Logout', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        await cartPage.logout();
        
        await expect(page).toHaveURL('/');
    });

    // Footer tests

    test('Footer is visible', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        const isVisible = await cartPage.isFooterVisible();
        expect(isVisible).toBe(true);
    });

    test('Footer text', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        const footerText = await cartPage.getFooterText();
        expect(footerText).toContain('Sauce Labs');
    });

    test('Footer social links', async ({ page }) => {
        const cartPage = new CartPage(page);
        
        expect(await cartPage.isTwitterLinkVisible()).toBe(true);
        expect(await cartPage.isFacebookLinkVisible()).toBe(true);
        expect(await cartPage.isLinkedInLinkVisible()).toBe(true);
    });
});