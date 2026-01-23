import { test, expect } from '@playwright/test';

test.describe('Mocks Page Tests', () => {
    const url = 'https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks';

    test('Right title', async ({ page }) => {
        await page.goto(url);

        const title = await page.locator('h3').textContent();
        expect(title).toBe('Mock trainer');
    });

    test('The button is visible and enabled', async ({ page }) => {
        await page.goto(url);

        const buttonText = await page.locator('button').textContent();
        expect(buttonText).toContain('Make a call');
        
        const isEnabled = await page.locator('button').isEnabled();
        expect(isEnabled).toBe(true);
    });

    test('Successful request - data is displayed correctly', async ({ page }) => {
        await page.route('**/mocks', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true,
                    message: 'Data loaded successfully',
                    data: {
                        id: 123,
                        name: 'Test Item',
                        value: 42
                    }
                })
            });
        });

        await page.goto(url);
        await page.click('button');

        const result = page.locator('#result');
        await expect(result).toBeVisible();

        const resultText = await result.textContent();
        expect(resultText).toBeTruthy();
    });

    test('Error 500 - error message is displayed', async ({ page }) => {
        await page.route('**/mocks', async route => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'Internal Server Error',
                    message: 'Something went wrong'
                })
            });
        });

        await page.goto(url);
        await page.click('button');

        const result = page.locator('#result');
        await expect(result).toBeVisible();

        const resultText = await result.textContent();
        expect(resultText).toBeTruthy();
        expect(
            resultText?.toLowerCase().includes('error') ||
            resultText?.toLowerCase().includes('wrong') ||
            resultText?.toLowerCase().includes('failed')
        ).toBe(true);
    });

    test('Error 404 - error message is displayed', async ({ page }) => {
        await page.route('**/mocks', async route => {
            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'Not Found',
                    message: 'Resource not found'
                })
            });
        });

        await page.goto(url);
        await page.click('button');

        const result = page.locator('#result');
        await expect(result).toBeVisible();

        const resultText = await result.textContent();
        expect(resultText).toBeTruthy();
        expect(
            resultText?.toLowerCase().includes('error') ||
            resultText?.toLowerCase().includes('not found') ||
            resultText?.toLowerCase().includes('404')
        ).toBe(true);
    });

    test('API request works', async ({ page }) => {
        await page.goto(url);
        
        const responsePromise = page.waitForResponse(
            response => response.url().includes('mocks'),
            { timeout: 10000 }
        );

        await page.click('button');
        
        const response = await responsePromise;
        
        expect(response.status()).toBeGreaterThanOrEqual(200);
        expect(response.status()).toBeLessThan(600);

        const result = page.locator('#result');
        await expect(result).toBeVisible();
    });
});