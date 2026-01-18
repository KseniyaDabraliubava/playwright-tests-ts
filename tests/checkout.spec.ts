import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';

test.describe('tests Checkout Step One', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addToCart('sauce-labs-backpack');
        await inventoryPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.checkout();
    });

    test('Check page title', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        const title = await checkoutPage.getTitle();
        expect(title).toBe('Checkout: Your Information');
    });

    test('Successfull form filling', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        await checkoutPage.fillForm('Иван', 'Петров', '12345');
        await checkoutPage.clickContinue();
        
        await expect(page).toHaveURL('/checkout-step-two.html');
    });

    test('Error when First Name is empty', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        await checkoutPage.fillForm('', 'Петров', '12345');
        await checkoutPage.clickContinue();
        
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toContain('First Name is required');
    });

    test('Error when Last Name is empty', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        await checkoutPage.fillForm('Иван', '', '12345');
        await checkoutPage.clickContinue();
        
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toContain('Last Name is required');
    });

    test('Error when Postal Code is empty', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        await checkoutPage.fillForm('Иван', 'Петров', '');
        await checkoutPage.clickContinue();
        
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toContain('Postal Code is required');
    });

    test('Cancel button', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        await checkoutPage.clickCancel();
        
        await expect(page).toHaveURL('/cart.html');
    });

    // Header tests

    test('Header is visible', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        const isVisible = await checkoutPage.isHeaderVisible();
        expect(isVisible).toBe(true);
    });

    test('Go to cart from header', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        await checkoutPage.goToCart();
        
        await expect(page).toHaveURL('/cart.html');
    });

    // Footer tests

    test('Footer is visible', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        const isVisible = await checkoutPage.isFooterVisible();
        expect(isVisible).toBe(true);
    });

    test('Footer text', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        const footerText = await checkoutPage.getFooterText();
        expect(footerText).toContain('Sauce Labs');
    });

    test('Footer social links', async ({ page }) => {
        const checkoutPage = new CheckoutStepOnePage(page);
        
        expect(await checkoutPage.isTwitterLinkVisible()).toBe(true);
        expect(await checkoutPage.isFacebookLinkVisible()).toBe(true);
        expect(await checkoutPage.isLinkedInLinkVisible()).toBe(true);
    });
});