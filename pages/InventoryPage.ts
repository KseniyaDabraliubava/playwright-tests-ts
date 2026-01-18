import { Page } from '@playwright/test';

export class InventoryPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getTitle() {
        return await this.page.locator('.title').textContent();
    }

    async addToCart(productName: string) {
        const buttonId = `add-to-cart-${productName}`;
        await this.page.click(`#${buttonId}`);
    }

    async removeFromCart(productName: string) {
        const buttonId = `remove-${productName}`;
        await this.page.click(`#${buttonId}`);
    }

    async getProductsCount() {
        return await this.page.locator('.inventory_item').count();
    }

    async isHeaderVisible() {
        return await this.page.locator('.app_logo').isVisible();
    }

    async openBurgerMenu() {
        await this.page.click('#react-burger-menu-btn');
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }

    async getCartBadgeCount() {
        const badge = this.page.locator('.shopping_cart_badge');
        if (await badge.isVisible()) {
            return await badge.textContent();
        }
        return '0';
    }

    async isFooterVisible() {
        return await this.page.locator('.footer').isVisible();
    }

    async getFooterText() {
        return await this.page.locator('.footer_copy').textContent();
    }

    async isTwitterLinkVisible() {
        return await this.page.locator('[data-test="social-twitter"]').isVisible();
    }

    async isFacebookLinkVisible() {
        return await this.page.locator('[data-test="social-facebook"]').isVisible();
    }

    async isLinkedInLinkVisible() {
        return await this.page.locator('[data-test="social-linkedin"]').isVisible();
    }
}