import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login tests', () => {

    test('Successful login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        
        await expect(page).toHaveURL('/inventory.html');
    });

    test('Login with wrong password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.open();
        await loginPage.login('standard_user', 'wrong_password');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
    });

    test('Login with locked user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.open();
        await loginPage.login('locked_out_user', 'secret_sauce');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Sorry, this user has been locked out');
    });

    test('Check logo visibility', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.open();
        
        const isVisible = await loginPage.isLogoVisible();
        expect(isVisible).toBe(true);
    });
});