import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Check page title', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        const title = await inventoryPage.getTitle();
        expect(title).toBe('Products');
    });

    test('Add item to cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        await inventoryPage.addToCart('sauce-labs-backpack');
        
        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe('1');
    });

    test('Remove item from cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        await inventoryPage.addToCart('sauce-labs-backpack');
        await inventoryPage.removeFromCart('sauce-labs-backpack');
        
        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe('0');
    });

    test('Check products count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        const count = await inventoryPage.getProductsCount();
        expect(count).toBe(6);
    });

    // Header tests

    test('Header is visible', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        const isVisible = await inventoryPage.isHeaderVisible();
        expect(isVisible).toBe(true);
    });

    test('Go to cart from header', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        await inventoryPage.goToCart();
        
        await expect(page).toHaveURL('/cart.html');
    });

    test('Open burger menu', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        await inventoryPage.openBurgerMenu();
        
        const logoutButton = page.locator('#logout_sidebar_link');
        await expect(logoutButton).toBeVisible();
    });

    // Footer tests

    test('Footer is visible', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        const isVisible = await inventoryPage.isFooterVisible();
        expect(isVisible).toBe(true);
    });

    test('Footer text contains copyright', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        const footerText = await inventoryPage.getFooterText();
        expect(footerText).toContain('Sauce Labs');
    });

    test('Footer social links', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        
        expect(await inventoryPage.isTwitterLinkVisible()).toBe(true);
        expect(await inventoryPage.isFacebookLinkVisible()).toBe(true);
        expect(await inventoryPage.isLinkedInLinkVisible()).toBe(true);
    });
});