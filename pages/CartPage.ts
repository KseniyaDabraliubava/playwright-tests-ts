import { Page } from '@playwright/test';

export class CartPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getTitle() {
        return await this.page.locator('.title').textContent();
    }

    async getItemsCount() {
        return await this.page.locator('.cart_item').count();
    }

    async removeItem(productName: string) {
        const buttonId = `remove-${productName}`;
        await this.page.click(`#${buttonId}`);
    }

    async continueShopping() {
        await this.page.click('#continue-shopping');
    }

    async checkout() {
        await this.page.click('#checkout');
    }

    async getItemNames() {
        const items = await this.page.locator('.inventory_item_name').allTextContents();
        return items;
    }

    async isHeaderVisible() {
        return await this.page.locator('.app_logo').isVisible();
    }

    async openBurgerMenu() {
        await this.page.click('#react-burger-menu-btn');
    }

    async logout() {
        await this.openBurgerMenu();
        await this.page.click('#logout_sidebar_link');
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