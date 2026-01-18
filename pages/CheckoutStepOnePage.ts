import { Page } from '@playwright/test';

export class CheckoutStepOnePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getTitle() {
        return await this.page.locator('.title').textContent();
    }

    async fillForm(firstName: string, lastName: string, zipCode: string) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', zipCode);
    }

    async clickContinue() {
        await this.page.click('#continue');
    }

    async clickCancel() {
        await this.page.click('#cancel');
    }

    async getErrorMessage() {
        return await this.page.locator('[data-test="error"]').textContent();
    }

    async isErrorVisible() {
        return await this.page.locator('[data-test="error"]').isVisible();
    }

    async isHeaderVisible() {
        return await this.page.locator('.app_logo').isVisible();
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }

    async openBurgerMenu() {
        await this.page.click('#react-burger-menu-btn');
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